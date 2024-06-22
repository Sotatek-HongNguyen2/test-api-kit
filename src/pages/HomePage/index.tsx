import { Flex } from "antd";

import { WillTabs } from "@/components/organisms/wil-tabs";
// import { balancesSliceActionThunk } from "@/store/slices/useBalances";
// import { AppButton } from "@/components/atoms/button";
// import { useAppDispatch } from "@/store";

export function HomePage() {
  // const { fetchBalances } = balancesSliceActionThunk;
  // const dispatch = useAppDispatch();
  // const handleClickLogout = async () => {
  //   const a = await dispatch(fetchBalances());
  //   console.log(a);
  // };

  return (
    <Flex vertical gap="5vh" className="home-page">
      <WillTabs />
      {/* <AppButton type="primary" onClick={handleClickLogout}>
        Logout
      </AppButton> */}
    </Flex>
  );
}
