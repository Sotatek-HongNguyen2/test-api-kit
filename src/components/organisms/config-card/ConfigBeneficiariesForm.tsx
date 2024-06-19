import { AppInput } from "@/components/atoms/input"
import "./styles.scss"
import { Text } from "@/components/atoms/text"
import { Divider, Flex, Form } from "antd"
import { AppButton, IconButton } from "@/components/atoms/button"
import { AppTable } from "@/components/molecules/table"
import { ColumnsType } from "antd/es/table"
import { BeneficiaryData } from "@/types"
import { AppSelect } from "@/components/atoms/select"
import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { UserOutlined } from "@ant-design/icons"
import { CheckOutlinedIcon, CopyIcon, TrashIcon } from "@/assets/icons/custom-icon"
import { useCopyToClipBoard } from "@/hooks/useCopyToClipboard"
import WillToast from "@/components/atoms/ToastMessage"

export const ConfigBeneficiariesForm = ({ generate = false }: { generate?: boolean }) => {

  const [form] = Form.useForm();
  const { submit, resetFields } = form;
  const configForm = Form.useFormInstance();
  const { getFieldValue, setFieldValue } = configForm;
  const watchBeneficiaries = Form.useWatch('beneficiariesList', { form: configForm });

  const { handleCopyToClipboard, isCopied } = useCopyToClipBoard();
  const [indexCopied, setIndexCopied] = useState<number>(-1);

  const minSignatureOptions = useMemo(() => [...(new Array(watchBeneficiaries?.length || 0))].map((_, index) => ({
    label: index + 1,
    value: index + 1
  })), [watchBeneficiaries?.length]);

  const handleDeleteBeneficiary = (address: string) => {
    const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
    const newBeneficiaries = currentBeneficiaries.filter((beneficiary: BeneficiaryData) => beneficiary?.address !== address);
    setFieldValue("beneficiariesList", newBeneficiaries);
  }

  const columns: ColumnsType<BeneficiaryData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <Flex gap={10} align="center">
          <UserOutlined className="user-icon" />
          <Text className="neutral-1 font-semibold">{name}</Text>
        </Flex>
      )
    },
    {
      title: 'Owner Address',
      dataIndex: 'address',
      key: 'address',
      render: (address, _, index) => (
        <Flex align="center" justify="flex-start" gap={4}>
          <Text className="neutral-1 text-left">{address}</Text>
          <IconButton onClick={() => {
            handleCopyToClipboard(address);
            setIndexCopied(index);
          }}>
            {
              (isCopied && indexCopied === index) ? <CheckOutlinedIcon /> : <CopyIcon />
            }
          </IconButton>
        </Flex>
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <IconButton onClick={() => handleDeleteBeneficiary(record?.address)}>
          <TrashIcon />
        </IconButton>
      )
    }
  ];

  useEffect(() => {
    resetFields();
    setFieldValue("beneficiariesList", []);
  }, [generate])

  const onAddBeneficiary = (values: any) => {
    const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
    const beneficiaryIndex = currentBeneficiaries.findIndex((beneficiary: BeneficiaryData) => beneficiary?.address === values?.beneficiaryAddress);
    if (beneficiaryIndex > -1) {
      WillToast.error("Beneficiary already exists")
      return;
    }
    const newBeneficiary: BeneficiaryData = {
      id: currentBeneficiaries.length + 1,
      name: values.beneficiaryName,
      address: values.beneficiaryAddress
    }
    setFieldValue("beneficiariesList", [...currentBeneficiaries, newBeneficiary]);
    resetFields();
  }

  return (
    <Flex vertical gap={12}>
      <Form form={form} onFinish={onAddBeneficiary} id="form-add-beneficiary">
        <Flex vertical gap={12}>
          <Flex gap={24}>
            <Flex vertical={generate} gap={16} className={clsx("beneficiaries-wrapper", generate && "beneficiaries-wrapper--generate")}>
              <Flex vertical gap={10} className={clsx("beneficiary-name", generate && "generate")}>
                <Text className="font-semibold neutral-1 text--no-wrap">Beneficiary nickname</Text>
                <Form.Item name="beneficiaryName" rules={[{ required: true, message: 'Please enter a nickname' }]}>
                  <AppInput className="input-beneficiary-name" placeholder="Enter nickname" />
                </Form.Item>
              </Flex>
              <Flex vertical gap={10} className={clsx("beneficiary-address", generate && "generate")}>
                <Text className="font-semibold neutral-1">Etherem public address</Text>
                <Form.Item name="beneficiaryAddress" rules={[{ required: true, message: "Address is required" }]}>
                  <AppInput placeholder="Enter address" />
                </Form.Item>
              </Flex>
            </Flex>
            {
              generate && (
                <Flex vertical gap={10} className="generate-QR">
                  <Text className="font-semibold">QR Code to access private key</Text>
                </Flex>
              )
            }
          </Flex>
          <Form.Item>
            <AppButton
              type="primary"
              size="xl"
              className="none-styles beneficiary-name"
              onClick={submit}
            >
              <Text size="text-sm" className="uppercase font-bold">Save this beneficiary</Text>
            </AppButton>
          </Form.Item>
        </Flex>
      </Form>
      <Divider style={{ margin: "0px 0px" }} />
      <Form.Item name="beneficiariesList">
        <Flex vertical gap={16}>
          <Text className="font-semibold neutral-1">Existing beneficiaries:</Text>
          <AppTable
            columns={columns}
            dataSource={watchBeneficiaries}
            pagination={false}
            hasIconAction={true}
          />
        </Flex>
      </Form.Item>
      <Flex vertical gap={10}>
        <Text className="neutral-1 font-semibold">
          Minimum number of signatures required to access assets once activated:
        </Text>
        <Form.Item name="minRequiredSignatures">
          <AppSelect className="select-signature" options={minSignatureOptions} />
        </Form.Item>
      </Flex>
    </Flex>
  )
}