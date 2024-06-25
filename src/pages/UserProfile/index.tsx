import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Form,
  GetProp,
  Radio,
  Row,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NoAvatar } from "@/assets/icons";
import { AppButton } from "@/components/atoms/button";
import { AppInput } from "@/components/atoms/input";
import { AppSelect } from "@/components/atoms/select";
import { CommonServices } from "@/services/common";
import "./styles.scss";
import { AuthServices } from "@/services/auth-service";
import WillToast from "@/components/atoms/ToastMessage";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export function UserProfile() {
  const listGender = [
    {
      id: 1,
      value: 1,
      title: "Male",
    },
    {
      id: 2,
      value: 2,
      title: "Female",
    },
    {
      id: 3,
      value: 3,
      title: "Others",
    },
  ];

  const commonService = new CommonServices();
  const authServices = new AuthServices();

  const [form] = Form.useForm();

  const [listCountries, setListCountries] = useState<any[]>([]);

  const getListCountries = async () => {
    const res = await commonService.getListCountries();
    const data = res.data;
    const arr = data.map((item: any) => ({
      label: item.name.common.toString(),
      value: item.cca2.toString(),
      key: item.cca2.toString(),
    }));
    setListCountries(arr);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    const isImage = info.file.type.startsWith("image/");
    const maxSize = 10 * 1024 * 1024;

    if (info.file.size > maxSize) {
      WillToast.error(
        "File size exceeds 10MB limit. Please choose a smaller file"
      );
      return;
    }
    if (isImage) {
      console.log(info);
      setFileList([info.fileList[0]]);
      console.log(fileList);
      const file = info.file;
      setPreviewImage(URL.createObjectURL(file));
    } else {
      WillToast.error("Please upload a file in either JPG, JPEG or PNG format");
    }
  };

  const getInformation = async () => {
    const res = await authServices.getInformation();

    form.setFieldValue("name", res.data.data.name);
    form.setFieldValue("email", res.data.data.email);
    form.setFieldValue(
      "gender",
      res.data.data.gender ? Number(res.data.data.gender) : 1
    );
    form.setFieldValue("country", res.data.data.country);
    setPreviewImage(res.data.data.avatar);
  };

  useEffect(() => {
    getListCountries();
    getInformation();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("avatar", fileList[0].originFileObj as FileType);
    formData.append("country", values.country as string);
    formData.append("email", values.email as string);
    formData.append("name", values.name as string);
    formData.append("gender", values.gender as string);

    try {
      const res = await authServices.updateUserProfile(formData);
      if (res.data.status === 200) {
        WillToast.success("Saved successfully");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      WillToast.error("Failed to update profile. Please try again later.");
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col span={16}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Card title="Setup Profile">
            <Row gutter={24} align="middle">
              <Col>
                {previewImage ? (
                  <Avatar src={previewImage} size={80} />
                ) : (
                  <NoAvatar />
                )}
              </Col>
              <Col>
                <Upload
                  beforeUpload={() => false}
                  onChange={handleChange}
                  fileList={fileList}
                  maxCount={1}
                  accept="image/*"
                >
                  <AppButton type="primary">
                    {previewImage ? "CHANGE AVATAR" : "UPLOAD AVATAR"}
                  </AppButton>
                </Upload>
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Form.Item
                  label="Your Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <AppInput placeholder="Enter your name here" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    {listGender.map((item) => (
                      <Radio key={item.value} value={item.value}>
                        {item.title}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <AppInput placeholder="Enter your email here" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please select your country" },
                  ]}
                >
                  <AppSelect
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select country"
                    filterOption={(input, option: any) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    options={listCountries}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row gutter={24} style={{ marginTop: 20 }}>
            <Col>
              <AppButton type="primary" htmlType="submit" loading={loading}>
                SAVE CHANGES
              </AppButton>
            </Col>
            <Col>
              <AppButton className="btn-cancel">CANCEL</AppButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
