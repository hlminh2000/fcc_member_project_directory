// ssh -L 3306:server115.web-hosting.com:3306 minhbtze@server115.web-hosting.com -p 21098
const exec = require('child_process').exec;
const config = require('../ENV_CONFIG.json')['TUNNEL_CONFIG'];

const tunnelSSHCommand
  = 'ssh -L '
  + config.localPort + ':'
  + config.dstHost + ':'
  + config.dstPort + ' '
  + config.username
  + '@' + config.host
  + ' -p ' + config.port

console.log(tunnelSSHCommand);
exec(tunnelSSHCommand)
