import Path from 'path';
import {HTTPStatus} from '../helpers';

export default class WebAppController {
    index(req, res) {
        return res
            .status(HTTPStatus.OK)
            .sendFile(Path.join(`${__dirname}/../../public/dist/index.html`));
    };
}