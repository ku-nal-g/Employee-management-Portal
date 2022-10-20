import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private toastr: ToastrService) { }

  public handleError(err: HttpErrorResponse) {
    let errorMsg: string = "";
    if (err.error instanceof ErrorEvent) {
      errorMsg = `An error occured : ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMsg = `${err.status}: Bad Request.`;
          break;
        case 401:
          errorMsg = `${err.status}: Unauthorized.`;
          break;
        case 403:
          errorMsg = `${err.status}: Not Allowed to access the resource.`;
          break;
        case 404:
          errorMsg = `${err.status}: Resource Does not exist.`;
          break;
        case 412:
          errorMsg = `${err.status}: Precondition failed.`;
          break;
        case 500:
          errorMsg = `${err.status}: Internal server error.`;
          break;
        case 503:
          errorMsg = `${err.status}: Requested Service not avialable.`;
          break;
        default:
          errorMsg = 'Something went wrong';
      }
      this.toastr.error(errorMsg);
    }
  }
}
