import Router from 'koa-router';
const router = new Router();

const users=[{
    id: 1,
    username: "first"
}, {
    id: 2,
    username: "second"
}];

router.get('/users',
    async (ctx, next) => {
        ctx.body = users;
    });


export default router.routes();