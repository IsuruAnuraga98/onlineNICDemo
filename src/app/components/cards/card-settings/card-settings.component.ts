import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {DataService} from "src/app/data.service"
import {Request} from "src/app/request"

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
})
export class CardSettingsComponent implements OnInit {
  
  request = new Request();
  requestarray:Request[] = [];
  counter:any = 100;

  constructor(private router:Router, private dataservice:DataService) {}

  ngOnInit(): void {

    this.dataservice.getData().subscribe(res => {
      var obj = JSON.stringify(res)
      var obgv2 = JSON.parse(obj)
      this.requestarray = Object.values(obgv2);
      console.log(this.requestarray.length+1);
      this.counter = "R00"+Number(this.requestarray.length+1);
    })

  }

  onSubmit(){
    this.request.RID = this.counter
     console.log(this.request);

     this.dataservice.insertData(this.request).subscribe(res => {
       console.log(res);

       if(res == "record has been created"){
        this.router.navigate(['/admin/dashboard']);
      }

     })

    /* this.dataservice.generatebarCode(this.request.RID).subscribe(res => {
      console.log(res);
    })*/

   }
}
