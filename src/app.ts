import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// per-request logs are useful in development but slow things down under load
if (app.get('env') !== 'production') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;

  // only include the stack trace in development
  res.status(status).json({
    error: {
      status,
      message: err.message,
      ...(req.app.get('env') === 'development' && { stack: err.stack }),
    },
  });
});

export default app;
