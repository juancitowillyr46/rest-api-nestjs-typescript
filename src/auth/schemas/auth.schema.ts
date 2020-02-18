import * as mongoose from "mongoose";

export const AuthSchema = new mongoose.Schema({
  username: String,
  password: String
});
