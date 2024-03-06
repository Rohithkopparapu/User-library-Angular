import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { BookserviceService } from 'src/bookservice.service';


@Component({
  selector: 'app-genrate-graphs',
  templateUrl: './genrate-graphs.component.html',
  styleUrls: ['./genrate-graphs.component.css']
})
export class GenrateGraphsComponent implements OnInit {

  reports: string[] = ['Weekly', 'For 15 days', 'Monthly'];
  booksList: any[] = [];
  returnBookList: any[] = [];
  issueBookGrpahsValues: any[] = [];
  returnBookGraphValues: any[] = [];
  chart: any;
  options: any = 'For 15 days';
  chartforreturn: any;
  check: any = 'For 15 days';
  constructor(private service: BookserviceService) { }

  ngOnInit(): void {
    this.genrateGraphsForIssued(this.options);
    this.genrateGraphsForReturn(this.check)
  }

  genrateGraphsForIssued(options: any) {
    this.service.genrateGraphs(this.options).subscribe((data: any) => {
      this.booksList = data.message;
      // this.returnBookList = data.message;
      this.dataForGraphs();
      // this.dataForreturnBookGraph();
    })
  }

  genrateGraphsForReturn(options: any) {
    this.service.genrateGraphs(this.check).subscribe((data: any) => {
      // this.booksList = data.message;
      this.returnBookList = data.message;
      // this.dataForGraphs();
      this.dataForreturnBookGraph();
    })
  }

  dataForGraphs() {
    //flatMap uses to put all objects in one array
    this.booksList = this.booksList.flatMap(data => data.books);

    //to retive array based on issuedate and bookcount on same date
    let result = this.booksList.reduce((acc, data) => {
      let dateOnly = data.issuedate.split('T')[0];
      data.issuedate = dateOnly;
      if (acc[dateOnly]) {
        acc[dateOnly].bookcount++;
      } else {
        acc[dateOnly] = { issuedate: data.issuedate, bookcount: 1 };
      }
      return acc;
    }, {});
    let resultArray = Object.values(result);
    this.issueBookGrpahsValues = resultArray;
    this.createChart();
  }

  dataForreturnBookGraph() {
    let result = this.returnBookList.reduce((acc, data) => {
      let dateOnly = data.returnDate.split('T')[0];
      data.returnDate = dateOnly;
      if (acc[dateOnly]) {
        acc[dateOnly].charges = acc[dateOnly].charges + data.charges;
      }
      else {
        acc[dateOnly] = { returnDate: data.returnDate, charges: data.charges };
      }
      return acc;
    }, {});
    let resultArray = Object.values(result);
    this.returnBookGraphValues = resultArray;
    console.log(this.returnBookGraphValues);
    this.forReturnDatesChart()

  }


  createChart() {

    if (this.chart) {
      this.chart.destroy();
    }
    if (this.booksList.length > 0) {
      this.chart = new Chart("MyChart", {
        type: 'bar',
        data: {
          labels: this.issueBookGrpahsValues.map(data => data.issuedate),
          datasets: [
            {
              label: "Book Count",
              data: this.issueBookGrpahsValues.map(data => data.bookcount),
              backgroundColor: 'blue'
            }
          ]
        },
        options: {
          aspectRatio: 1.0,
          responsive: false,
          indexAxis: 'x', // Set the index axis to 'y'
          scales: {
            x: {
              title: {
                display: true,
                text: 'Issue Date' // Label for the y-axis
              }
            },
            y: {
              title: {
                display: true,
                text: 'Book Count' // Label for the y-axis
              }
            }

          }
        }
      })

    }
  }

  forReturnDatesChart() {


    if (this.chartforreturn) {
      this.chartforreturn.destroy();
    }
    if (this.booksList.length > 0) {
      this.chartforreturn = new Chart("MyChartForReturn", {
        type: 'bar',
        data: {
          labels: this.returnBookGraphValues.map(data => data.returnDate),
          datasets: [
            {
              label: "Charges",
              data: this.returnBookGraphValues.map(data => data.charges),
              backgroundColor: 'blue'
            }
          ]
        },
        options: {
          aspectRatio: 1.0,
          responsive: false,
          indexAxis: 'x', // Set the index axis to 'y'
          scales: {
            x: {
              title: {
                display: true,
                text: 'Retrun Date' // Label for the y-axis
              }
            },
            y: {
              title: {
                display: true,
                text: 'Charges' // Label for the y-axis
              }
            }

          }
        }
      })

    }
  }


  showReportsBasedForIssued(option: any) {
    this.options = option;
    this.genrateGraphsForIssued(this.options);
  }
  showReportsForReturn(option: any) {
    this.check = option;
    this.genrateGraphsForReturn(this.check);
  }

}



