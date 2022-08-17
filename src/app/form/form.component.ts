import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import {Request} from "src/app/request"
import { AESEncryptDecryptService } from 'src/app/AESEncryptDecryptService.service'; 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  RECobj:string = localStorage.getItem("selectedRQ")
  obgv2:any = JSON.parse(this.RECobj)
  RJreason = '';


  email:string = this.obgv2.email
  RID:string = this.obgv2.RID
  username:string = this.obgv2.name
  status:string = this.obgv2.status
  fname:string = this.obgv2.fname
  lname:string = this.obgv2.lname
  address:string = this.obgv2.address
  city:string = this.obgv2.city
  province:string = this.obgv2.province
  pCode:string = this.obgv2.pCode

  Policeusername:string = ""
  Peaceusername:string = ""
  Photousername:string = ""

  request = new Request()

  userString:any = localStorage.getItem("userRole");

  constructor(private router:Router, private dataservice:DataService, public _AESEncryptDecryptService: AESEncryptDecryptService) {}

  ngOnInit(): void {
    console.log(this.obgv2)
    this.request.email = this.email
    this.request.RID = this.RID

    if(this.userString == "level 6 User"){
      this.viewPoliceImagesName(this.request.RID);
      this.viewPeaceImagesName(this.request.RID);
      this.viewPhotoImagesName(this.request.RID);
    }
  }


  updateRequest(){

    if(this.userString == "level 1 User"){
      this.dataservice.updateRequest(this.request).subscribe(res => {
        console.log(res);
        if(res == "request has been updated"){
          this.router.navigate(['/graman']);
        }
      })
    }else if(this.userString == "level 2 User"){
      this.dataservice.updateRequestl2(this.request).subscribe(res => {
        console.log(res);
        if(res == "request has been updated"){
          this.router.navigate(['/graman']);
        }
      })
    }
    else if(this.userString == "level 6 User"){
      this.dataservice.updateRequestl3(this.request).subscribe(res => {
        console.log(res);
        if(res == "request has been updated"){
          this.router.navigate(['/dartDashboard']);
        }
      })
    }
    
  }

  updateRequestError(){
    this.request.RJreason = this.RJreason;

    console.log(this.request);

      this.dataservice.updateRequestError(this.request).subscribe(res => {
        console.log(res);

        if(res == "request has been updated"){
          if(this.userString == "level 1 User"){
             this.router.navigate(['/graman']);
          }else if(this.userString == "level 2 User"){
             this.router.navigate(['/dartDashboard']);
          }else if(this.userString == "level 6 User"){
              this.router.navigate(['/dartDashboard']);
          }
        }
      })
  }
 
  viewPoliceImagesName(data){

    this.dataservice.getPoliceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      console.log(name);
      this.Policeusername = name;
    })

    return this.Policeusername;
  }

  viewPeaceImagesName(data){
    this.dataservice.getPeaceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      console.log(name);
      this.Peaceusername = name;
    })
    return this.Peaceusername;
  }

  viewPhotoImagesName(data){
    this.dataservice.getPhoto(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      console.log(name);
      this.Photousername = name;
    })
    return this.Photousername;
  }

  onSelected(value:string): void {
		this.RJreason = value;
	}

}
