import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hideCompGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const hideBlock: boolean  = false;
  if(!hideBlock) {
    router.navigateByUrl('')
    return false
  }
  

  return true;
};
