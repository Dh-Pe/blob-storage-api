import { Context } from 'hono';
import { S3Service } from '../services/s3.service';
import { Buffer } from 'buffer';

type Body = {
    filename: string;
    file: string;
};

export class PutObjectController {
    async handle(c: Context) {
        const body: Body = await c.req.json();
        
        const file = Buffer.from(body.file, 'base64');
        const payload = await new S3Service(c.env).putObject(body.filename, file);

        if (payload instanceof Error) {
            return c.json({ error: 'An error occurred while processing the request' });
        }

        return c.json({ filename: body.filename, url: `${c.env.CF_BUCKET_FILE_URL}/${body.filename}` });
    }
}
