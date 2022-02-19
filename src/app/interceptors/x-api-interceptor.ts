import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class XAPIInterceptor implements HttpInterceptor {

    constructor(){}

    intercept(req: HttpRequest<any> , next: HttpHandler){
        const X_API_KEY = "shN0xgl41F3gq5dlZVNAS7lfpCDry5s11CB3Ocfz";
        const X_API_Request = req.clone({
            headers : req.headers.set("Authorization" , `Bearer ${localStorage.getItem('Token')}`  ),

        })
        return next.handle(X_API_Request);
    }
}