import { Schema } from 'mongoose';

export interface ICourse {
  name: string;
  lecturer: Schema.Types.UUID;
  description: string;
  slug: string;
  code: string;
  avatar: string;
}
