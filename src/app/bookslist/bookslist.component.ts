import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookserviceService } from 'src/bookservice.service';
import { PostnewbookComponent } from '../postnewbook/postnewbook.component';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {

  allbooksInLibrary: any[] = [];
  searchByCategoryName = '';
  allbooks: any[] = [];
  message!: string;
  editbook!:boolean;
  apiresponse:string='';
  constructor(private service: BookserviceService,private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.service.ifeditthebooks.subscribe((data)=>{
      this.editbook=data;
    })
  }



  getAllBooks() {
    this.service.getBooksInLibraray().subscribe((data: any) => {
      this.allbooks = data;
      this.allbooksInLibrary = this.allbooks;
    }, (err) => {
      if (err.status === 404) {
        this.message = 'Failed to Load Books'
      }
    })
  }

  searchCatName() {
    // Filter allbooks based on the search text only if searchByCategoryName is not empty
    if (this.searchByCategoryName && this.searchByCategoryName.trim() !== "") {
      this.service.getBooksByCatName(this.searchByCategoryName).subscribe(
        (data: any) => {
          if (data) {
            this.allbooksInLibrary = data;
          }
        },
        (err) => {
          if (err.status === 501) {
            console.log(err);
          }
        }
      );
    } else {
      // If searchByCategoryName is empty, show the entire list
      this.allbooksInLibrary = JSON.parse(JSON.stringify(this.allbooks));

    }
    return this.allbooksInLibrary;
  }

  clear() {
    this.searchByCategoryName = '';
    this.searchCatName();
  }

  editbooks(book:any) {
    const deatils=localStorage.getItem('loginuserdetails');
   if(deatils != null){
    const userdetails=JSON.parse(deatils);
   if(userdetails.role === 'Admin' || userdetails.role === 'Librarian')
   {
    this.service.editbooks(book._id,book).subscribe((data:any)=>{
      if(data){
        this.apiresponse=data.message;
        setTimeout(() => {
          this.apiresponse = '';
        }, 2000);
        
      } 
  },(err)=>{
     this.apiresponse=err.error.message;
     setTimeout(() => {
      this.apiresponse = '';
    }, 2000);
    
    
  })
   }
   }
  }
  deletebooks(book:any){
  
    const deatils=localStorage.getItem('loginuserdetails');
    if(deatils != null){
     const userdetails=JSON.parse(deatils);
     if(userdetails.role === 'Admin'){
      this.service.deletebook(book).subscribe((data:any)=>{
        if(data){
          this.apiresponse=data.message;
          setTimeout(() => {
            this.apiresponse = '';
          }, 2000);
          this.getAllBooks()
        }
      },(err)=>{
        this.apiresponse=err.error.message;
        setTimeout(() => {
         this.apiresponse = '';
       }, 2000);
      })
     }

    }

  }

  deletebookbasedonCat(cname:any,bname:any){
      const deatils=localStorage.getItem('loginuserdetails');
      if(deatils != null){
       const userdetails=JSON.parse(deatils);
       if(userdetails.role === 'Admin'){
        this.service.deletebooksbasedoncategory(cname,bname).subscribe((data:any)=>{
          if(data){
            this.apiresponse=data.message;
            setTimeout(() => {
              this.apiresponse = '';
            }, 2000);
            this.getAllBooks()
          }
        },(err)=>{
          this.apiresponse=err.error.message;
          setTimeout(() => {
           this.apiresponse = '';
         }, 2000);
        })
       }
      }
    
  }

  postnewbook(){
    this.modal.open(PostnewbookComponent);
  }

}
