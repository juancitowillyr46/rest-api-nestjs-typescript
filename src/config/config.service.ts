import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: {[key: string]: string};

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== "production";
        if(isDevelopmentEnv){
            const envFilePath = __dirname + '/../../.env';
            const existsPath = fs.existsSync(envFilePath);
            if(!existsPath){
                console.log('.env file does not exist');
                process.exit(0);
            }
            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
                DB_HOST:process.env.DB_HOST,
                DB_NAME:process.env.DB_NAME,
                DB_PORT: process.env.DB_PORT
            }
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }

}
