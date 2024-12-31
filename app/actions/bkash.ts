"use server";

import bkashConfigInstance from "@/lib/bkashConfig";

export const bkashGrantToken = async () => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/token/grant`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          username: bkashConfigInstance.username,
          password: bkashConfigInstance.password,
        }),
        body: JSON.stringify({
          app_key: bkashConfigInstance.appKey,
          app_secret: bkashConfigInstance.appSecret,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashRefreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/token/refresh`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          username: bkashConfigInstance.username,
          password: bkashConfigInstance.password,
        }),
        body: JSON.stringify({
          app_key: bkashConfigInstance.appKey,
          app_secret: bkashConfigInstance.appSecret,
          refresh_token: refreshToken,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashCreatePayment = async (
  reqData: IBkashCreatePaymentRequest
) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/create`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          mode: "0011",
          payerReference: " ",
          callbackURL: bkashConfigInstance.callbackUrl,
          amount: reqData.amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: reqData.invoice,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashExecutePayment = async (
  reqData: IBkashExecutePaymentRequest
) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/execute`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          paymentID: reqData.paymentID,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashQueryPayment = async (reqData: IBkashQueryPaymentRequest) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/payment/status`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          paymentID: reqData.paymentID,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashSearchTransaction = async (
  reqData: IBkashSearchTransactionRequest
) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/general/searchTransaction`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          trxID: reqData.trxID,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashRefundTransaction = async (reqData: IBkashRefundRequest) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/payment/refund`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          paymentID: reqData.paymentID,
          amount: reqData.refundAmount,
          trxID: reqData.trxID,
          sku: reqData.sku,
          reason: reqData.reason,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const bkashRefundStatus = async (reqData: IBkashRefundStatusRequest) => {
  try {
    const response = await fetch(
      `${bkashConfigInstance.baseUrl}/tokenized/checkout/payment/refund`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: reqData.id_token,
          "x-app-key": bkashConfigInstance.appKey,
        }),
        body: JSON.stringify({
          paymentID: reqData.paymentID,
          trxID: reqData.trxID,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statusCode === "0000") {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          data: data,
        };
      }
    } else {
      const data = await response.json();
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};
