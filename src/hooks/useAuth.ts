import { useState } from "react";
import { AuthServices } from "@/services/auth-service";
// Adjust the import based on your project structure

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authService = new AuthServices();

  const login = async (resSignMessage: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginResults = await authService.login({
        signature: `${resSignMessage.payload}`,
      });

      if (
        loginResults.data.status === 201 ||
        loginResults.data.status === 200
      ) {
        localStorage.setItem("accessToken", loginResults.data.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          loginResults.data.data.refreshToken
        );
      }
      return loginResults;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
