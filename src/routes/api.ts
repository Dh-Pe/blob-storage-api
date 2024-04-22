import { Hono } from 'hono';
import { GetObjectController } from '../controllers/get-object.controller';
import { ListObjectsController } from '../controllers/list-objects.controller';
import { PutObjectController } from '../controllers/put-object.controller';
import { DeleteObjectController } from '../controllers/delete-object.controller';

export const route = new Hono();

route.get('/', new ListObjectsController().handle);
route.get('/:filename', new GetObjectController().handle);
route.post('/', new PutObjectController().handle);
route.delete('/:filename', new DeleteObjectController().handle);
