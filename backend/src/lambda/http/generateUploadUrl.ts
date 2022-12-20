import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { createAttachmentPresignedUrl } from '../../helpers/attachmentUtils';

const logger = createLogger('Upload')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Begin upload method');

    const todoId = event.pathParameters.todoId
    const uploadUrl = createAttachmentPresignedUrl(todoId);
    
    logger.info('End upload method');
    return {
      statusCode: 202,
      body: JSON.stringify({
        uploadUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(cors(
    {
      origin: "*",
      credentials: true,
    }
  ))

