import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const prevLinkGaurd: CanActivateFn = (route, state) => {
  let _Router: Router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem('userToken') !== null) {
    // إذا كان المستخدم مسجل دخول، امنع الوصول إلى صفحة تسجيل الدخول وأعد توجيهه للصفحة الرئيسية
    _Router.navigate(['/home']);
    return false;
  }

  return true;
};
