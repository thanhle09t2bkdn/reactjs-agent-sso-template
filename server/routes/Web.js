import Express from 'express';
import {webAppController} from '../controllers';

const router = Express.Router(); // eslint-disable-line new-cap

router.route('*').get(webAppController.index);

export default router;