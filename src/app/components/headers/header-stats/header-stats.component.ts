import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import { AESEncryptDecryptService } from 'src/app/AESEncryptDecryptService.service'; 

@Component({
  selector: "app-header-stats",
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  constructor(private router:Router, private dataservice:DataService, public _AESEncryptDecryptService: AESEncryptDecryptService) { }
  userString:any = localStorage.getItem("userRole");
  userEmail:any = localStorage.getItem("useremail");
  currentState:Number = 0;
  errorText:String = "";

  ngOnInit(): void {

    console.log(this.userEmail);

    this.dataservice.searchRequestFromMail(this.userEmail).subscribe(res => {
      console.log(res);
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      var data = Object.values(obgv2);
      var objl2 = JSON.stringify(data[0])
      var objl3 = JSON.parse(objl2);
      this.currentState = objl3.status;
      this.errorText = objl3.RJreason;

      localStorage.setItem("RID", objl3.RID)
      console.log(this.currentState);
      console.log(this.errorText);
    })
  }
}
