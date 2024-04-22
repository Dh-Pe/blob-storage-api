import { DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';

export class S3Service {
	private client: S3Client;
	private bucket: string;
	constructor(env: Env) {
		this.bucket = env.CF_BUCKET;
		this.client = new S3Client({
			region: env.CF_REGION,
			endpoint: env.CF_ENDPOINT,
			credentials: {
				accessKeyId: env.CF_ACCESS_KEY_ID,
				secretAccessKey: env.CF_SECRET_ACCESS_KEY,
			},
		});
	}

	async putObject(key: string, data: Buffer) {
		try {
			const command = new PutObjectCommand({
				Bucket: this.bucket,
				Key: key,
				Body: data,
			});
			const response = await this.client.send(command);
			return response;
		} catch (error) {
			return new Error('Erro ao executar putObject: ' + error.message);
		}
	}

	async getObject(key: string) {
		try {
			const command = new GetObjectCommand({
				Bucket: this.bucket,
				Key: key,
			});
			const response = await this.client.send(command);
			return response.Body;
		} catch (error) {
			return new Error('Erro ao executar getObject: ' + error.message);
		}
	}

	async deleteObject(key: string) {
		try {
			const command = new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: key,
			});
			return (await this.client.send(command)).DeleteMarker;
		} catch (error) {
			return new Error('Erro ao executar deleteObject: ' + error.message);
		}
	}

	async listObjects() {
		try {
			const command = new ListObjectsCommand({
				Bucket: this.bucket,
			});
			const response = await this.client.send(command);
			return response.Contents;
		} catch (error) {
			return new Error('Erro ao executar listObjects: ' + error.message);
		}
	}
}
