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
import { BookslistComponent } from './bookslist/bookslist.component';
import { PostnewbookComponent } from './postnewbook/postnewbook.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { ReturbooksComponent } from './returbooks/returbooks.component';
import { ManagementComponent } from './management/management.component';
import { ListofstudentsComponent } from './listofstudents/listofstudents.component';
import { AdminsettingsComponent } from './adminsettings/adminsettings.component';
import { GenrateGraphsComponent } from './genrate-graphs/genrate-graphs.component';
import { GenratebackupComponent } from './genratebackup/genratebackup.component';
import { SearchBookComponent } from './search-book/search-book.component';

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
    ManagementComponent,
    ListofstudentsComponent,
    AdminsettingsComponent,
    GenrateGraphsComponent,
    GenratebackupComponent,
    SearchBookComponent,
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
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
