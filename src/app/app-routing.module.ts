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
import { AuthGuard } from './auth.guard';
import { GenrateGraphsComponent } from './genrate-graphs/genrate-graphs.component';

const routes: Routes = [
  {
    path:'newRegister',
    component:NewRegiestrationComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'phonelogin',
    component:PhoneloginComponent,
  },
  {
    path:'bookslist',
    component:BookslistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'student/booklist',
    component:StudentslistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'returnbooks',
    component:ReturbooksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'graphs',
    component:GenrateGraphsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'management',
    component:ManagementComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'studentslist',
    component:ListofstudentsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'searchbooks',
    component:SearchBookComponent,
    canActivate:[AuthGuard]
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
