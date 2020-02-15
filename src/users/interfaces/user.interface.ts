import { Document } from "mongoose";

export interface User extends Document {
  readonly id_: number;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly acceptTerms: boolean;
}
