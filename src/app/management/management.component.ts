import { Component, OnInit } from '@angular/core';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private service:BookserviceService){}

  ngOnInit(): void {
    this.service.getStudentslist().subscribe((data)=>{
      console.log(data);
      
    })
  }
  logout(){
    this.service.userLoggedIn.next(false);
  }

}
