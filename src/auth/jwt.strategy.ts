import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }
    // async validate(payload: any) {
    //     if(!payload && !payload.response.error){
    //         throw new UnauthorizedException();
    //     }
    //     return { userId: payload.sub, username: payload.username };
    // }
}