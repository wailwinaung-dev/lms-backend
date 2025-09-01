import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CompanionsModule } from './modules/companions/companions.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configs/configuration';
import { ClerkClientProvider } from './common/providers/clerk-client.provider';

@Module({
  imports: [
    CompanionsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ClerkClientProvider,
  ],
})
export class AppModule {}
