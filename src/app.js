
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import router from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

export default app;
