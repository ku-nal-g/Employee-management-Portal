import { HandleErrorService } from './../services/handle-error.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private error: HandleErrorService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(
        map((res: any) => {
          // this.toastr.success('success');
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          this.error.handleError(error);
          return throwError('');
        })
      )
  }
}
