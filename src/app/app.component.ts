import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularnode';
  phone!:string;
  password!:string;
  constructor(private service:BookserviceService){

  }
  ngOnInit(): void {
   
  }

  


}
