import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss']
})
export class StudentcrudComponent {

  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name: string ="";
  bday: string ="";
  address: string ="";
  phone: string ="";
  email: string ="";
  currentStudentID = "";

  constructor(private http: HttpClient )
  {
    this.getAllStudent();
  }
  ngOnInit(): void {
  }

  //Get All Student List
  getAllStudent()
  {
    this.http.get("http://localhost:8070/api/student/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
    });
  }

//Register Student
  register() {

    // Validate the form fields
    if (!this.name || !this.bday || !this.address || !this.phone || !this.email) {
      Swal.fire('Error', 'Please fill in all the required fields.', 'error');
      return; // Exit the function if any field is empty
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.email)) {
      Swal.fire('Error', 'Please enter a valid email address.', 'error');
      return;
    }

    // Validate mobile number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(this.phone)) {
      Swal.fire('Error', 'Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    let bodyData = {
      "name": this.name,
      "bday": this.bday,
      "address": this.address,
      "phone": this.phone,
      "email": this.email,
    };

    this.http.post("http://localhost:8070/api/student/add", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        Swal.fire({
          title: 'Success',
          text: 'Student registered successfully!',
          icon: 'success',
          timer: 2000
        })
          .then(() => {
            this.getAllStudent();
            location.reload(); // Refresh the page
          });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'An error occurred while registering the student.', 'error');
      }
    );
  }


   //Update Student
  setUpdate(data: any)
  {
   this.name = data.name;
   this.bday = data.bday;
   this.address = data.address;
   this.phone = data.phone;
   this.email = data.email;

   this.currentStudentID = data.id;

  }

  UpdateRecords()
  {
    let bodyData =
    {
      "name" : this.name,
      "bday" : this.bday,
      "address" : this.address,
      "phone" : this.phone,
      "email" : this.email
    };

    this.http.put("http://localhost:8070/api/student/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        Swal.fire({
          title: 'Success',
          text: 'Student updated successfully!',
          icon: 'success',
          timer: 2000
        })
        .then(() => {
          this.getAllStudent();
          location.reload();
        });

    });
  }

  //Save Student
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }
  }

//Delete Student
  setDelete(data: any) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to Remove this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete("http://localhost:8070/api/student/delete" + "/" + data.id).subscribe((resultData: any) => {
          console.log(resultData);
          Swal.fire({
            title: 'Success',
            text: 'Student Removed successfully!',
            icon: 'success',
            timer: 2000
          })
            .then(() => {
              this.getAllStudent();
            });
        });
      }
    });
  }


}
