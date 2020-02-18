import { AuthModule } from './auth/auth.module';
import { Module, forwardRef } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "./config/config.module";
import { Configuration } from "./config/config.keys";
import { ConfigService } from "./config/config.service";
import { dataBaseProviders } from "./database/database.providers";
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
// import { dataBaseProviders } from "./database/database.service";
// import { DataBaseService } from "./database/database.service";
// import { databaseProviders } from "./database/database.service";

@Module({
  imports: [
    dataBaseProviders,
    UsersModule,
    ConfigModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static port: number | string;
  
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
