import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

  register()
  {
    let bodyData = {
      "name" : this.name,
      "bday" : this.bday,
      "address" : this.address,
      "phone" : this.phone,
      "email" : this.email,
    };
    this.http.post("http://localhost:8070/api/student/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
        this.getAllStudent();
    });
  }
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
        alert("Student Updated Successfully")
        this.getAllStudent();

    });
  }

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
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8070/api/student/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deleted Successfully")
        this.getAllStudent();
    });
  }

}
