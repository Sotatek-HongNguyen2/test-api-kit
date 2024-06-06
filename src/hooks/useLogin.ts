import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setRoleAffiliate, setStorageJwtToken, userAddress } from 'src/helpers/storage';
import { AuthServices } from 'src/services/auth-service';
import { BaseSocket } from 'src/socket/BaseSocket';
import { setCurrentAccount } from 'src/store/actions/account';
import { setIsWrongNetWork } from 'src/store/actions/network';
import { setAccessTokenRedux, setStoreInfoUserIAO } from 'src/store/actions/user';
import {
  setBalanceAll,
  setBalanceAvailable,
  setBalanceInOrder,
} from 'src/store/actions/wallet-analytic';
import { WEB3_ERROR } from 'src/types';
import { ConnectorKey, connectors } from 'src/web3/connectors';
import { REACT_APP_MESSAGES_SIGN } from 'src/web3/constants/envs';
import { CONNECTOR_KEY } from 'src/web3/constants/storages';
import { signMessage } from 'src/web3/helpers';
import { useConnectWallet } from 'src/web3/hooks';
import { setRoleAffiliateIAO } from './../store/actions/user';

export const apiEndPoint = process.env.REACT_APP_API_URL;

export const useLogin = () => {
  const dispatch = useDispatch();
  const { connectWallet, disconnectWallet } = useConnectWallet();
  const durationActive = moment().add(1, 'h').unix();
  const authService = new AuthServices();

  const getAccountConnected = async (provider: Web3Provider) => {
    const signer = provider.getSigner();
    const account = await signer?.getAddress();
    return account;
  };

  const getSignature = async (provider: Web3Provider) => {
    const message = `${REACT_APP_MESSAGES_SIGN}`;
    const signer = provider?.getSigner();
    const signature = await signMessage(signer, message);
    return {
      message,
      signature,
    };
  };

  const retrySocket = async () => {
    BaseSocket.getInstance().disconnectSocket();
    BaseSocket.getInstance().reconnect();
  };

  const resetStore = (accessToken: string, accountSelected: string) => {
    dispatch(setAccessTokenRedux(accessToken));
    dispatch(setCurrentAccount(accountSelected as string));
    dispatch(setBalanceAvailable([]));
    dispatch(setBalanceInOrder([]));
    dispatch(setBalanceAll([]));
    dispatch(setIsWrongNetWork(false));
  };

  const getUserInfoIAO = async (accessToken: string) => {
    const res = await axios.get(`${apiEndPoint}/api/account`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    dispatch(setStoreInfoUserIAO(res?.data?.data?.data));
    dispatch(setRoleAffiliateIAO(res?.data?.data?.data?.role));
    setRoleAffiliate(res?.data?.data?.data?.role);
  };

  const userLogin = async (connectorKey: ConnectorKey) => {
    try {
      const connector = connectors[connectorKey];
      await connectWallet(connectorKey);

      const provider = new Web3Provider(connector.provider!);

      const accountSelected = await getAccountConnected(provider);
      const { signature } = await getSignature(provider);

      // const res = await authService.login({ walletAddress: accountSelected, signature });
      // const { data } = res;

      // const accessToken = data?.access_token;

      // await getUserInfoIAO(accessTokenIAO);
      resetStore('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', accountSelected);
      setStorageJwtToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
      localStorage.setItem(userAddress, accountSelected);
      localStorage.setItem(CONNECTOR_KEY, connectorKey);
      retrySocket();
    } catch (error: any) {
      console.log('error', error);
      localStorage.removeItem(userAddress);
      resetStore('', '');
      disconnectWallet();
      let baseError = {
        type: 'user_reject',
        message: error?.message,
        description: error,
      } as WEB3_ERROR;
      throw baseError;
    }
  };

  return { userLogin, getUserInfoIAO };
};
