import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import errorHandling from './middleware/errorHandling';

import './database';
import './container';

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(pagination);

app.use(routes);

app.use(errorHandling.globalErrors);

app.listen(port, () =>
  console.log(`🚀  Server is running at: http://localhost:${port}`),
);
