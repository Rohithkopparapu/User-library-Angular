import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BookserviceService } from 'src/bookservice.service';
declare  var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!:string;
  password!:string;
  message:string='';
  constructor(private router:Router,private toaster:ToastrService,private service:BookserviceService){}
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
            localStorage.setItem('loginuserdetails',JSON.stringify(data.data));
          }
          else{
            this.service.ifeditthebooks.next(false);
          }
           setTimeout(() => {
              this.router.navigate(['bookslist'])
           }, 1000);
        }
      },(error:any)=>{
        if(error.status === 400){
          this.message = 'Invalid details';
        }
      }) 
    }
    else{
     this.toaster.error('Email and Password Required');
    }
  }

}
