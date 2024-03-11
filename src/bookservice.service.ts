import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService implements OnInit {


  private popStateListenerAttached = false;
  auth_token = new BehaviorSubject<string>('');
  ifeditthebooks = new BehaviorSubject<boolean>(true);
  token!: string | null;
  userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private platform: PlatformLocation, private router: Router) { }

  ngOnInit(): void {

  }
  getUserDetails(email: string, password: string) {

    return this.http.post(`http://localhost:8080/login/email?email=${email}&password=${password}`, '').pipe(map((res) => {
      return res;
    }))
  }
  getUserDetailsByPhone(phone: string, password: string) {

    return this.http.post(`http://localhost:8080/login?phone=${phone}&password=${password}`, '').pipe(map((res) => {
      return res;
    }))
  }
  saveNewUser(newuser: any) {
    return this.http.post('http://localhost:8080/newUser', newuser).pipe(map((res) => {
      return res;
    }))
  }

  getBooksInLibraray(): Observable<any> {
    if (sessionStorage.getItem('auth_token') != null) {

      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get('http://localhost:8080/catController/getBooks', { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }

  getBooksByCatName(categoryname: string) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`http://localhost:8080/catController/getBooks/${categoryname}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  editbooks(id: any, bookdetails: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`http://localhost:8080/catController/updateBooks/${id}`, bookdetails, { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }

  deletebook(id: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(`http://localhost:8080/catController/deleteBooks/${id}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }

  deletebooksbasedoncategory(categoryname: any, bookname: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.delete(`http://localhost:8080/catController/deleteBooksincategory/${categoryname}/${bookname}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }


  postnewbook(newbookdetails: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.post(`http://localhost:8080/catController/addBooks`, newbookdetails, { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }
  issuebook(id: any, book: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.post(`http://localhost:8080/catController//issueBooks/${id}`, book, { headers: headers }).pipe(map((res) => {
      return res;
    }))

  }


  getStudentsList() {
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.get(`http://localhost:8080/catController/studentusers`, { headers: headers }).pipe(map((res) => {
      return res;
    }))


  }
  getIssuedBookedBasedOnStdId(id: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.get(`http://localhost:8080/catController/getIssuedBooks/${id}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))


  }
  returnBooks(id: any, books: any) {
    // if(this.auth_token){
    //   this.auth_token.subscribe((data)=>{
    //     this.token=data;
    //   })

    // }
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.post(`http://localhost:8080/catController/returnBooksById/${id}`, books, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  getStudentslist() {
    // if(this.auth_token){
    //   this.auth_token.subscribe((data)=>{
    //     this.token=data;
    //   })

    // }
    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.get(`http://localhost:8080/catController/getStudentlist`, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  updateStudents(id: any, list: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.put(`http://localhost:8080/catController/students/${id}`, list, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  deleteStudentList(id: any) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.delete(`http://localhost:8080/catController/student/${id}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  genrateGraphs(type: string) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.get(`http://localhost:8080/catController/issuedbooks/report/${type}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

  customeGraphs(startDate: Date, endDate: Date) {

    if (sessionStorage.getItem('auth_token') != null) {
      this.token = sessionStorage.getItem('auth_token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,

    });
    return this.http.get(`http://localhost:8080/catController/customdates/${startDate}/${endDate}`, { headers: headers }).pipe(map((res) => {
      return res;
    }))
  }

}


