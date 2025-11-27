import { routes } from "./routeHandler";

function findDaynamicRoute(method: string, url: string) {
    const methodMap: any = routes.get(method);
    if (!method) null;


    for (const [routePath, handler] of methodMap.entries()) {
        const routeParts = routePath.split("/")
        const urlParts = url.split("/")
        if (routeParts.length !== urlParts.length) continue;

        const params: any = {}
        let mached = true

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i]?.startsWith(":")) {
                params[routeParts[i]?.substring(1)] = urlParts[i]
            } else if (routeParts[i] !== urlParts[i]) {
                mached = false;
                break;
            }
        }

        if (mached) {
            return { handler, params }
        }

    }
    return null;
}

export default findDaynamicRoute;