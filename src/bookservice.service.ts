import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService implements OnInit {



  auth_token=new BehaviorSubject<string>('');
  ifeditthebooks=new BehaviorSubject<boolean>(false);
  token!:string;
 
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
  }
  getUserDetails(email:string,password:string){

    return this.http.post(`http://localhost:8081/login/email?email=${email}&password=${password}`,'').pipe(map((res)=>{
      return res;
     }))
  }
  getUserDetailsByPhone(phone:string,password:string){

    return this.http.post(`http://localhost:8081/login?phone=${phone}&password=${password}`,'').pipe(map((res)=>{
      return res;
     }))
  }
  saveNewUser(newuser:any)
  {
    return this.http.post('http://localhost:8000/newUser',newuser).pipe(map((res)=>{
      return res;
     }))
  }
  
  getBooksInLibraray():Observable<any>{
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`
    });
    return this.http.get('http://localhost:8000/catController/getBooks',{headers:headers}).pipe(map((res)=>{
      return res;
    }))
   
  }

  getBooksByCatName(categoryname:string){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`
    });
    return this.http.get(`http://localhost:8000/catController/getBooks/${categoryname}`,{headers:headers}).pipe(map((res)=>{
      return res;
    }))
  }

  editbooks(id:any,bookdetails:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`
    });
   return this.http.put(`http://localhost:8000/catController/updateBooks/${id}`,bookdetails,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  }

  deletebook(id:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`
    });
   return this.http.delete(`http://localhost:8000/catController/deleteBooks/${id}`,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  }

  deletebooksbasedoncategory(categoryname:any,bookname:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
     
    });
   return this.http.delete(`http://localhost:8000/catController/deleteBooksincategory/${categoryname}/${bookname}`,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  }

  
  postnewbook(newbookdetails:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
     
    });
   return this.http.post(`http://localhost:8000/catController/addBooks`,newbookdetails,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  }
  issuebook(id:any,book:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
     
    });
   return this.http.post(`http://localhost:8000/catController//issueBooks/${id}`,book,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  }

  getStudentsList(){
      if(this.auth_token){
        this.auth_token.subscribe((data)=>{
          this.token=data;
        })
     
      }
   const headers = new HttpHeaders({
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
       
      });
     return this.http.get(`http://localhost:8000/catController/studentusers`,{headers:headers}).pipe(map((res)=>{
        return res;
      }))
  
    
  }
  getIssuedBookedBasedOnStdId(id:any){
    if(this.auth_token){
      this.auth_token.subscribe((data)=>{
        this.token=data;
      })
   
    }
 const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
     
    });
   return this.http.get(`http://localhost:8000/catController/getIssuedBooks/${id}`,{headers:headers}).pipe(map((res)=>{
      return res;
    }))

  
}
returnBooks(id:any,books:any){
  if(this.auth_token){
    this.auth_token.subscribe((data)=>{
      this.token=data;
    })
 
  }
const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
   
  });
 return this.http.post(`http://localhost:8000/catController/returnBooksById/${id}`,books,{headers:headers}).pipe(map((res)=>{
    return res;
  }))
}

getStudentslist(){
  if(this.auth_token){
    this.auth_token.subscribe((data)=>{
      this.token=data;
    })
 
  }
const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
   
  });
 return this.http.get(`http://localhost:8000/catController/getStudentlist`,{headers:headers}).pipe(map((res)=>{
    return res;
  }))
}

updateStudents(id:any,list:any){
  if(this.auth_token){
    this.auth_token.subscribe((data)=>{
      this.token=data;
    })
 
  }
const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
   
  });
 return this.http.put(`http://localhost:8000/catController/students/${id}`,list,{headers:headers}).pipe(map((res)=>{
    return res;
  }))
}

deleteStudentList(id:any){
  if(this.auth_token){
    this.auth_token.subscribe((data)=>{
      this.token=data;
    })
 
  }
const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJpZCI6IjY1ZDJlZTkwOWVhYmVjYjE5MzgxN2IyZCIsIm5hbWUiOiJWaWpheSIsImVtYWlsIjoidmlqYXlAZ21haWwuY29tIiwicm9sZSI6IkxpYnJhcmlhbiJ9LCJpYXQiOjE3MDkwOTQzNjcsImV4cCI6MTcwOTA5OTE2N30.vnS99k-tvubBMgOdMY9D0Q6TsNQO3llBqgVxKIYdLYg`,
   
  });
 return this.http.delete(`http://localhost:8000/catController/student/${id}`,{headers:headers}).pipe(map((res)=>{
    return res;
  }))
}

}


