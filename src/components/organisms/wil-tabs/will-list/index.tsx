import "./styles.scss";
import { Flex } from "antd";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import { WillData } from "@/types";
import AppPagination from "@/components/molecules/Pagination";
import { Text } from "@/components/atoms/text";
import { WillServices } from "@/services/will-service";
import WillToast from "@/components/atoms/ToastMessage";
import { NoData } from "@/assets/icons";
import { CustomRadioItemProps } from "@/components/molecules/radio-group";
import { SearchParams } from "@/types/global";

import { WillFilter } from "./WillFilter";
import { WillCard } from "../../will-card";

export interface WillListProps {
  type?: "created" | "inherited";
}

const initSearch: SearchParams = {
  limit: 10,
  page: 1,
  type: "all",
  keyword: "",
};

export const WillList = (props: WillListProps) => {
  const { type } = props;

  const [myWills, setMyWills] = useState<WillData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>(initSearch);
  const willService = new WillServices();

  const getWills = async () => {
    try {
      const params: SearchParams = {
        limit: 10,
        page: searchParams?.page || 1,
      };
      searchParams?.type &&
        (params["type"] =
          searchParams?.type === "all" ? "" : searchParams?.type || "");
      searchParams?.keyword &&
        (params["keyword"] = searchParams?.keyword || "");
      const data =
        type === "created"
          ? await willService.getMyWill(params)
          : type === "inherited"
            ? await willService.getMyInheritedWill(params)
            : null;
      if (data) {
        setMyWills(data?.data);
        setCurrentPage(data?.metadata?.page);
        setTotalPage(data?.metadata?.totalPage);
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    }
  };

  const debouncedGetWills = useCallback(debounce(getWills, 500), [
    searchParams,
    type,
  ]);

  useEffect(() => {
    debouncedGetWills();
    return () => {
      debouncedGetWills.cancel();
    };
  }, [searchParams, type]);

  const getTitle = () => {
    if (!myWills || (myWills && myWills.length === 0)) return "Your wills will appear here once you have configured.";
    switch (type) {
      case "inherited":
        return "The following wills have you as a beneficiary and a co-signer:";
      case "created":
        return "This is the list of wills you created:";
      default:
        return "My wills";
    }
  };

  const onSearch = (value: string | undefined) => {
    const newValue = value || "";
    const newParams = {
      ...searchParams,
      keyword: newValue,
    };
    setSearchParams(newParams);
  };

  const onFilter = (value: CustomRadioItemProps["value"]) => {
    if (!value) return;
    const newParams = {
      ...searchParams,
      type: value,
    };
    setSearchParams(newParams);
  };

  return (
    <Flex justify="space-between" gap="5vw">
      <WillFilter onSearch={onSearch} onFilter={onFilter} type={type} />
      <Flex vertical className="app-will--list">
        <Flex vertical gap="32px">
          <Text size="text-lg" className="neutral-1">{getTitle()}</Text>
          {myWills && myWills.length > 0 ? (
            <>
              <>
                {myWills?.map((will) => (
                  <WillCard key={`will-item-${will?.id}`} will={will} type={type} />
                ))}
              </>

              <Flex justify="flex-end">
                <AppPagination
                  total={totalPage}
                  current={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </Flex>
            </>
          ) : (
            <Flex vertical justify="center" align="center" gap={16}>
              <NoData />
              <Flex vertical gap={4}>
                <Text
                  size="text-lg"
                  align="center"
                  className="font-semibold neutral-1"
                >
                  No data
                </Text>
                <Text size="text-sm" align="center" className="neutral-2">
                  You currently have no will. Get started by creating a will
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
