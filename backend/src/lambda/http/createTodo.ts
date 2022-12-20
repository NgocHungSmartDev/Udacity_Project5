import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../../auth/utils'
import { createTodo } from '../service/todoService'

const logger = createLogger('CreateTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Begin create method');
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    // TODO: Implement creating a new TODO item
    const userId: string = getUserId(event);
    const todo = await createTodo(newTodo, userId);
    logger.info('End create method');

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: todo
      })
    }
  });

handler
.use(httpErrorHandler())
.use(
  cors({
    credentials: true
  })
)
