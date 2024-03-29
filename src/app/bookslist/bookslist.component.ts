import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BookserviceService } from 'src/bookservice.service';
import { PostnewbookComponent } from '../postnewbook/postnewbook.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  editbook!: boolean;
  apiresponse: string = '';
  
  constructor(private service: BookserviceService, private modal: NgbModal, private router: Router, private location: Location) {
    window.addEventListener('popstate', () => {
      // Add your logic to prevent or handle the navigation
      const allowNavigation = false;
      // Replace with your condition
      if (!allowNavigation) {
        // Restore the previous state and prevent the navigation
        this.location.forward();
      }
    });
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.service.ifeditthebooks.subscribe((data) => {
      this.editbook = data;
    })
  }



  getAllBooks() {
    this.service.getBooksInLibraray().subscribe((data: any) => {
      this.allbooks = data;
      this.allbooksInLibrary = this.allbooks;
    }, (err) => {
      if (err) {
        this.message = err.error.message;
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

  editbooks(book: any) {
    this.service.ifeditthebooks.next(false);

  }

  updateBooks(book: any) {
    const deatils = sessionStorage.getItem('loginuserdetails');
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      if (userdetails.role === 'Admin' || userdetails.role === 'Librarian') {
        this.service.editbooks(book._id, book).subscribe((data: any) => {
          if (data) {
            this.apiresponse = data.message;
            setTimeout(() => {
              this.apiresponse = '';
              this.service.ifeditthebooks.next(true);
            }, 2000);

          }
        }, (err) => {
          this.apiresponse = err.error.message;
          setTimeout(() => {
            this.apiresponse = '';
          }, 2000);


        })
      }
    }

  }
  deletebooks(book: any) {

    const deatils = sessionStorage.getItem('loginuserdetails');
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      if (userdetails.role === 'Admin') {
        this.service.deletebook(book).subscribe((data: any) => {
          if (data) {
            this.apiresponse = data.message;
            setTimeout(() => {
              this.apiresponse = '';
            }, 2000);
            this.getAllBooks()
          }
        }, (err) => {
          this.apiresponse = err.error.message;
          setTimeout(() => {
            this.apiresponse = '';
          }, 2000);
        })
      }
      else {
        this.apiresponse = 'Records Can be deleted by Admin';
        setTimeout(() => {
          this.apiresponse = ''
        }, 2000);
      }

    }

  }

  deletebookbasedonCat(cname: any, bname: any) {
    const deatils = sessionStorage.getItem('loginuserdetails');
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      if (userdetails.role === 'Admin' || userdetails.role === 'Librarian') {
        this.service.deletebooksbasedoncategory(cname, bname).subscribe((data: any) => {
          if (data) {
            this.apiresponse = data.message;
            setTimeout(() => {
              this.apiresponse = '';
              this.service.ifeditthebooks.next(true);
            }, 2000);
            this.getAllBooks()
          }
        }, (err) => {
          this.apiresponse = err.error.message;
          setTimeout(() => {
            this.apiresponse = '';
          }, 2000);
        })
      } else {
        this.apiresponse = 'Records Can be deleted by Admin';
        setTimeout(() => {
          this.apiresponse = ''
        }, 2000);
      }
    }

  }

  postnewbook() {
    this.modal.open(PostnewbookComponent);
  }

  navigatetohome() {
    this.router.navigate(['management']);
  }

  addBooktoExistingCategory(book:any){
 const modalOptions: NgbModalOptions = {
      backdrop: 'static', // Prevents closing when clicking outside
      keyboard: false // Prevents closing when pressing the escape key
    };
   const modalRef=this.modal.open(PostnewbookComponent,modalOptions);
   modalRef.componentInstance.book = book;
  }

}
