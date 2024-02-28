import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleServiceService {

  private idleTimeout=5 * 60 * 1000;
  private timer: any;
  private activitySubject = new Subject<boolean>();
  constructor(private router:Router) { }

  //Here the document Has Listening events so If you dont change on UI then automatcially logout.
  startWatching():Observable<any>{

    document.addEventListener('mousemove', this.resetTimer);
    document.addEventListener('keypress', this.resetTimer);

    return this.activitySubject.asObservable();

  }
  
  resetTimer = () =>{
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.logout();
    }, this.idleTimeout);
    this.activitySubject.next(true);
  }

  logout(){
  this.router.navigate(['/login']);
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('loginuserdetails');
  }

  stopWatchingForActivity() {
    clearTimeout(this.timer);
    document.removeEventListener('mousemove', this.resetTimer);
    document.removeEventListener('keypress', this.resetTimer);
  }
}
