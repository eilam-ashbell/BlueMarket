import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { authStore } from "../redux/auth-state";

@Injectable({
    providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
    token: string;
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.token = authStore.getState().token;
        if (this.token) {
            const tokenizedReq = req.clone({
                headers: req.headers.set(
                    "Authorization",
                    "Bearer " + this.token
                ),
            });
            return next.handle(tokenizedReq);
        }
        return next.handle(req);
    }
}
