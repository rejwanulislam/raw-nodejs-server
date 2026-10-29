import http, { IncomingMessage, Server, ServerResponse } from "http"
import config from "./config";
import { RouteHandler, routes } from "./helpers/routeHandler";
import sendJson from "./helpers/sendJson";
import "./routes"
import findDaynamicRoute from "./helpers/dainamicRouteHandler";
import 'dotenv/config';

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log('server is running.......')

    const method = req.method?.toUpperCase() || ''
    const path = req.url || ''

    const methodMap = routes.get(method)
    const handler: RouteHandler | undefined = methodMap?.get(path)
    if (handler) {
        handler(req, res)
    }
    else if (findDaynamicRoute(method, path)) {
        const mach = findDaynamicRoute(method, path);
        (req as any).params = mach?.params;
        mach?.handler(req,res)
    }
    else {

        sendJson(res, 401, {
            sucess: false,
            message: "Route not found",
            path,
        })
    }

})





server.listen(config.port, () => {
    console.log(`server is running port ${config.port}`)
})