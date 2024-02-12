import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/bookservice.service';
declare var $: any;
@Component({
  selector: 'app-returbooks',
  templateUrl: './returbooks.component.html',
  styleUrls: ['./returbooks.component.css']
})
export class ReturbooksComponent {
  studentid!: any;
  message: any = '';
  issuedbooks: any[] = [];
  userreturnbooks: any[] = [];
  returnbooksForPayload: any[] = [];
  charges!: any;
  constructor(private service: BookserviceService,private router:Router) { }

  search() {
    if (this.studentid && this.studentid.trim() !== '') {
      this.service.getIssuedBookedBasedOnStdId(this.studentid).subscribe((data: any) => {
        this.issuedbooks = data;
      }, (err) => {
        if (err) {
          this.message = err.error.message;
        }
      })
    }
    else {
      this.message = 'Student ID Required';
      setTimeout(() => {
        this.message = '';
      }, 1500);
    }
  }

  clear() {
    this.studentid = '';
    this.issuedbooks = [];
    this.userreturnbooks = []
  }

  returnAllBooks() {
    $('#exampleModal').modal('show');
    this.returnbooksForPayload = this.issuedbooks;
    const books = this.returnbooksForPayload.map((item) => {
      return { categoryname: item.categoryName, bookname: item.bookname }
    })
    this.service.returnBooks(this.studentid, books).subscribe((data: any) => {
      this.message = data.message;
      this.charges = data.charges;;
    }, (err) => {
      if (err) {
        this.message = err.errors.message;
      }
    })
  }

  closepopup() {
    $('#exampleModal').modal('hide');
    this.returnbooksForPayload=[];
    this.userreturnbooks=this.userreturnbooks.map((data)=>{
      return false;
    })
    this.issuedbooks=[];
    this.studentid='';
    this.message='';
  }

  addBookToReturn(book: any, index: any) {
  
      // Instead of using the index directly as a key, you can use a unique identifier from the book object, like bookId
      this.userreturnbooks[book.bookId] = true; // Assuming bookId is unique
      this.returnbooksForPayload.push(book);
      console.log(this.returnbooksForPayload);
  
  }
  remove(book: any, index: any) {
    delete this.userreturnbooks[book.bookId];
    
    const i = this.returnbooksForPayload.findIndex(item => item.bookId === book.bookId);
    
    if (i !== -1) {
        this.returnbooksForPayload.splice(i, 1);
    }
    console.log(this.returnbooksForPayload);
  }
  returnSomebooks(){
    $('#exampleModal').modal('show');
    const books = this.returnbooksForPayload.map((item) => {
      return { categoryname: item.categoryName, bookname: item.bookname }
    })
    this.service.returnBooks(this.studentid, books).subscribe((data: any) => {
      this.message = data.message;
      this.charges = data.charges;;
    }, (err) => {
      if (err) {
        this.message = err.errors.message;
      }
    })
  }

  booklist(){
    this.router.navigate(['student/booklist'])
  }
}
