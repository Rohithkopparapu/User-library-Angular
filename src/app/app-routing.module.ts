import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRegiestrationComponent } from './new-regiestration/new-regiestration.component';
import { LoginComponent } from './login/login.component';
import { PhoneloginComponent } from './phonelogin/phonelogin.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { ReturbooksComponent } from './returbooks/returbooks.component';
import { ManagementComponent } from './management/management.component';
import { ListofstudentsComponent } from './listofstudents/listofstudents.component';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
  {
    path:'newRegister',
    component:NewRegiestrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'phonelogin',
    component:PhoneloginComponent
  },
  {
    path:'bookslist',
    component:BookslistComponent
  },
  {
    path:'student/booklist',
    component:StudentslistComponent
  },
  {
    path:'returnbooks',
    component:ReturbooksComponent
  },
  {
    path:'management',
    component:ManagementComponent
  },
  {
    path:'studentslist',
    component:ListofstudentsComponent
  },
  {
    path:'searchbooks',
    component:SearchBookComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
