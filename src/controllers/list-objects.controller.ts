import { Context } from 'hono';
import { S3Service } from '../services/s3.service';

export class ListObjectsController {
	async handle(c: Context) {
		const payload = await new S3Service(c.env).listObjects();

		if (payload instanceof Error) {
			return c.json({ error: 'Occurred an error while listing objects' });
		}

		return c.json(payload);
	}
}
