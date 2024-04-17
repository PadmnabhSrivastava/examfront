//will intercept the requests from the front end and add the header and token then send it to backend

import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
    HttpHeaders,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { LoginService } from './login.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      //add the jwt token (localStorage) request
      let authReq = req;
      const token = this.login.getToken();
      console.log('inside interceptor');
  
      // if (token != null) {
      //   const  authReq = req.clone({
      //     headers: new HttpHeaders({
      //           Authorization:`Bearer ${token}` ,
      //          "Content-Type": "application/json",
      //          "Access-Control-Allow-Origin": "*"
      //         })
      // });
      // }

      if (token != null) {
        authReq = authReq.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          
        });
      }
      console.log("authrequest  header:" + authReq.headers)
      return next.handle(authReq);
    }
  }
  
  export const authInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ];
  