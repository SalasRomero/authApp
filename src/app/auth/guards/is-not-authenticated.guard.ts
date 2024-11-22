import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //if(authService.authStatus() === AuthStatus.notAuthenticate) return true;
  // TAMBIEN PEUDE SER
  if(authService.authStatus() === AuthStatus.notAuthenticate){
    router.navigateByUrl('/dashboard');
    return false
  }
  
  // if(authService.authStatus() == AuthStatus.checking){
  //   return false;
  // }

  //const url = state.url;
  //localStorage.setItem('url',url); //Sabemos la ultima ruta
  //router.navigateByUrl('/dashboard');
  return true;
};
