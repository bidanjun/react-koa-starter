import Router from 'koa-router'
import users from './user'

//定义两个Router
const router = new Router()
const api = new Router()

api.use(users)

router.use('/api', api.routes())

export default router;