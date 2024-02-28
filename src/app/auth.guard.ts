import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/bookservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginAuth!:boolean;
  constructor(private router: Router,private service:BookserviceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.service.userLoggedIn.subscribe((data)=>{
        this.loginAuth=data;
      })
      if(!this.loginAuth){
        this.router.navigate(['/login']);
      }
    return this.loginAuth;
  }
}