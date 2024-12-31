class bkashConfig {
  baseUrl =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_URL!
      : process.env.BKASH_LIVE_URL!;
  username =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_USERNAME!
      : process.env.BKASH_LIVE_USERNAME!;
  password =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_PASSWORD!
      : process.env.BKASH_LIVE_PASSWORD!;
  appKey =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_APP_KEY!
      : process.env.BKASH_LIVE_APP_KEY!;
  appSecret =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_APP_SECRET!
      : process.env.BKASH_LIVE_APP_SECRET!;
  callbackUrl =
    process.env.BKASH_SANDBOX === "true"
      ? process.env.BKASH_SANDBOX_CALLBACK_URL!
      : process.env.BKASH_LIVE_CALLBACK_URL!;
}

const bkashConfigInstance = new bkashConfig();
export default bkashConfigInstance;
