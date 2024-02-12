import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-postnewbook',
  templateUrl: './postnewbook.component.html',
  styleUrls: ['./postnewbook.component.css']
})
export class PostnewbookComponent implements OnInit {

  constructor(private service:BookserviceService,private builder:FormBuilder,private activeModal:NgbActiveModal){}
  newbook!:FormGroup;
  message:string='';
  ngOnInit(): void {
  
    this.newbook = this.builder.group({
     categoryname:['',[Validators.required]],
      books: this.builder.array([
        this.builder.group({
          title: ['',[Validators.required,Validators.min(3)]]
        })
      ])
    })

  }
  get connectFormArray() {
    return (this.newbook.get('books') as FormArray);
  }
  addbook(){
    this.connectFormArray.push(this.builder.group({
      title:['',[Validators.required]]
    }))
  }
  removebook(index:any){
    this.connectFormArray.removeAt(index);
  }

  savethebook(){
 if(this.newbook.valid){
  
  this.service.postnewbook(this.newbook.value).subscribe((data:any)=>{
    if(data){
      this.message = data.message;
    }
  },(err)=>{
    if(err.status === 400){
      this.message = err.error.message;
    }
  })


  this.message='New Book Added';
  setTimeout(() => {
    this.message='';
    this.activeModal.close()
  }, 1000);
 }
  }

  close(){
    this.activeModal.close()
  }
}
