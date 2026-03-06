export interface UpyunS3Config {
  service: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
}

export interface UpyunConfig {
  service: string;
  operator: string;
  operatorPassword: string;
  endpoint: string;
}