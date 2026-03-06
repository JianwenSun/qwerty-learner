import { defaultUpyunS3Config } from '@/config/settings';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { UpyunS3Config } from '../config/upyun';

export class UpyunS3 {
  private config: UpyunS3Config;
  private s3Client: S3Client;

  constructor(config: UpyunS3Config) {
    this.config = config;

    this.s3Client = new S3Client({
      region: "auto",
      endpoint: this.config.endpoint,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      }
    });
  }

  public async saveObj(key: string, obj: object): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.config.service,
      Key: key,
      Body: JSON.stringify(obj),
      ContentType: "application/json",
    });
    await this.s3Client.send(command);
  }

  public async saveText(key: string, text: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.config.service,
      Key: key,
      Body: text,
      ContentType: "text/plain",
    });
    await this.s3Client.send(command);
  }

  async getText(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.service,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      return response.Body?.transformToString() || "";
    } catch (error) {
      console.error('Error fetching text from S3:', error);
      throw error;
    }
  }
}

export const UpyunS3Client = new UpyunS3(defaultUpyunS3Config)
