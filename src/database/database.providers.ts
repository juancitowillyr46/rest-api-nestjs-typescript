import { MongooseModule } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
require('dotenv').config();

const dataBaseHost = process.env.DB_HOST;
const dataBaseName = process.env.DB_NAME;
const dataBasePort = process.env.DB_PORT;
const connection = `mongodb://${dataBaseHost}:${dataBasePort}/${dataBaseName}`;

export const dataBaseProviders = MongooseModule.forRoot(connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
