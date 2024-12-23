// import { from } from "rxjs";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){} 

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('auth');
        
        const req = context.switchToHttp().getRequest()
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith("Bearer ")){
            throw new UnauthorizedException()
        }
        const token = authorization.split(' ')[1]

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payLoad = await this.jwtService.verifyAsync(token)
            req.user = payLoad
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true
    }
}




