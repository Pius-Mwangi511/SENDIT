
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (token && userRole === 'ADMIN') {
    return true;
  }
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (userRole !== 'ADMIN') {
    router.navigate(['/unauthorized']); 
    return false;
  }

  return true;
};
