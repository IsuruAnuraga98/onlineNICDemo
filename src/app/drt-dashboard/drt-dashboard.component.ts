import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import { AESEncryptDecryptService } from 'src/app/AESEncryptDecryptService.service'; 

@Component({
  selector: 'app-drt-dashboard',
  templateUrl: './drt-dashboard.component.html',
  styleUrls: ['./drt-dashboard.component.css']
})
export class DrtDashboardComponent implements OnInit {

  requestarray:Request[] = []
  counter:any = 0
  userString:any = ""
  userName:any = ""
  StoragePath:string = "http://nicsystem.test/uploads/"

  Policeusername:string = ""
  Peaceusername:string = ""
  Photousername:string = ""

  constructor(private router:Router, private dataservice:DataService, public _AESEncryptDecryptService: AESEncryptDecryptService) { }

  ngOnInit(): void {

    this.userString = localStorage.getItem("userRole");
    this.userName = localStorage.getItem("username");

    let decryptText = this._AESEncryptDecryptService.encrypt("R009");
    console.log(decryptText);

    if(this.userString == "level 3 User"){

      this.dataservice.getDataLevel3().subscribe(res => {
        var obj = JSON.stringify(res)
        var obgv2 = JSON.parse(obj)
        this.requestarray = Object.values(obgv2);
        console.log(this.requestarray );
        this.counter = 0
      })

    }else if(this.userString == "level 4 User"){

      this.dataservice.getDataLevel4().subscribe(res => {
        var obj = JSON.stringify(res)
        var obgv2 = JSON.parse(obj)
        this.requestarray = Object.values(obgv2);
        console.log(this.requestarray );
        this.counter = 0
      })

    }else if(this.userString == "level 5 User"){

      this.dataservice.getDataLevel5().subscribe(res => {
        var obj = JSON.stringify(res)
        var obgv2 = JSON.parse(obj)
        this.requestarray = Object.values(obgv2);
        console.log(this.requestarray );
        this.counter = 0
      })

    }else if(this.userString == "level 6 User"){

      this.dataservice.getDataLevel6().subscribe(res => {
        var obj = JSON.stringify(res)
        var obgv2 = JSON.parse(obj)
        this.requestarray = Object.values(obgv2);
        console.log(this.requestarray );
        this.counter = 0
      })

    }
   

  }

  viewPoliceImages(data){
    this.dataservice.getPoliceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var URL = this.StoragePath+obgv2.FileName;
      console.log(URL);
      //alert("view Document<br>"+this.StoragePath+obgv2.FileName);
      window.open(URL, '_blank');
      this.counter = 0
    })
  }

  viewPeaceImages(data){
    this.dataservice.getPeaceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var URL = this.StoragePath+obgv2.FileName;
      console.log(URL);
      //alert("view Document<br>"+this.StoragePath+obgv2.FileName);
      window.open(URL, '_blank');
      this.counter = 0
    })
  }

  viewPhotoImages(data){
    this.dataservice.getPhoto(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var URL = this.StoragePath+obgv2.FileName;
      console.log(URL);
      //alert("view Document<br>"+this.StoragePath+obgv2.FileName);
      window.open(URL, '_blank');
      this.counter = 0
    })
  }

  viewPoliceImagesName(data){

    this.dataservice.getPoliceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      //console.log(name);
      this.Policeusername = name;
    })

    return this.Policeusername;
  }

  viewPeaceImagesName(data){
    this.dataservice.getPeaceReport(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      //console.log(name);
      this.Peaceusername = name;
    })
    return this.Peaceusername;
  }

  viewPhotoImagesName(data){
    this.dataservice.getPhoto(data).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var name = obgv2.uploadedBy;
      //console.log(name);
      this.Photousername = name;
    })
    return this.Photousername;
  }

  seletedRequest(obj){
    var objStr = JSON.stringify(obj)
    localStorage.setItem("selectedRQ",objStr)
    this.router.navigate(['/form']);
 }

}
