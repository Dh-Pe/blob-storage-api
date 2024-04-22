import { Context } from 'hono';
import { S3Service } from '../services/s3.service';

export class DeleteObjectController {
	async handle(c: Context) {
		const filename: string = c.req.param('filename');

		const payload = await new S3Service(c.env).deleteObject(filename);

		if (payload instanceof Error && !payload.message.includes('FileReader')) {
			return c.json({ error: 'Ocurred an error while deleting the file' });
		}

		return c.json({ deleted: true });
	}
}
