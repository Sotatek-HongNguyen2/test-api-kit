import "./styles.scss"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { WillCard } from "../../will-card"
import { WillFilter } from "./WillFilter"
import { WillData } from "@/types"
import AppPagination from "@/components/molecules/Pagination"
import { useEffect, useState } from "react"
import { WillServices } from "@/services/will-service"
import WillToast from "@/components/atoms/ToastMessage"
import { NoData } from "@/assets/icons"
import { useSearchParams } from "react-router-dom"
import { serializeFormQuery } from "@/helpers/common"
import { CustomRadioItemProps } from "@/components/molecules/radio-group"
import { SearchParams } from "@/types/global"

interface WillListProps {
  type?: "created" | "inherited";
}

export const WillList = (props: WillListProps) => {
  const { type } = props;

  const [myWills, setMyWills] = useState<WillData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const willService = new WillServices();

  const getWills = async () => {
    try {
      const params: SearchParams = {
        limit: 10,
        page: currentPage || 1,
      };
      searchParams.get("type") && (params["type"] = searchParams.get("type") === 'all' ? "" : searchParams.get("type") || "");
      searchParams.get("keyword") && (params["keyword"] = searchParams.get("keyword") || "");
      const data =
        type === "created" ? await willService.getMyWill(params) :
          type === "inherited" ? await willService.getMyInheritedWill(params) : null;
      if (data) {
        setMyWills(data?.data);
        setCurrentPage(data?.metadata?.page);
        setTotalPage(data?.metadata?.totalPage);
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    }
  }

  useEffect(() => {
    getWills();
  }, [currentPage, type, searchParams])

  const getTitle = () => {
    switch (type) {
      case "inherited":
        return "The following wills have you as a beneficiary and a co-signer:"
      case "created":
        return "This is the list of wills you created:"
      default:
        return "My wills"
    }
  }

  const onSearch = (value: string | undefined) => {
    const newValue = value || "";
    const newParams = {
      type: searchParams.get("type") || "",
      keyword: newValue,
    }
    const params = serializeFormQuery(newParams);
    setSearchParams(params);
  };

  const onFilter = (value: CustomRadioItemProps['value']) => {
    const newParams = {
      type: value,
      keyword: searchParams.get("keyword") || "",
    }
    const params = serializeFormQuery(newParams);
    setSearchParams(params);
  };

  return (
    <Flex justify="space-between" gap="5vw">
      <WillFilter onSearch={onSearch} onFilter={onFilter} />
      <Flex vertical className="app-will--list">
        <Flex vertical gap="32px">
          <Text size="text-lg">{getTitle()}</Text>
          {
            (myWills && myWills.length > 0) ? (
              <>
                <>
                  {
                    myWills?.map((will) => (
                      <WillCard key={`will-item-${will?.id}`} will={will} />
                    ))
                  }
                </>

                <Flex justify="flex-end">
                  <AppPagination total={totalPage} current={currentPage} onChange={(page) => setCurrentPage(page)} />
                </Flex>
              </>
            ) : (
              <Flex vertical justify="center" align="center" gap={16}>
                <NoData />
                <Flex vertical gap={4}>
                  <Text size="text-lg" align="center" className="font-semibold neutral-1">No data</Text>
                  <Text size="text-sm" align="center" className="neutral-2">You currently have no will. Get started by creating a will</Text>
                </Flex>
              </Flex>
            )
          }
        </Flex>
      </Flex>
    </Flex>
  )
}