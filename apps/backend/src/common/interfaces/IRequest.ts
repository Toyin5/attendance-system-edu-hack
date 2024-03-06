import { Schema } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: Schema.Types.UUID;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
}
