import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-genrate-graphs',
  templateUrl: './genrate-graphs.component.html',
  styleUrls: ['./genrate-graphs.component.css']
})
export class GenrateGraphsComponent implements OnInit {

  reports:string[]=['Weekly','For 15 days','Monthly'];
  booksList:any[]=[];
  returnBookList:any[]=[];
  constructor(private service:BookserviceService){}

  ngOnInit(): void {
    this.service.genrateGraphs(this.reports[2]).subscribe((data:any)=>{
      this.booksList=data.message;
      this.returnBookList=data.message;
      this.dataForGraphs();
      this.dataForreturnBookGraph()
      console.log(this.booksList);
    })
  }

  dataForGraphs(){
   //flatMap uses to put all objects in one array
  this.booksList=this.booksList.flatMap(data => data.books);

  //to retive array based on issuedate and bookcount on same date
  let result = this.booksList.reduce((acc, data) => {
    let dateOnly = data.issuedate.split('T')[0];
    if (acc[dateOnly]) {
      acc[dateOnly].bookcount++;
    } else {
      acc[dateOnly]= { issuedate: data.issuedate, bookcount: 1 };
    }
    return acc;
}, {});
let resultArray = Object.values(result);
  }

  dataForreturnBookGraph(){
    
    let result = this.returnBookList.reduce((acc, data) => {
    let dateOnly = data.returnDate.split('T')[0];
    if (acc[dateOnly]) {
      acc[dateOnly].charges = acc[dateOnly].charges+data.charges;
     } 
     else {
      acc[dateOnly]= { returnDate: data.returnDate, charges: data.charges };
    }
    return acc;
}, {});
let resultArray = Object.values(result);
console.log(resultArray);
 
  }

}
