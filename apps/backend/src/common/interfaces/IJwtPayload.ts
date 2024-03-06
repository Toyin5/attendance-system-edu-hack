import { Schema } from 'mongoose';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: Schema.Types.UUID;
  }
}
