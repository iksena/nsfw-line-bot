import env from 'dotenv';

env.config();

export default {
  port: process.env.SERVICE_PORT || 3000,
  loggerOptions: {
    name: process.env.SERVICE_NAME || 'NSFW',
    level: process.env.LOG_LEVEL || 'debug',
  },
  line: {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.CHANNEL_SECRET || '',
  },
};
