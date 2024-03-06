import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookserviceService } from 'src/bookservice.service';
import { PostnewbookComponent } from '../postnewbook/postnewbook.component';
import { ReturbooksComponent } from '../returbooks/returbooks.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {
  allbooksInLibrary: any[] = [];
  searchByCategoryName = '';
  allbooks: any[] = [];
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
  constructor(private service: BookserviceService, private modal: NgbModal,private router:Router,private location:Location) { 
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

  ngOnInit(): void {
    this.getAllBooks();
    this.service.ifeditthebooks.subscribe((data) => {
      this.editbook = data;
      this.studentslist()
    })

  }


  studentslist(){
    this.service.getStudentsList().subscribe((data:any)=>{
    this.listofstudents=data;
    },(err)=>{
      if(err){
        this.apiresponse = err.error.message;
      }
    })
    
  }

  getAllBooks() {
    this.service.getBooksInLibraray().subscribe((data: any) => {
      this.allbooks = data;
      this.allbooksInLibrary = this.allbooks;
      if (this.allbooksInLibrary) {
        this.allbooksInLibrary.forEach(() => {
          this.selectedBookIndices.push([]);
        });
      }
    }, (err) => {
      if (err) {
        this.apiresponse = err.error.message;
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
          if (err) {
            this.apiresponse = err.error.message;
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

  addbooks(book: any, index: number) {
    const deatils = sessionStorage.getItem('loginuserdetails');
    if (!this.showifuserclickadd[index]) {
      this.showifuserclickadd[index] = [];
    }
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      this.booksstudentswant = this.booksstudentswant.filter((item) => {
        return item.categoryname !== book.categoryname
      });
      const data = book.books.map((detail: any) => {
        return { categoryname: book.categoryname, bookname: detail.title };
      })
      this.booksstudentswant.push(...data);
      this.disableAddButtonForRow[index] = true;
      for (let j = 0; j < book.books.length; j++) {
        this.showifuserclickadd[index][j] = true;
        this.selectedBookIndices[index].push(j);
      }
      console.log(this.booksstudentswant);
    }
  }
  removebook(book: any, index: any) {

    const deatils = sessionStorage.getItem('loginuserdetails');
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      if (userdetails.role === 'Librarian' || userdetails.role === 'Admin') {
        for (let j = 0; j < book.books.length; j++) {
          this.showifuserclickadd[index][j] = false;
          this.selectedBookIndices[index] = [];
        }
//use some man
        this.booksstudentswant = this.booksstudentswant.filter((item) => {
          return !book.books.some((bookItem: any) => bookItem.title  === item.bookname);
        });
      console.log(this.booksstudentswant);
      
      }
      this.disableAddButtonForRow[index] = false;
    }

  }

  addparticularbooks(book: any, cat: any, bookname: any) {
    this.booksstudentswant.push(
      {
        categoryname: cat,
        bookname: bookname
      }
    );
  }



  postnewbook() {
    this.modal.open(PostnewbookComponent);
  }


  openPopup() {
    $('#exampleModal').modal('show');
    // this.issusebooks();
  }
  closePopup() {
    $('#exampleModal').modal('hide');
    this.message = '';
  }
  issusebooks() {
    const deatils = sessionStorage.getItem('loginuserdetails');
    if (deatils != null) {
      const userdetails = JSON.parse(deatils);
      if (userdetails.role === 'Librarian') {
         
        if(this.booksstudentswant.length > 0){
          
        this.service.issuebook(this.check._id, this.booksstudentswant).subscribe((data: any) => {
          this.message = data.message;
         
        }, (err) => {
          if (err) {
            this.apiresponse = err.error.errors[0];
           
          }
        })
        }
        else{
          this.message='Please Select Atleast One Book';
        }
      }
      else {
        this.message = 'Only Librarian Can Issue a book';
        setTimeout(() => {
          this.message = '';
        }, 1500);
      }
    }

  }

  removeBook(i: any, j: any) {
    this.booksstudentswant.splice(i, 1);
    console.log(this.booksstudentswant);

  }

  selectedBookIndices: any[] = [];

  selectBookForAddition(rowIndex: number, bookIndex: number) {
    this.selectedBookIndices[rowIndex] = bookIndex;
  }

  deselectBookForAddition(rowIndex: number) {
    this.selectedBookIndices[rowIndex] = null;

  }

  toggleBookSelection(rowIndex: number, bookIndex: number, catname: any, bookname: any) {
    if (!this.showifuserclickadd[rowIndex]) {
      this.showifuserclickadd[rowIndex] = [];
    }
    const isSelected = this.selectedBookIndices[rowIndex].includes(bookIndex);
    if (isSelected) {
      // Book is already selected, deselect it
      this.selectedBookIndices[rowIndex] = this.selectedBookIndices[rowIndex].filter((index: any) => index !== bookIndex);
      const indexToRemove = this.booksstudentswant.findIndex(item => (item.categoryname === catname && item.bookname === bookname));
      if (indexToRemove !== -1) {
        this.booksstudentswant.splice(indexToRemove, 1);
      }
      // Update the flag to show the "+" symbol
      this.showifuserclickadd[rowIndex][bookIndex] = false;
      console.log(this.booksstudentswant);
      this.disableAddButtonForRow[rowIndex] = false;
    } else {
      // Book is not selected, select it
      this.selectedBookIndices[rowIndex].push(bookIndex);
      // Update the flag to show the "-" symbol
      this.showifuserclickadd[rowIndex][bookIndex] = true;
      console.log(this.booksstudentswant);

    }
  }

  requestForBooks(){
    if(this.studentmail != '' && this.studentpassword != ''){
     this.check = this.listofstudents.find(item=>item.email === this.studentmail && item.password === this.studentpassword);
    if(this.check){
      $('#requestModal').modal('show');
      $('#exampleModal').modal('hide');
      this.issusebooks();
    }
    else{
      this.message = 'Invalid Details';
    }
    }
    else if(this.studentnumber != '' && this.studentpassword != ''){
      const check = this.listofstudents.find(item=>item.phone === this.studentnumber && item.password === this.studentpassword);
      if(check){
        this.message = 'Request SucessFully ....!';
        $('#requestModal').modal('show');
        $('#exampleModal').modal('hide');
        this.issusebooks();
      }
      else{
        this.message = 'Invalid Details';
      }
    }
    else{
      this.message = 'Invalid Details';
    }
  }
  
  closeRequestPopup(){
    $('#requestModal').modal('hide');
    this.message='';
    if (this.showifuserclickadd) {
     for(let i=0;i<= this.showifuserclickadd.length-1;i++){
     if( this.showifuserclickadd[i] != undefined && this.showifuserclickadd[i].length > 0){
      this.showifuserclickadd[i]=this.showifuserclickadd[i].map((item)=>{
        return false;
      });
     }
     }
     for(let i=0;i<= this.selectedBookIndices.length-1;i++){
      this.selectedBookIndices[i]=[];
       }
    }
    this.booksstudentswant=[];
  }
  returnbooks(){
    this.router.navigate(['management']);
  }
}
