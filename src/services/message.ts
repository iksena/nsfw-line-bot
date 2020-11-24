import Logger from 'bunyan';
import {
  Client,
  MessageAPIResponseBase,
  MessageEvent,
  TextEventMessage, TextMessage,
} from '@line/bot-sdk';

import constants from '../constants';

type ReceivedEvent = MessageEvent & { message: TextEventMessage }
const { PATTERN: { PHONE_NUMBER, SANITIZE }, WHATSAPP_URL_PREFIX } = constants;

class MessageService {
    private readonly logger: Logger;
    private readonly lineClient: Client;

    constructor(logger: Logger, lineClient: Client) {
      this.logger = logger;
      this.lineClient = lineClient;
    }

    static _parsePhoneNumberFromText(text: string): string {
      return text.replace(
        PHONE_NUMBER,
        (matchedPhoneNumber) => {
          const sanitizedPhoneNumber = matchedPhoneNumber.replace(SANITIZE, '');
          const phoneNumber = sanitizedPhoneNumber.startsWith('0')
            ? `62${sanitizedPhoneNumber.substring(1)}`
            : sanitizedPhoneNumber;

          return WHATSAPP_URL_PREFIX.concat(phoneNumber);
        },
      );
    }

    async replyMessage(events: ReceivedEvent[]): Promise<MessageAPIResponseBase | null> {
      this.logger.info(events, 'Events received');
      const isInvalid = events?.length < 1 && events?.[0]?.message?.type !== 'text';

      if (isInvalid) return null;

      const [event] = events;
      const { message: { text }, replyToken } = event;

      const message: TextMessage = {
        type: 'text',
        text: MessageService._parsePhoneNumberFromText(text),
      };

      return this.lineClient.replyMessage(replyToken, message);
    }
}

export default MessageService;
