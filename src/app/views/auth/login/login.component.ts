import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/user";
import {DataService} from "src/app/data.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  user = new User();
  constructor(private router:Router, private dataservice:DataService) {}

  roleName: string;

  ngOnInit(): void {
    this.roleName = 'gn'
    // this.roleName = 'ds'
    // this.roleName = 'drp'
  }

  onSubmit(){
    //console.log(this.user);

     this.dataservice.loginUser(this.user).subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      console.log(obgv2);
      localStorage.setItem("userRole",obgv2.role)
      localStorage.setItem("useremail",obgv2.email)
      localStorage.setItem("username",obgv2.name)

      if(obgv2.msg == "log in"){

        if(obgv2.role == "user"){
          this.router.navigate(['/admin/dashboard']);
        }else if(obgv2.role == "level 1 User"){
          this.router.navigate(['/graman']);
        }else if(obgv2.role == "level 2 User"){
          this.router.navigate(['/graman']);
        }else if(obgv2.role == "level 3 User"){
          this.router.navigate(['/dartDashboard']);
        }else if(obgv2.role == "level 4 User"){
          this.router.navigate(['/dartDashboard']);
        }else if(obgv2.role == "level 5 User"){
          this.router.navigate(['/dartDashboard']);
        }else if(obgv2.role == "level 6 User"){
          this.router.navigate(['/dartDashboard']);
        }

       
      }


     })
   }
  

}
