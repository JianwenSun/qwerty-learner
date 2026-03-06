import { UpyunConfig, UpyunS3Config } from "./upyun";

export interface GlobalSetting {
  upyunConfig: UpyunS3Config;
  shanbeiConfig?: ShanbeiConfig;
}

export interface ShanbeiConfig {
  token: string;
}

export const globalUpyunConfig: UpyunConfig = {
  service: 'home-study',
  operator: 'sunshuo',
  operatorPassword: 'LkqBjmyJrZzsJ2Lh9Z353ZRdDF72Ttg0',
  endpoint: 'https://v0.api.upyun.com'
};

export const defaultUpyunS3Config: UpyunS3Config = {
  service: "home-study",
  accessKeyId: "315ede5c44734a88b87d294e2ab78b95",
  secretAccessKey: "5504ced93162315701bb71fc7bbfc5f8",
  endpoint: "https://s3.api.upyun.com",
}

export const defaultGlobalSetting: GlobalSetting = {
  upyunConfig: defaultUpyunS3Config,
}