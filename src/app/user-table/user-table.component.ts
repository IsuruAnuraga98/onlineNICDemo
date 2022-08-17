import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import { AESEncryptDecryptService } from 'src/app/AESEncryptDecryptService.service'; 

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  requestarray:Request[] = []

  constructor(private router:Router, private dataservice:DataService, public _AESEncryptDecryptService: AESEncryptDecryptService) { }

  ngOnInit(): void {

    this.dataservice.getUserData().subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      this.requestarray = Object.values(obgv2);
      console.log(this.requestarray );
    })

  }

  seletedRequest(obj){
    var objStr = JSON.stringify(obj)
    localStorage.setItem("selectedUser",objStr)
    this.router.navigate(['/userform']);
 }

}
