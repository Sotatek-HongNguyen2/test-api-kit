import debounce from "lodash/debounce";
import { useCallback } from "react";
import { AuthServices } from "@/services/auth-service";
import { useAppDispatch } from "@/store";
import { informationInstanceSlideActions } from "@/store/slices/information";

const useGetInformation = () => {
  const authService = new AuthServices();
  const dispatch = useAppDispatch();

  const getInformation = async () => {
    try {
      const logoutResults = await authService.getInformation();
      if (
        logoutResults.data.status === 201 ||
        logoutResults.data.status === 200
      ) {
        const element = logoutResults.data.data;
        const data = {
          avatar: element.avatar,
          country: element.country,
          email: element.email,
          gender: element.gender,
          name: element.name,
        };
        dispatch(informationInstanceSlideActions.updateInformation(data));
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const debouncedGetInformation = useCallback(
    debounce(getInformation, 500),
    []
  );

  return debouncedGetInformation;
};

export default useGetInformation;
