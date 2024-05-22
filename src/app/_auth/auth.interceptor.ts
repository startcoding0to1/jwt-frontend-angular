import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthServiceService } from "../_service/auth-service.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService:AuthServiceService,
        private router:Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("No-atuh:::: --- ",req.headers.get("No-Auth"))
        if (req.headers.get("No-Auth") === "true") {
            return next.handle(req.clone());
        }

        const token =this.authService.getToken();

        req=this.addToken(req,token);

        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse)=>{
                    console.log(err.status);
                    if(err.status===401){
                        this.router.navigate(['/login'])
                    }
                    else if(err.status===403){
                        this.router.navigate(['/forbidden'])
                    }
                    return throwError(()=> new Error('Some thing is wrong'))
                }
            )
        )
    }

    private addToken(request:HttpRequest<any>, token:string | null){
        return request.clone(
            {
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
    }
}