import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRegiestrationComponent } from './new-regiestration/new-regiestration.component';
import { LoginComponent } from './login/login.component';
import { PhoneloginComponent } from './phonelogin/phonelogin.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { ReturbooksComponent } from './returbooks/returbooks.component';

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
