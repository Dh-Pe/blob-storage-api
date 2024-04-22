import { Context } from 'hono';
import { S3Service } from '../services/s3.service';

export class GetObjectController {
	async handle(c: Context) {
		const key: string = c.req.param('filename');

		const payload = await new S3Service(c.env).getObject(key);

		if (payload instanceof Error) {
			return c.json({ error: 'File not exists' });
		}

		return c.json({ filename: key, url: `${c.env.CF_BUCKET_FILE_URL}/${key}` });
	}
}
