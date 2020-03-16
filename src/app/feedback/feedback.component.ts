import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model:FeedbackViewModel={
    name:'',
    email:'',
    feedback:''
  }
  constructor(private apiService:ApiService) {}

  ngOnInit(): void {
  }
   sendFeedback():void{
    let url = "http://localhost:8080/api/feedback";
   this.apiService.postFeedback(this.model).subscribe(
     res=>{
       location.reload();
     },
     err=>{"An error has occurred"}
   )
}

}
export interface FeedbackViewModel {
  name:string
  email:string
  feedback:string;
}
