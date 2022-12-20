import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../../auth/utils'
import { deleteTodo } from '../service/todoService'
import { removeAttachment } from '../../helpers/attachmentUtils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('DeleteTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Begin delete method');

    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const userId: string = getUserId(event);
    await deleteTodo(userId, todoId);
    await removeAttachment(todoId);

    logger.info('End delete method');
    
    return {
      statusCode: 200,
      body: JSON.stringify({})
    };
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