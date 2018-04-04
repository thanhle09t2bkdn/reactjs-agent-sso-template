import {port} from './server/config';
import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Path from 'path';
import {Api, Web} from './server/routes';
import Favicon from 'serve-favicon';

const app = Express();

app.use(Cors())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Express.static(Path.resolve(__dirname, 'public'), {maxAge: 31557600000}))
    .use('/', Web)
    .use('api', Api);

app.use(Favicon(Path.join(__dirname, 'public', 'images', 'favicon.ico')));

const server = app.listen( port || 9999, () => {
    console.log('Listening on port ' + server.address().port);
});