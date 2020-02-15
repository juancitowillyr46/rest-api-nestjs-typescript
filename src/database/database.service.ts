import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "src/config/config.service";
import { Configuration } from "src/config/config.keys";
import { Injectable } from '@nestjs/common';




// @Injectable()
// export class DataBaseService {

//     constructor(private readonly _configService: ConfigService) {
//         // this.dataBaseProviders();
//     }

//     public dataBaseProviders(): any {
//         // let _configService = new ConfigService();
//         const dataBaseHost = this._configService.get(Configuration.DB_HOST);
//         const dataBaseName = this._configService.get(Configuration.DB_NAME);
//         const dataBasePort = this._configService.get(Configuration.DB_PORT);
//         // // mongodb://localhost:27017/nestjs
//         // const connection = `mongodb://${dataBaseHost}:${dataBasePort}/${dataBaseName}`;
//         // console.log(connection);
//         return MongooseModule.forRoot('mongodb://localhost:27017/nestjs', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//     }

// }

