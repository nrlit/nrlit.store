export const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not set`);
    return "";
  }
  return value;
};
