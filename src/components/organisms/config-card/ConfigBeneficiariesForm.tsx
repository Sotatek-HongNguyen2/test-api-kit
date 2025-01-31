import { AppInput } from "@/components/atoms/input";
import "./styles.scss";

import { Divider, Flex, Form, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import QRCode from "qrcode";

import { AppSelect } from "@/components/atoms/select";
import { BeneficiaryData } from "@/types";
import { AppTable } from "@/components/molecules/table";
import { AppButton, IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import {
  CheckOutlinedIcon,
  CopyIcon,
  TrashIcon,
  UserOutlinedIcon,
} from "@/assets/icons/custom-icon";
import { useCopyToClipBoard } from "@/hooks/useCopyToClipboard";
import WillToast from "@/components/atoms/ToastMessage";
import useDisclosure from "@/hooks/useDisclosure";
import { BENEFICIARY_RULES, ETHEREUM_ADDRESS_RULES } from "@/helpers/rule";
import { useAppDispatch } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import WALLETS from "@/models/wallet";
import { NoData, Plus } from "@/assets/icons";

import { DeleteBeneficiaryModal } from "./common-card/DeleteBeneficiaryModal";
import { getWalletSlice, useAppSelector } from "@/store";
import { AuthServices } from "@/services/auth-service";
import WillImage from "@/components/atoms/Image";
import { useDevices } from "@/hooks/useMediaQuery";
import { AppInputArea } from "@/components/atoms/input-area";

export const NodataTable = () => {
  const { isTablet } = useDevices();
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={4}
      style={{
        padding: isTablet ? "24px 0px" : "40px 0px"
      }}
    >
      <NoData
        width={isTablet ? 70 : 76}
        height={isTablet ? 70 : 76}
      />
      <Text className=" font-semibold">No data</Text>
      <Flex vertical>
        <Text
          className="neutral-2"
          align="center"
          size="text-sm"
        >
          You currently have no will.
        </Text>
        <Text
          className="neutral-2"
          align="center"
          size="text-sm"
        >
          Get started by creating a will
        </Text>
      </Flex>
    </Flex>
  )
}

export const ConfigBeneficiariesForm = ({
  generate = false,
}: {
  generate?: boolean;
}) => {
  const [form] = Form.useForm();
  const { submit, resetFields } = form;
  const configForm = Form.useFormInstance();
  const { getFieldValue, setFieldValue } = configForm;
  const watchBeneficiaries = Form.useWatch("beneficiariesList", {
    form: configForm,
  });
  const { handleCopyToClipboard, isCopied } = useCopyToClipBoard();
  const [indexCopied, setIndexCopied] = useState<number>(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isValidBeneficiary, setIsValidBeneficiary] = useState<boolean>(false);
  const { address } = useAppSelector(getWalletSlice);
  const dispatch = useAppDispatch();
  const { createNewAccount } = walletSliceActions;
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { isTablet } = useDevices();

  // const [addressGenerate,setAddressGenerate] = useState()

  const minSignatureOptions = useMemo(
    () =>
      [...new Array(watchBeneficiaries?.length || 0)].map((_, index) => ({
        label: index + 1,
        value: index + 1,
      })),
    [watchBeneficiaries?.length]
  );

  const handleDeleteBeneficiary = () => {
    const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
    const newBeneficiaries = currentBeneficiaries.filter(
      (beneficiary: BeneficiaryData) => beneficiary?.address !== selectedAddress
    );
    setFieldValue("beneficiariesList", newBeneficiaries);
    WillToast.success("Delete successfully");
    const minRequiredSignatures = getFieldValue("minRequiredSignatures");
    if (minRequiredSignatures > newBeneficiaries.length) {
      setFieldValue("minRequiredSignatures", null);
    }
  };

  const columns: ColumnsType<BeneficiaryData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Flex gap={10} align="center" className="beneficiary-table--name">
          {
            record?.avatar ? (
              <WillImage
                src={record?.avatar}
              />
            ) : <UserOutlinedIcon />
          }

          <Text className="neutral-1 font-semibold">{name}</Text>
        </Flex>
      ),
    },
    {
      title: "Owner Address",
      dataIndex: "address",
      key: "address",
      render: (address, _, index) => (
        <Flex align="center" justify="flex-end" gap={4}>
          <Text className="neutral-1">{address}</Text>
          <IconButton
            onClick={() => {
              handleCopyToClipboard(address);
              setIndexCopied(index);
            }}
          >
            {isCopied && indexCopied === index ? (
              <CheckOutlinedIcon />
            ) : (
              <CopyIcon />
            )}
          </IconButton>
        </Flex>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <IconButton
          onClick={() => {
            setSelectedAddress(record?.address);
            onOpen();
          }}
        >
          <TrashIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    resetFields();
    // setFieldValue("beneficiariesList", []);
    setImage("");
    if (generate) {
      generateNewAccount();
    }
  }, [generate]);

  const onAddBeneficiary = async (values: any) => {
    const authServices = new AuthServices();
    setLoading(true);
    try {
      if (values?.beneficiaryAddress === address) {
        WillToast.error("You can't add your own address as a beneficiary");
        return;
      }
      const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
      const beneficiaryIndex = currentBeneficiaries.findIndex(
        (beneficiary: BeneficiaryData) =>
          beneficiary?.address === values?.beneficiaryAddress
      );
      if (beneficiaryIndex > -1) {
        WillToast.error("Beneficiary already exists");
        return;
      }
      const res = await authServices.findByWallet({ walletAddress: values?.beneficiaryAddress });
      const avatar = res?.data?.data?.data?.avatar;
      const newBeneficiary: BeneficiaryData = {
        id: currentBeneficiaries.length + 1,
        name: values.beneficiaryName,
        address: values.beneficiaryAddress,
        avatar,
      };
      setFieldValue("beneficiariesList", [
        newBeneficiary,
        ...currentBeneficiaries,
      ]);
      WillToast.success("Add beneficiary successfully");
      resetFields();
      setIsValidBeneficiary(false);
      setImage("");
    } catch (error: any) {
      WillToast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    const isTouched = form.isFieldsTouched(true);
    setIsValidBeneficiary(isTouched && !hasErrors);
  };

  const generateNewAccount = async () => {
    const res = (await dispatch(
      createNewAccount({ wallet: WALLETS.metamask })
    )) as any;
    form.setFields([
      {
        name: "beneficiaryAddress",
        value: res.payload.address,
      },
    ]);
    const base64 = await QRCode.toDataURL(res.payload.privateKey);
    setImage(base64);
  };

  const handleDowloadQrCode = () => {
    const link = document.createElement("a");
    link.href = image as string;
    const beneficiaryName = form.getFieldValue("beneficiaryName") as any;
    link.download = `${beneficiaryName ? beneficiaryName.toLowerCase().trim() : "qrcode"
      }.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const disabled = useMemo(() => {
    if (watchBeneficiaries && watchBeneficiaries.length >= 10) {
      return true;
    }
    if (!generate) {
      return (
        (watchBeneficiaries && watchBeneficiaries.length === 10) ||
        !isValidBeneficiary
      );
    }

    return !image;
  }, [watchBeneficiaries?.length, isValidBeneficiary, image]);

  return (
    <Flex vertical gap={isTablet ? 24 : 12} className="mt-3">
      <Form
        form={form}
        onFinish={onAddBeneficiary}
        id="form-add-beneficiary"
        onFieldsChange={validateForm}
      >
        <Flex vertical gap={12}>
          <Flex vertical={isTablet} gap={24}>
            <Flex
              vertical={generate || isTablet}
              gap={16}
              className={clsx(
                "beneficiaries-wrapper",
                generate && "beneficiaries-wrapper--generate"
              )}
            >
              <Flex
                vertical
                gap={10}
                className={clsx("beneficiary-name", generate && "generate")}
              >
                <Text className="font-semibold neutral-1 text--no-wrap">
                  Beneficiary nickname
                </Text>
                <Form.Item name="beneficiaryName" rules={BENEFICIARY_RULES}>
                  <AppInput
                    maxLength={15}
                    className="input-beneficiary-name"
                    placeholder="Enter beneficiary name"
                    preventPasteSpecialChar
                    onKeyDown={(e: any) => {
                      const regex = /^[a-zA-Z0-9]+$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Flex>
              <Flex
                vertical
                gap={10}
                className={clsx("beneficiary-address", generate && "generate")}
              >
                <Text className="font-semibold neutral-1">
                  Ethereum public address
                </Text>
                <Form.Item
                  name="beneficiaryAddress"
                  rules={ETHEREUM_ADDRESS_RULES}
                >
                  {
                    !isTablet ? (
                      <AppInput
                        readOnly={generate}
                        maxLength={42}
                        placeholder="Enter beneficiary's wallet address"
                        preventPasteSpecialChar
                        onKeyDown={(e: any) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                      />
                    ) : (
                      <AppInputArea
                        className="input-beneficiary-address"
                        readOnly={generate}
                        maxLength={42}
                        placeholder="Enter beneficiary's wallet address"
                        preventPasteSpecialChar
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        onKeyDown={(e: any) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                      />
                    )
                  }

                </Form.Item>
              </Flex>
            </Flex>
            {generate && (
              <Flex vertical gap={10} className="generate-QR">
                <Text className="font-semibold neutral-1 text--no-wrap">
                  QR Code to access private key
                </Text>
                {image && image && (
                  <div className="main-qr-code">
                    <Flex justify="center">
                      <Image width={96} preview={false} src={image}></Image>
                    </Flex>
                    <div
                      className="btn-download-qr-code"
                      onClick={handleDowloadQrCode}
                    >
                      Download QR code
                    </div>
                  </div>
                )}
              </Flex>
            )}
          </Flex>

          <Form.Item>
            {generate && (
              <Flex
                align="center"
                className="add-more"
                onClick={generateNewAccount}
              >
                <Plus />
                Add more beneficiary
              </Flex>
            )}
            <AppButton
              disabled={disabled}
              type="primary"
              size="xl"
              className="none-styles beneficiary-name"
              onClick={submit}
              loading={loading}
            >
              <Text className="uppercase font-bold">Save this beneficiary</Text>
            </AppButton>
          </Form.Item>
        </Flex>
      </Form>
      <Divider style={{ margin: "0px 0px" }} />
      <Form.Item name="beneficiariesList">
        <Flex vertical gap={16}>
          <Text className="font-semibold neutral-1">
            Existing beneficiaries:
          </Text>
          <AppTable
            className={`${watchBeneficiaries && watchBeneficiaries.length > 0 && "have-data"
              }`}
            columns={columns}
            dataSource={
              watchBeneficiaries && watchBeneficiaries.length > 0
                ? watchBeneficiaries
                : []
            }
            pagination={false}
            hasIconAction={true}
            locale={{
              emptyText: (
                <NodataTable />
              ),
            }}
          />
        </Flex>
      </Form.Item>
      <Flex vertical gap={10}>
        <Text className="neutral-1 font-semibold">
          Minimum number of signatures required to access assets once activated:
        </Text>
        <Form.Item
          name="minRequiredSignatures"
          rules={[
            { required: true, message: "Please select a number of signatures" },
          ]}
        >
          <AppSelect
            className="select-signature"
            popupClassName="select-signature-dropdown"
            options={minSignatureOptions}
          />
        </Form.Item>
      </Flex>
      <DeleteBeneficiaryModal
        onClose={onClose}
        open={isOpen}
        onDelete={handleDeleteBeneficiary}
        selectedAddress={selectedAddress}
      />
    </Flex>
  );
};
