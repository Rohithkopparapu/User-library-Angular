import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-phonelogin',
  templateUrl: './phonelogin.component.html',
  styleUrls: ['./phonelogin.component.css']
})
export class PhoneloginComponent implements OnInit{
  PhoneNo!:string;
  password!:string;
  message!:string;
  phoneFormControl=new FormControl('',[
    Validators.required
  ])
  passwordFormControl = new FormControl('',[
    Validators.required
  ]
  )

  constructor(private router:Router,private service:BookserviceService,private toaster:ToastrService){}

  ngOnInit(): void {
    
  }
  onSubmit(){

    if(this.phoneFormControl.valid && this.passwordFormControl.valid){
      this.service.getUserDetailsByPhone(this.PhoneNo.toString(),this.password).subscribe((data:any)=>{
        if(data){ 
        
          this.message='' ;
          this.service.auth_token.next(data.token); 
         
        }
      },(error:any)=>{
        if(error.status === 400){
          this.message = 'Invalid details';
        }
      }) 
    }
    else{
     this.toaster.error('Phone Number and Password Required');
    }
  }

  }

