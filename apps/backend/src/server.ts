import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';
import cookieParser from 'cookie-parser';

import compressFilter from '@common/middleware/compressFilter';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin } from '@common/utils/envConfig';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRoutes';
import { usersRouter } from '@modules/user/userRoutes';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(compression({ filter: compressFilter }));
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Request logging
app.use(requestLogger());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/api', usersRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
