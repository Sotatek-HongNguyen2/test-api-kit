import "./styles.scss";
import { Flex, Pagination, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";

import { WillData } from "@/types";
import AppPagination from "@/components/molecules/Pagination";
import { Text } from "@/components/atoms/text";
import { WillServices } from "@/services/will-service";
import WillToast from "@/components/atoms/ToastMessage";
import { NoData } from "@/assets/icons";
import { CustomRadioItemProps } from "@/components/molecules/radio-group";
import { SearchParams } from "@/types/global";
import { useDevices } from "@/hooks/useMediaQuery";

import { DrawerSelect } from "@/components/molecules/DrawerSelect";

import { WillFilter } from "./WillFilter";
import { WillCard } from "../../will-card";
import { WillTypeModal } from "../will-type-modal";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

export interface WillListProps {
  type?: "created" | "inherited";
}

const initSearch: SearchParams = {
  limit: 4,
  page: 1,
  type: "all",
  keyword: "",
};

export const WillList = () => {

  const [myWills, setMyWills] = useState<WillData[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>(initSearch);
  const [isLoading, setIsLoading] = useState(false);
  const { isTablet } = useDevices();
  const [params] = useSearchParams();
  const type = (params.get("willType") || "created") as WillListProps['type'];

  const willServices = new WillServices();

  const getWills = useCallback(async () => {
    try {
      setIsLoading(true);
      const paramsService: SearchParams = {
        ...searchParams,
        page: searchParams?.page || 1,
        type: searchParams?.type === "all" ? "" : searchParams?.type || "",
        keyword: searchParams?.keyword || "",
      };
      let data;
      if (type === "inherited") {
        data = await willServices.getMyInheritedWill(paramsService);
      } else {
        data = await willServices.getMyWill(paramsService);
      }
      if (data) {
        setMyWills(data?.data);
        setTotalPage(data?.metadata?.total);
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, type]);

  const debouncedGetWills = useCallback(debounce(getWills, 300), [searchParams, type]);

  useEffect(() => {
    debouncedGetWills();
  }, [searchParams, type]);


  const getTitle = () => {
    if (type === "created" && (!myWills || (myWills && myWills.length === 0)))
      return "Your wills will appear here once you have configured.";
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
    <Flex vertical gap={20} className="home-page">
      {isTablet && <DrawerSelect onFilter={onFilter} onSearch={onSearch} />}
      {type === "created" && <WillTypeModal />}
      <Flex justify="space-between" gap="5vw">
        {!isTablet ? (
          <WillFilter onSearch={onSearch} onFilter={onFilter} type={type} />
        ) : null}
        {isLoading ? (
          <Flex justify="center" align="center" className="app-will--list">
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex vertical className="app-will--list">
            <Flex vertical gap="32px">
              <Text size="text-lg" className="neutral-1">
                {getTitle()}
              </Text>
              {myWills && myWills.length > 0 ? (
                <>
                  <>
                    {myWills?.map((will) => (
                      <WillCard
                        key={`will-item-${will?.id}`}
                        will={will}
                        type={type}
                      />
                    ))}
                  </>

                  <Flex justify="flex-end">
                    <AppPagination
                      pageSize={4}
                      total={totalPage}
                      current={searchParams?.page || 1}
                      onChange={(page) =>
                        setSearchParams({ ...searchParams, page })
                      }
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
                      {type === "created"
                        ? "You currently have no will. Get started by creating a will"
                        : "Currently there is no will have you as a beneficiary "}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
