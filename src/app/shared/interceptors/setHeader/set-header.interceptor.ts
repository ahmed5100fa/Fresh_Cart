import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof localStorage !== 'undefined'){
    if(req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist'))
    {  req = req.clone
      ({
        setHeaders : {
          token : localStorage.getItem('userToken') || ''
        }
  })}}
  return next(req);
};
