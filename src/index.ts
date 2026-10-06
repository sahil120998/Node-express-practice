import app from './app';
import createDebug from 'debug';
import http from 'http';
import os from 'os';
import { styleText } from 'util';

const debug = createDebug('my-express:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);

  if (addr && typeof addr !== 'string') {
    printBanner(addr.port);
  }
}

/**
 * Print the ready message with clickable URLs.
 */

function printBanner(port: number) {
  const ms = Math.round(process.uptime() * 1000);
  const url = (host: string) => styleText('cyan', `http://${host}:${port}/`);

  // IPv4 addresses other devices on the same network can reach
  const networkHosts = Object.values(os.networkInterfaces())
    .flat()
    .filter((net) => net && net.family === 'IPv4' && !net.internal)
    .map((net) => net!.address);

  console.log();
  console.log(`  ${styleText(['green', 'bold'], 'my-express')} ${styleText('dim', `ready in ${ms} ms`)}`);
  console.log();
  console.log(`  ${styleText('green', '➜')}  ${styleText('bold', 'Local:')}   ${url('localhost')}`);
  for (const host of networkHosts) {
    console.log(`  ${styleText('green', '➜')}  ${styleText('bold', 'Network:')} ${url(host)}`);
  }
  console.log();
}
