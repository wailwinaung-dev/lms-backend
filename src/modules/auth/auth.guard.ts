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

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

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
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
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
