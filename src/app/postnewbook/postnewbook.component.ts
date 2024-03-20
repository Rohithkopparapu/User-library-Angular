import { Location } from '@angular/common';
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

  constructor(private service:BookserviceService,private builder:FormBuilder,private activeModal:NgbActiveModal,private location:Location){
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
  newbook!:FormGroup;
  message:string='';
  book:any;
  details:any;
  ngOnInit(): void {
  
    const getUserDeatils = localStorage.getItem('loginuserdetails')!;
    this.details = JSON.parse(getUserDeatils);

    this.newbook = this.builder.group({
     categoryname:['',[Validators.required]],
      books: this.builder.array([
        this.builder.group({
          _id:[],
          title: ['',[Validators.required,Validators.min(3)]],
          bookcount:['',[Validators.required]]
        })
      ])
    })
   
    if(this.book != undefined){
      this.newbook.get('categoryname')?.setValue(this.book.categoryname);
      //We iterate over each book in the books array using the map function.
      //For each book, we create a form group containing a form control for the book's title.
      const books = this.book.books.map((book:any) => {
        return this.builder.group({
          _id:[book._id, [Validators.required]],
          title: [book.title, [Validators.required, Validators.minLength(3)]],
          bookcount:[book.bookcount,[Validators.required]]
        });
      });
      
       this.newbook.setControl('books', this.builder.array(books));
      //  this.newbook.setControl('categoryname',this.builder.control(this.book.categoryname));
      //  this.newbook.get('categoryname')?.disable();
    }

  }
  get connectFormArray() {
    this.newbook.get('categoryname')?.disable();
    return (this.newbook.get('books') as FormArray);

  }
  addbook(){
    this.connectFormArray.push(this.builder.group({
      title:['',[Validators.required]],
      bookcount:[0,[Validators.required]]
    }))
  }
  removebook(index:any){
    this.connectFormArray.removeAt(index);
  }

  savethebook(){
    if(this.book === undefined){
      let formDataToSend = { ...this.newbook.value };
      if (formDataToSend.books[0]._id === null) {
        delete formDataToSend.books[0]._id;
    }
    }
    if (this.newbook.valid && this.book === undefined) {

      this.service.postnewbook(this.newbook.value).subscribe((data: any) => {
        if (data) {
          this.message = data.message;
        }
      }, (err) => {
        if (err.status === 400) {
          this.message = err.error.message;
        }
      })


      this.message = 'New Book Added';
      setTimeout(() => {
        this.message = '';
        this.activeModal.close()
      }, 1000);
    }
 
  if(this.book != undefined){
    this.newbook.setControl('categoryname',this.builder.control(this.book.categoryname));
    this.service.addNewBooktoExistingCategory(this.details.id,this.newbook.value).subscribe((data:any)=>{
      this.message = data.message
     }) 
     setTimeout(() => {
      this.message = '';
      this.activeModal.close()
    }, 1000);   
  }
  
  }

  close(){
    this.activeModal.close()
  }
}
