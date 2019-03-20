import Koa from 'koa';
import koaStatic from 'koa-static';
import koaFavicon from 'koa-favicon';
import bodyParser from 'koa-bodyparser';
import historyApiFallback from './lib/historyApiFallback';
import paths from '../config/paths.server';
import apiRouter from './api';

console.log('paths=',paths)

const app = new Koa();
app.use(bodyParser())

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

if (process.env.NODE_ENV === "production") {
    console.log('server run in production mode');
    app.use(historyApiFallback({index:'./index.html',verbose:true}));
    app.use(koaFavicon(paths.serverBuild + '/favicon.ico'));
    app.use(koaStatic(paths.serverBuild));
}

export default app;