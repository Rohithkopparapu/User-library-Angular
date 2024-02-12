import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRegiestrationComponent } from './new-regiestration/new-regiestration.component';
import { LoginComponent } from './login/login.component';
import { PhoneloginComponent } from './phonelogin/phonelogin.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BookslistComponent } from './bookslist/bookslist.component';
import { PostnewbookComponent } from './postnewbook/postnewbook.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { ReturbooksComponent } from './returbooks/returbooks.component';



@NgModule({
  declarations: [
    AppComponent,
    NewRegiestrationComponent,
    LoginComponent,
    PhoneloginComponent,
    BookslistComponent,
    PostnewbookComponent,
    StudentslistComponent,
    ReturbooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  providers:[
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
