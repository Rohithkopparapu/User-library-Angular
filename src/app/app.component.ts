import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/bookservice.service';
import { IdleServiceService } from './idle-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularnode';
  phone!:string;
  password!:string;
  constructor(private service:IdleServiceService){

  }
  ngOnInit(): void {
     this.service.startWatching().subscribe((data)=>{
      console.log('Activate');
      
     })
  }
  ngOnDestroy() {
    this.service.stopWatchingForActivity();
  }

}
