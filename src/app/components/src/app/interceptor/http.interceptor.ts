import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const localdata: any = localStorage.getItem('userdetails');
  const parse = JSON.parse(localdata);
  const token =
    parse?.token ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbUBnbWFpbC5jb20iLCJpYXQiOjE3NTAzOTE5MjEsImV4cCI6MTc1Mjk4MzkyMX0.VdkNdd6-Xq3OM_oqTyyXNpi-II6WZJS3CMpPCGtqzRg';
  // Skip token for login or signup endpoints
  if (req.url.includes('/login') || req.url.includes('/signup')) {
    return next(req);
  }
  // Clone request and add Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    tap((event) => {
      console.log('HTTP Event:', event);
    })
  );
};
