import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let _ToastrService : ToastrService = inject(ToastrService);
  return next(req).pipe(catchError((error) => {
    _ToastrService.error(error.error.message);
    return throwError(error);
  }));
};
