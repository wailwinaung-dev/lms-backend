import { ClerkClient, verifyToken } from '@clerk/backend';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  id: string;
  email: string;
  imageUrl: string;
  name: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('ClerkClient') private clerkClient: ClerkClient,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<{
      req: { headers: Record<string, string>; user?: AuthUser };
    }>();

    const token = req.headers.authorization?.split(' ').pop();
    console.log('Access Token > ', token);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const tokenPayload = await verifyToken(token, {
        jwtKey: this.configService.get('clerk.jwtKey'),
      });

      const user = await this.clerkClient.users.getUser(tokenPayload.sub);
      req.user = {
        id: user.id,
        imageUrl: user.imageUrl,
        name: user.firstName + ' ' + user.lastName,
        email: user.emailAddresses[0].emailAddress,
      };
      return true;
    } catch (error) {
      console.error('error', error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
