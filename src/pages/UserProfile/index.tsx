import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Flex,
  Form,
  GetProp,
  Radio,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useNavigate } from "react-router-dom";

import { NoAvatar } from "@/assets/icons";
import { AppButton } from "@/components/atoms/button";
import { AppInput } from "@/components/atoms/input";
import { AppSelect } from "@/components/atoms/select";
import { CommonServices } from "@/services/common";
import "./styles.scss";
import { AuthServices } from "@/services/auth-service";
import WillToast from "@/components/atoms/ToastMessage";
import { APP_ROUTES_PATHS } from "@/constants";
import { getInformationInstanceSlide, useAppSelector } from "@/store";
import useGetInformation from "@/hooks/useGetInformation";
import { EMAIL_RULES } from "@/helpers/rule";
import { useDevices } from "@/hooks/useMediaQuery";

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

  const { isTablet, isMobile } = useDevices();

  const reloadDataInformation = useGetInformation();
  const commonService = new CommonServices();
  const authServices = new AuthServices();
  const [form] = Form.useForm();
  const [listCountries, setListCountries] = useState<any[]>([]);

  const { avatar, country, email, gender, name } = useAppSelector(
    getInformationInstanceSlide
  );

  const getListCountries = async () => {
    const res = await commonService.getListCountries();
    const data = res.data;
    const arr = data.map((item: any) => ({
      label: item.name.common.toString(),
      value: item.cca2.toString(),
      key: item.cca2.toString(),
    }));
    arr.sort((a: any, b: any) => a.label.localeCompare(b.label));
    setListCountries(arr);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
      setFileList([info.fileList[0]]);
      const file = info.file;
      setPreviewImage(URL.createObjectURL(file));
    } else {
      WillToast.error("Please upload a file in either JPG, JPEG or PNG format");
    }
  };

  const getInformation = async () => {
    form.setFieldValue("name", name);
    form.setFieldValue("email", email);
    form.setFieldValue("gender", Number(gender));
    form.setFieldValue("country", country);
    setPreviewImage(avatar);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();

    if (fileList[0]) {
      formData.append("avatar", fileList[0].originFileObj as FileType);
    }

    formData.append("country", values.country as string);
    formData.append("email", values.email as string);
    formData.append("name", values.name as string);
    formData.append("gender", values.gender as string);

    try {
      const res = await authServices.updateUserProfile(formData);
      if (res.data.status === 200) {
        WillToast.success("Saved successfully");
        reloadDataInformation();
        navigate(APP_ROUTES_PATHS.HOME);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      WillToast.error("Failed to update profile. Please try again later.");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    getListCountries();
    getInformation();
  }, []);

  return (
    <Row justify="center" className="main-user-profile">
      <Col md={18} xl={14} xxl={14} sm={24} xs={24}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {isTablet && <div className="title-page-mobile">Setup Profile</div>}
          <Card className="card-form" title={!isTablet && "Setup Profile"}>
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
              <Col md={12} sm={24} xs={24} className={isTablet ? "mb-3" : ""}>
                <Form.Item
                  label="Your Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                    { max: 16 },
                    {
                      pattern: /^[a-zA-Z0-9\s]+$/,
                      message:
                        "Name cannot contain special characters, emojis!",
                    },
                  ]}
                >
                  <AppInput
                    width={"100%"}
                    placeholder="Enter your name here"
                    onChange={(e) => {
                      const { value } = e.target;
                      e.target.value = value.trimStart();
                    }}
                    onBlur={(e) => {
                      const { value } = e.target;
                      e.target.value = value.trim();
                      if (!e.target.value) {
                        form.setFields([
                          {
                            name: "name",
                            errors: ["Please enter your name!"],
                          },
                        ]);
                      }
                    }}
                    maxLength={16}
                  />
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24} className={isTablet && "mb-3"}>
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
              <Col md={12} sm={24} xs={24} className={isTablet && "mb-3"}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={EMAIL_RULES}
                >
                  <AppInput
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your email here"
                    maxLength={254}
                    onChange={(e) => {
                      const { value } = e.target;
                      e.target.value = value.trim();
                    }}
                    onBlur={(e) => {
                      const { value } = e.target;
                      e.target.value = value.trim();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24} className={isTablet && "mb-3"}>
                <Form.Item label="Country" name="country">
                  <AppSelect
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Select from list"
                    filterOption={(input, option: any) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    notFoundContent={
                      <Flex justify="center">No data found</Flex>
                    }
                    options={listCountries}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row gutter={24} style={{ marginTop: 20 }}>
            <Col span={isMobile ? "12" : ""}>
              <AppButton
                type="primary"
                block={isMobile}
                htmlType="submit"
                loading={loading}
              >
                SAVE CHANGES
              </AppButton>
            </Col>
            <Col span={isMobile ? "12" : ""}>
              <AppButton
                block={isMobile}
                className="btn-cancel"
                onClick={() => {
                  navigate(APP_ROUTES_PATHS.HOME);
                }}
              >
                CANCEL
              </AppButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
