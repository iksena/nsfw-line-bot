import healthcheck from './healthcheck';
import messages from './messages';

export default [
  ...healthcheck,
  ...messages,
];
