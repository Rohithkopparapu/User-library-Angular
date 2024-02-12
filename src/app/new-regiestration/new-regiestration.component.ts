import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-new-regiestration',
  templateUrl: './new-regiestration.component.html',
  styleUrls: ['./new-regiestration.component.css']
})
export class NewRegiestrationComponent implements OnInit {

  submitted=false;
  message:string='';
  employeeForm!:FormGroup
  roles=[
    'Select',
    'Admin',
    'Librarian',
    'Student'
  ];
  constructor(private builder:FormBuilder,private service:BookserviceService,private router:Router){}

  ngOnInit(): void {
    this.employeeForm=this.builder.group({
        Name:['',[Validators.required]],
        DOB:['',Validators.required],
        Gender:['',Validators.required],
        phone:['',Validators.compose([Validators.required,Validators.pattern('[0-9+]*'),Validators.minLength(10)])],
        EmailId:['',Validators.compose([Validators.required,Validators.pattern('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')])],
        Password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
        role:['',[Validators.required]]
      
      
    })
  }
  get loadRegistration()
  {
     return this.employeeForm?.controls;
  }
  onSubmit(){
    this.submitted=true;
    this.message=''
    console.log(this.employeeForm.value);
     
    if(this.employeeForm.valid){
     let newuserdata={
      "name":this.employeeForm.get('Name')?.value,
      "email":this.employeeForm.get('EmailId')?.value,
      "password":this.employeeForm.get('Password')?.value,
      "dob":this.employeeForm.get('DOB')?.value,
      "phone":this.employeeForm.get('phone')?.value,
      "gender":this.employeeForm.get('Gender')?.value,
      "role":this.employeeForm.get('role')?.value
      
     }
    
     this.service.saveNewUser(newuserdata).subscribe((data:any)=>{
      if(data.status === 200){
          this.message=data.message;
          this.router.navigate(['login']);
      }
      if(data.status === 501){
        this.message=data.message;
    }
     },(err)=>{
      if(err.status === 400){
        this.message=err.error.message;
      }
     })
    }
  }
}
