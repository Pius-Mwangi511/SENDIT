import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const CourierGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (token && userRole === 'COURIER') {
    return true;
  }

  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (userRole !== 'COURIER') {
    router.navigate(['/unauthorized']); 
    return false;
  }

  return true;
};
