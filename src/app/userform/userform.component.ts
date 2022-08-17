import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import {Request} from "src/app/request"
import { AESEncryptDecryptService } from 'src/app/AESEncryptDecryptService.service'; 

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  RECobj:string = localStorage.getItem("selectedUser")
  obgv2:any = JSON.parse(this.RECobj)
  selectedRole = 'user';

  ID:string = this.obgv2.id
  email:string = this.obgv2.email
  username:string = this.obgv2.name
  role:string = this.obgv2.role

  constructor(private router:Router, private dataservice:DataService, public _AESEncryptDecryptService: AESEncryptDecryptService) {}

  ngOnInit(): void {
  }

  updateRequest(){

    this.dataservice.updateUserData(this.ID,this.selectedRole).subscribe(res => {
      console.log(res);
      if(res == '1'){
        this.router.navigate(['/usertable']);
      }
    })

    //console.log(this.selectedRole);
  }

  onSelected(value:string): void {
		this.selectedRole = value;
	}

}
