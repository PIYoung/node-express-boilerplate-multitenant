import morgan from 'morgan';
import { utcToZonedTime, format } from 'date-fns-tz';

morgan.token('date-ko', (_req, _res, _tz) => {
  const timeZone = process.env['TZ'] || 'Asia/Seoul';
  const date = new Date();
  const zonedDate = utcToZonedTime(date, timeZone);
  const formatStr = 'yyyy-MM-dd HH:mm:ss.SSS';

  return format(zonedDate, formatStr, { timeZone });
});

// (31, red), (32, green), (33, yellow), (34, blue), (35, magenta), (36, cyan)
export const colorize = (color: number, target: string | undefined | number) => {
  return `\x1b[${color}m${target}\x1b[0m`;
};

export const colorizeStatus = (status: number) => {
  const color = status >= 500 ? 31 : status >= 400 ? 33 : status >= 300 ? 36 : status >= 200 ? 32 : 0;
  return colorize(color, status);
};

const logger = morgan((tokens, req, res) => {
  return [
    colorize(34, tokens['remote-addr'] && tokens['remote-addr'](req, res)),
    '-',
    colorize(33, tokens['method'] && tokens['method'](req, res)),
    colorize(36, tokens['url'] && tokens['url'](req, res)),
    colorize(33, `HTTP/${tokens['http-version'] && tokens['http-version'](req, res)}`),
    colorize(32, tokens['status'] && tokens['status'](req, res)),
    colorize(0, `"${tokens['user-agent'] && tokens['user-agent'](req, res)}"`),
    '-',
    colorize(
      0,
      tokens['response-time'] &&
        `${tokens['response-time'](req, res)} ms, ${tokens['date-ko'] && tokens['date-ko'](req, res)}`,
    ),
  ].join(' ');
});

export default logger;
