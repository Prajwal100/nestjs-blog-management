import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { join } from 'path';

const logger = new Logger('GraphQL');
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: any) => {
        logger.error(JSON.stringify(error));

        const errorObj = {
          success: false,
          statusCode: 500,
          message: 'Something went wrong.',
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            path: error?.path || [],
            response: {
              message: 'Something went wrong.',
              detail: 'Internal Server Error.',
            },
          },
        };

        if (error instanceof ApolloError) {
          errorObj.message = error.message;
          errorObj.statusCode = error.extensions?.response?.statusCode || 500;
          errorObj.extensions.code =
            error.extensions?.code || 'INTERNAL_SERVER_ERROR';
          errorObj.extensions.response = {
            message: error.extensions.response?.message || 'An error occurred',
            detail: error.extensions.response?.error || 'Internal Server Error',
          };
        } else if (error?.extensions?.exception?.name === 'HttpException') {
          errorObj.message = error.message;
          errorObj.statusCode = error.extensions.exception?.status || 500;
          errorObj.extensions.code =
            error.extensions?.code || 'INTERNAL_SERVER_ERROR';
          errorObj.extensions.path = error.path || [];
          errorObj.extensions.response = {
            message: error.extensions.exception?.message || 'An error occurred',
            detail:
              error.extensions.exception?.message || 'Internal Server Error',
          };
        } else {
          errorObj.message = error.message || 'Internal Server Error';
          errorObj.statusCode = error.extensions?.exception?.status || 500;
          errorObj.extensions.code =
            error.extensions?.code || 'INTERNAL_SERVER_ERROR';
          errorObj.extensions.path = error.path || [];
          errorObj.extensions.response = {
            message: error.message || 'An error occurred',
            detail:
              error?.extensions?.exception?.details || 'Internal Server Error',
          };
        }

        return errorObj;
      },
    }),
  ],
})
export class GraphqlModule {}
