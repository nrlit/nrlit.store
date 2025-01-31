interface IBkashGrantTokenResponse {
  statusCode: string;
  statusMessage: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface IBkashRefreshTokenSuccessResponse {
  statusCode: string;
  statusMessage: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface IBkashRefreshTokenErrorResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashCreatePaymentRequest {
  id_token: string;
  amount: string;
  invoice: string;
  reference?: string;
}

interface IBkashCreatePaymentSuccessResponse {
  paymentID: string;
  bkashURL: string;
  callbackURL: string;
  successCallbackURL: string;
  failureCallbackURL: string;
  cancelledCallbackURL: string;
  amount: string;
  intent: string;
  currency: string;
  paymentCreateTime: string;
  transactionStatus: string;
  merchantInvoiceNumber: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashCreatePaymentSuccessResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashExecutePaymentRequest {
  id_token: string;
  paymentID: string;
}

interface IBkashExecutePaymentSuccessResponse {
  paymentID: string;
  trxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  paymentExecuteTime: string;
  merchantInvoiceNumber: string;
  payerType: string;
  payerReference: string;
  customerMsisdn: string;
  payerAccount: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashExecutePaymentErrorResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashQueryPaymentRequest {
  id_token: string;
  paymentID: string;
}

interface IBkashQueryPaymentSuccessResponse {
  paymentID: string;
  trxID: string;
  mode: string;
  paymentCreateTime: string;
  paymentExecuteTime: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoice: string;
  transactionStatus: string;
  serviceFee: string;
  creditedAmount: string;
  verificationStatus: string;
  payerReference: string;
  payerType: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashQueryPaymentErrorResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashSearchTransactionRequest {
  id_token: string;
  trxID: string;
}

interface IBkashSearchTransactionSuccessResponse {
  trxID: string;
  initiationTime: string;
  completedTime: string;
  transactionType: string;
  customerMsisdn: string;
  payerAccount: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  organizationShortCode: string;
  serviceFee: string;
  payerType: string;
  creditedAmount: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashSearchTransactionErrorResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashRefundRequest {
  id_token: string;
  paymentID: string;
  trxID: string;
  refundAmount: string;
  sku: string;
  reason: string;
}

interface IBkashRefundSuccessResponse {
  originalTrxID: string;
  refundTrxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  completedTime: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashRefundErrorResponse {
  errorCode: string;
  errorMessage: string;
}

interface IBkashRefundStatusRequest {
  id_token: string;
  paymentID: string;
  trxID: string;
}

interface IBkashRefundStatusSuccessResponse {
  originalTrxID: string;
  refundTrxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  completedTime: string;
  statusCode: string;
  statusMessage: string;
}

interface IBkashRefundStatusErrorResponse {
  errorCode: string;
  errorMessage: string;
}
