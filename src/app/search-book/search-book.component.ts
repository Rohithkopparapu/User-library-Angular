import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookserviceService } from 'src/bookservice.service';
import { PostnewbookComponent } from '../postnewbook/postnewbook.component';
import { data } from 'jquery';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
  allbooksInLibrary: any[] = [];
  // allbooksInLibrary!:Observable<any[]>
  searchByCategoryName = '';
  allbooks: any[] = [];
  // allbooks!:Observable<any>
  message: string = '';
  editbook!: boolean;
  apiresponse: string = '';
  booksstudentswant: any[] = [];
  expandedStates: boolean[][] = [];
  indexForAddIssue: any;
  indexForAddIssueBook: any;
  disableAddButtonForRow: boolean[] = [];
  selectedBookIndex: number | null = null;
  showifuserclickadd: any[][] = [];
  listofstudents:any[]=[];
  studentpassword!:any;
  studentmail!:any;
  studentnumber!:any;
  check!:any;
  response:any='';
  constructor(private service: BookserviceService, private modal: NgbModal,private router:Router) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.service.ifeditthebooks.subscribe((data) => {
      this.editbook = data;
      this.studentslist()
    })

  }

  navigatetohome(){
   this.router.navigate(['management'])
  }

  studentslist(){
    this.service.getStudentsList().subscribe((data:any)=>{
    this.listofstudents=data;
    })
  }

  getAllBooks() {
    this.service.getBooksInLibraray().subscribe((data: any) => {
      this.allbooks = data;
      this.allbooksInLibrary = this.allbooks;
    }, (err) => {
      if (err) {
        this.response = 'Failed to Load Books';
      }
    })
    
    // this.service.getBooksInLibraray().pipe(map((data, index) => {

    //   const modifiedData = data.map((item:any, i:any) => ({ ...item, index: i }));
    //   return modifiedData;
    //  })
    //   ).subscribe(modifiedData => {
    //     // Assign the modified data to your class property
    //     this.allbooksInLibrary = modifiedData;
    //     console.log(this.allbooksInLibrary);  
    //   });
      
  }

  clear() {
    this.searchByCategoryName = '';
    this.searchbooks();
  }

  searchbooks(){
    if(this.searchByCategoryName != '' || this.searchByCategoryName != undefined){
     const data = this.allbooks.filter(item => item.books.some((data:any) => 
      data.title.toLowerCase().includes(this.searchByCategoryName.toLowerCase())
  ))
      this.allbooksInLibrary = data;
    }
    else{
      this.allbooksInLibrary = JSON.parse(JSON.stringify(this.allbooks));
    }
  return this.allbooksInLibrary;
    
  }

}
