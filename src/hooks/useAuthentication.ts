import React, { useMemo } from "react";
import { userAddress } from "../helpers";

export const useAuthentication = () => {
    const isUserLoggedIn = useMemo(() => localStorage.getItem(userAddress), []);

    const logout = () => {};

    return {
        isUserLoggedIn,
        logout,
    };
};
