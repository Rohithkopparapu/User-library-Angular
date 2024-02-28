import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  loginDetails!:any;
  constructor(private service:BookserviceService,private location:Location){
  }

  ngOnInit(): void {

    if(sessionStorage.getItem('loginuserdetails') != null){
      this.loginDetails=JSON.parse(sessionStorage.getItem('loginuserdetails')!);
    }
    window.addEventListener('popstate',() => {
          // Add your logic to prevent or handle the navigation
          const allowNavigation = false;
          // Replace with your condition
          if(!allowNavigation) {
            // Restore the previous state and prevent the navigation
            this.location.forward();
          }
        });
      
  }

  logout(){
    this.service.userLoggedIn.next(false);
    sessionStorage.removeItem('loginuserdetails');
    sessionStorage.removeItem('auth_token')
  }

}
