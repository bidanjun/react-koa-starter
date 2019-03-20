import http from 'http';
import app from './server';

const port = process.env.PORT|| process.env.port || process.env.npm_package_config_port || 3000;
const host = process.env.HOST|| process.env.host || process.env.npm_package_config_host || 'localhost';

const server = http.createServer(app.callback()).listen(port, host, function (err){
    if (err) {
        console.log(err);
    }
    console.log(`Listening at http://${host}:${port}/`);
});


if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeAllListeners('request', server);
        server.on('request', app.callback());
    });
}