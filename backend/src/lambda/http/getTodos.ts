import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserId } from '../../auth/utils';
import { createLogger } from '../../utils/logger';
import { getTodos } from '../service/todoService';

const logger = createLogger('getTodos')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId: string = getUserId(event);
    const items = await getTodos(userId);
    logger.info("Get todos");
    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors(
      {
        origin: "*",
        credentials: true,
      }
    )
  )
