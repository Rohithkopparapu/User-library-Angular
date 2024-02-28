import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { BookserviceService } from 'src/bookservice.service';

@Component({
  selector: 'app-listofstudents',
  templateUrl: './listofstudents.component.html',
  styleUrls: ['./listofstudents.component.css']
})
export class ListofstudentsComponent implements OnInit {

  studentsForm!: FormGroup;
  studentsList: any[] = [];
  message!: any;
  ifuserwanttoedit = false;
  roles = ['Select', 'Admin', 'Student', 'Librarian'];
  searchStudents!: any;
  originalList: any[] = [];
  selectedRowIndex: any = -1;
  loginUserId!: any;
  arrayForPayload: any[] = [];
  constructor(private service: BookserviceService, private builder: FormBuilder,private router:Router) { }

  ngOnInit(): void {

    this.studentsForm = this.builder.group({
      students: this.builder.array([
      ])
    })

    this.getList();

  }

  get connectFormArray() {
    return (this.studentsForm.get('students') as FormArray).controls;
  }

  getList(): void {

    const getLogindetails = localStorage.getItem('loginuserdetails');
    if (getLogindetails != undefined) {
      const deatils = JSON.parse(getLogindetails);
      if (deatils.role === 'Librarian' || deatils.role === 'Admin') {
        this.loginUserId = deatils.id;
        this.service.getStudentsList().subscribe((data: any) => {
          this.studentsList = data;
          this.originalList = data;
          const list = this.studentsForm.get('students') as FormArray;
          list.clear()
          this.studentsList.forEach(student => {
            list.push(this.builder.group({
              _id: new FormControl(student._id),
              name: new FormControl(student.name),
              email: new FormControl(student.email),
              phone: new FormControl(student.phone),
              DOB: new FormControl(student.DOB),
              gender: new FormControl(student.gender),
              role: new FormControl(student.role)
            }));
          });
          this.studentsForm.disable();
        })
      }
    }
    else {
      this.message = 'Falied to Load to Students List';
    }
  }

  edit(list: any, index: any) {
    this.ifuserwanttoedit = true;
    console.log(list);
    const controls = (this.studentsForm.get('students') as FormArray).controls;
    for (let i = 0; i < controls.length; i++) {
      if (i !== index) {
        controls[i].disable();
      }
    }
    controls[index].enable();
  }

  Update(student: any, index: any) {
    const list = this.connectFormArray[index].value;

    this.arrayForPayload.push(list);

    if (list != undefined) {
      this.service.updateStudents(this.loginUserId, this.arrayForPayload).subscribe((data) => {

        this.message = data;

      }, (err) => {
        this.message = err.error.message;
      })
    }
    
  }
  delete(id: any) {
    if (id === '' || id === undefined || id === null) {

      this.connectFormArray.splice(this.connectFormArray.length - 1, 1);
      this.selectedRowIndex = -1;
    } else {
      this.service.deleteStudentList(id).subscribe((data) => {
        this.message = data;
        this.getList()
      }, (err) => {
        this.message = err.error.message;
      })
    }
  }
  search() {
    if (this.searchStudents && this.searchStudents != '' && this.searchStudents.trim() !== '') {
      (this.studentsForm.get('students') as FormArray).controls = (this.studentsForm.get('students') as FormArray).controls.filter(data => {
        return data.get('name')?.value.toLowerCase().includes(this.searchStudents.toLowerCase())
      }
      );
    } else {
      (this.studentsForm.get('students') as FormArray).clear();
      const list = (this.studentsForm.get('students') as FormArray);
      this.studentsList.forEach(student => {
        list.push(this.builder.group({
          _id: new FormControl(student._id),
          name: new FormControl(student.name),
          email: new FormControl(student.email),
          phone: new FormControl(student.phone),
          DOB: new FormControl(student.DOB),
          gender: new FormControl(student.gender),
          role: new FormControl(student.role)
        }));
      });

    }


  }

  addStudents(index: any) {
    const PHONE_NUMBER_PATTERN = /^\d{10}$/;
    this.connectFormArray.push(this.builder.group({
      _id: new FormControl(''),
      name: new FormControl('',[Validators.required,Validators.pattern(/^[a-z]*[A-Z][a-z]*$/)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)]),
      DOB: new FormControl(''),
      gender: new FormControl(''),
      role: new FormControl('Select')
    }))
    this.selectedRowIndex = index + 1;
    const controls = (this.studentsForm.get('students') as FormArray).controls;
    for (let i = 0; i < controls.length; i++) {
      if (i !== index) {
        controls[i].disable();
      }
    }
    controls[index + 1].enable();
  }

  clear() {
    this.searchStudents = '';
    this.studentsList = [...this.originalList];
  }
  onRowClicked(index: number) {
    if (this.selectedRowIndex === index) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = index;
    }
  }
  newuser(){
    this.router.navigate(['newRegister']);;
  }

  navigatetohome(){
    this.router.navigate(['management'])
  }
}
