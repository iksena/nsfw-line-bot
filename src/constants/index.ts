export default {
  PATTERN: {
    PHONE_NUMBER: /[+]?[(]?[0-9]{1,4}[)]?[-./0-9]{8,14}/gim,
    SANITIZE: /[()+-./]/gim,
  },
  WHATSAPP_URL_PREFIX: 'https://api.whatsapp.com/send?phone=',
};
