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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('ClerkClient') private clerkClient: ClerkClient,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<{
      req: { headers: Record<string, string> };
    }>();

    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.configService.get('cleark.secretKey'),
        authorizedParties: ['http://localhost:3001'],
        jwtKey: this.configService.get('clerk.jwtKey'),
        apiUrl: 'https://api.clerk.com',
      });

      const user = await this.clerkClient.users.getUser(tokenPayload.sub);
      console.log(user);
      return true;
    } catch (error) {
      console.error('error', error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
