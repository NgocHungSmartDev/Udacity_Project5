import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { downloadUrlFromS3 } from '../../helpers/attachmentUtils';

const logger = createLogger('Download File');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const payload = JSON.parse(event.body);
    const s3Key = payload.s3Key;
    const downloadUrl = downloadUrlFromS3((s3Key));
    logger.info('URL image: ' + downloadUrl);

    return {
      statusCode: 202,
      body: JSON.stringify({
        downloadUrl
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