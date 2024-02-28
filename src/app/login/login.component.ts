import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BookserviceService } from 'src/bookservice.service';
declare  var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
returnUrl!:string;
  email!:string;
  password!:string;
  message:string='';
  constructor(private router:Router,private service:BookserviceService,private route:ActivatedRoute){
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/management';
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('',[
    Validators.required
  ]
  )

  ngOnInit(): void {
    
  }
  onSubmit(){
    if(this.emailFormControl.valid && this.passwordFormControl.valid){
      this.service.getUserDetails(this.email,this.password).subscribe((data:any)=>{
        if(data){ 
        
          this.message=''   
          this.service.auth_token.next(data.token);
          if(data.data.role != 'Student' || data.data.role != 'student'){
            this.service.ifeditthebooks.next(true);
            sessionStorage.setItem('loginuserdetails',JSON.stringify(data.data));
            sessionStorage.setItem('auth_token',data.token);
            this.service.userLoggedIn.next(true);
          }
          else{
            this.service.ifeditthebooks.next(false);
          }
           setTimeout(() => {
              this.router.navigate(['management'])
           }, 1000);
        }
      },(error:any)=>{
        if(error.status === 400){
          this.message = 'Invalid details';
        }
      }) 
    }
    else{
    alert('Email and Password Required');
    }
  }

}
