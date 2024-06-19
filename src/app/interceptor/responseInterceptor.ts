import {
    HttpEvent, HttpRequest,
    HttpHandlerFn,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error.status)
            let errorMessage = "";

            if (error.error instanceof ErrorEvent) {

            } else {
                if (error.status === 400) handle400Error()
                if (error.status === 401) handle401Error()
                if (error.status === 403) handle403Error()
                if (error.status === 404) handle404Error()
            }

            return throwError(() => errorMessage);
        })
    )
}

function handle400Error() {
    // bad request
    console.error("request is malformed")

}

function handle401Error() {
    // request lacks valid authentication credentials
    console.error("lacks valid authentication credentials")

}

function handle403Error() {
    // the server understands the request but refuses to fulfill it
    console.error("forbiden credential")
}
function handle404Error() {
    // the server understands the request but refuses to fulfill it
    console.error("not found")

}