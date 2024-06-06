import { Signature } from '@0x/protocol-utils';
import { BigNumber } from '@0x/utils';
import { NULL_ADDRESS, NULL_BYTES_32, OrderMethod, OrderSide, OrderType } from 'src/constants/exchange';
import OrderContract from 'src/helpers/orderContract';
import { OrderService } from 'src/services/order-service';
import { Protocol0xService } from 'src/services/protocol-0x-service';
import { ZERO_FEE } from '../constants/exchange';
import { useLimitOrderFeatureContract } from '../web3/contracts/useLimitOrderFeatureContract';

interface ICreateOrder {
  baseToken: string;
  quoteToken: string;
  account: string;

  pairId: number;
  decimalQuote: number;
  decimalBase: number;
  rateFee: number;
  price: string;
  amount: number;
  slippage: number;

  orderSide: OrderSide;
  orderType: OrderType;
  expireTime: EpochTimeStamp;
  total?: string;
}

export const useSpotTrading = () => {
  const limitOrderFeatureContract = useLimitOrderFeatureContract();

  const signOrder = async (args: ICreateOrder) => {
    const {
      baseToken,
      quoteToken,
      price,
      amount,
      slippage,
      orderSide,
      decimalQuote,
      decimalBase,
      rateFee,
      expireTime,
      account,
      orderType,
      pairId,
      total,
    } = args;

    const protocol0xService = new Protocol0xService();
    let makerToken, takerToken, makerAmount, takerAmount, takerTokenFeeAmount, priceSlipPage;
    if (orderSide === OrderSide.Buy) {
      makerToken = quoteToken;
      takerToken = baseToken;
      priceSlipPage = new BigNumber(price).times(new BigNumber(slippage || 0).div(100).plus(1));
      // makerAmount = protocol0xService.roundNumber(
      //   new BigNumber(amount).times(priceSlipPage).times(Math.pow(10, decimalQuote)),
      // );

      takerAmount = protocol0xService.roundNumber(
        new BigNumber(amount).times(Math.pow(10, decimalBase)),
      );
      // change decimalBase -> quote
      // takerTokenFeeAmount = protocol0xService.roundNumber(
      //   new BigNumber(amount).times(priceSlipPage).times(Math.pow(10, decimalQuote)).times(rateFee),
      // );
      if (total) {
        makerAmount = protocol0xService.roundNumber(
          new BigNumber(total).times(Math.pow(10, decimalQuote)),
        );
        takerTokenFeeAmount = protocol0xService.roundNumber(
          new BigNumber(total).times(Math.pow(10, decimalQuote)).times(rateFee),
        );
      } else {
        makerAmount = protocol0xService.roundNumber(
          new BigNumber(amount).times(priceSlipPage).times(Math.pow(10, decimalQuote)),
        );
        takerTokenFeeAmount = protocol0xService.roundNumber(
          new BigNumber(amount)
            .times(priceSlipPage)
            .times(Math.pow(10, decimalQuote))
            .times(rateFee),
        );
      }
    } else {
      makerToken = baseToken;
      takerToken = quoteToken;
      priceSlipPage = new BigNumber(price).times(
        new BigNumber(1).minus(new BigNumber(slippage || 0).div(100)),
      );
      // makerAmount = protocol0xService.roundNumber(
      //   new BigNumber(amount).times(Math.pow(10, decimalBase)),
      // );
      // takerAmount = protocol0xService.roundNumber(
      //   new BigNumber(amount).times(priceSlipPage).times(Math.pow(10, decimalQuote)),
      // );
      takerTokenFeeAmount = protocol0xService.roundNumber(
        new BigNumber(amount).times(Math.pow(10, decimalQuote)).times(ZERO_FEE),
      );
      if (total) {
        makerAmount = protocol0xService.roundNumber(
          new BigNumber(total).div(priceSlipPage).times(Math.pow(10, decimalBase)),
        );
        takerAmount = protocol0xService.roundNumber(
          new BigNumber(total).times(Math.pow(10, decimalQuote)),
        );
      } else {
        makerAmount = protocol0xService.roundNumber(
          new BigNumber(amount).times(Math.pow(10, decimalBase)),
        );
        takerAmount = protocol0xService.roundNumber(
          new BigNumber(amount).times(priceSlipPage).times(Math.pow(10, decimalQuote)),
        );
      }
    }

    const order4Sign = {
      makerToken,
      takerToken,
      makerAmount,
      takerAmount,
      maker: account,
      taker: NULL_ADDRESS,
      sender: process.env.REACT_APP_SENDER,
      takerTokenFeeAmount,
      feeRecipient: process.env.REACT_APP_FEE_RECIPIENT_ADDRESS || NULL_ADDRESS,
      pool: NULL_BYTES_32,
      expiry: protocol0xService.roundNumber(new BigNumber(expireTime)).toNumber(),
      salt: protocol0xService.roundNumber(new BigNumber(expireTime)).toNumber(),
      chainId: Number(process.env.REACT_APP_CHAIN_ID),
      verifyingContract: process.env.REACT_APP_LIMIT_ORDER_FEATURE_CONTRACT_ADDRESS,
    };

    const orderGenerated = protocol0xService.generateLimitOrder(order4Sign);
    const signature: any = await protocol0xService.signOrder(orderGenerated);
    const orderParamsSC = [
      order4Sign.makerToken,
      order4Sign.takerToken,
      order4Sign.makerAmount?.toString(),
      order4Sign.takerAmount?.toString(),
      order4Sign.takerTokenFeeAmount?.toString(),
      order4Sign.maker,
      order4Sign.taker,
      order4Sign.sender,
      order4Sign.feeRecipient,
      order4Sign.pool,
      order4Sign.expiry?.toString(),
      order4Sign.salt?.toString(),
    ];
    const orderParamsBE = {
      maker_token: order4Sign.makerToken,
      taker_token: order4Sign.takerToken,
      maker_amounts: order4Sign.makerAmount.toString(),
      taker_amounts: order4Sign.takerAmount.toString(),
      price: priceSlipPage,
      amount: amount,
      sender: order4Sign.sender,
      maker: account,
      taker: NULL_ADDRESS,
      taker_token_fee_amounts: order4Sign.takerTokenFeeAmount,
      fee_recipient: order4Sign.feeRecipient,
      pool: NULL_BYTES_32,
      expiry: expireTime,
      salt: expireTime,
      type: orderType,
      signature: JSON.stringify(signature),
      pair_id: pairId,
      side: orderSide,
      order_hash: orderGenerated.getHash(),
      method: OrderMethod.BscOrderBook,
      slippage,
      total,
    };

    const signatureParamSC: Array<string | number> = [
      // signature.signatureType,
      // signature.v,
      // signature.r,
      // signature.s,
    ];

    return {
      signature,
      signatureParamSC,
      orderParamsBE,
      orderParamsSC,
      makerAmount,
    };
  };

  const createOrderWithBE = async (orderParamsBE: any) => {
    const orderService = await new OrderService();
    const { slippage, ...restParams } = orderParamsBE || {};
    await orderService.createOrder(restParams);
  };

  const createOrderWithSC = async (order: any, signature: Array<string | number>) => {
    const orderContract = new OrderContract(limitOrderFeatureContract);
    const res = await orderContract.createLimitOrder(order, signature);
    await res.wait(1);
    return res;
  };

  const cancelOrder = async (id: any) => {
    const orderService = await new OrderService();
    await orderService.cancelOrder(id);
  };

  return {
    signOrder,
    createOrderWithBE,
    createOrderWithSC,
    cancelOrder,
  };
};
