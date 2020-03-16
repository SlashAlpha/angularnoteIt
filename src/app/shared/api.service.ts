import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../notes/model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Note} from "../notes/model/note";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL="http://localhost:8080/api";
  private  ALL_NOTEBOOK_URL = this.BASE_URL+'\\notebooks\\all';
  private SEND_FEEDBACK_URL= this.BASE_URL+'\\feedback';
  private SAVE_UPDATE_NOTEBOOK=this.BASE_URL+'\\notebooks';
  private DELETE_NOTEBOOK=this.BASE_URL+'\\notebooks\\';
  private ALL_NOTES_URL=this.BASE_URL+'\\notes\\all';
  private NOTES_BY_NOTEBOOK_URL=this.BASE_URL+'\\notes\\byNotebook\\';
  private SAVE_UPDATE_NOTE=this.BASE_URL+'\\notes';
  private DELETE_NOTE_URL=this.BASE_URL+'\\notes\\';

  constructor(private http:HttpClient) {

  }
  creat(choice:number,id:string):any{
    if(choice==1) {
      let notebook: Notebook = {name:'new Notebook',id:null,nbOfNotes:'0'};
      return notebook;
    }else if (choice==2){
      let note:Note={id:null,title:"new note",text:"write something",notebookId:id,lastModifiedOn:""};
      return note;
    }}

  postFeedback(feedback:FeedbackViewModel):Observable<any>{
    return this.http.post(this.SEND_FEEDBACK_URL,feedback);
  }

  getNotesByNotebook(notebookId: String):Observable<Note[]>{
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL+notebookId);
  }

  many(object:any,objectId:string,getpostdel:number,path:number):any{
    let url:string="";
    switch (path) {
      case 1: url=this.ALL_NOTEBOOK_URL;
      break;
      case 2: url=this.SEND_FEEDBACK_URL;
      break;
      case 3: url=this.ALL_NOTES_URL;
      break;
      case 4: url=this.DELETE_NOTEBOOK;
      break;
      case 5: url=this.DELETE_NOTE_URL;
      break;
      case 6: url=this.SAVE_UPDATE_NOTE;
      break;
      case 7: url=this.SAVE_UPDATE_NOTEBOOK;
      break;
      case 8: url=this.NOTES_BY_NOTEBOOK_URL;
      break;
    }
    if (getpostdel==1){
      if(objectId==""){ this.http.get<any>(url+objectId).subscribe();}
      return this.http.get<any>(url+objectId);}
    else if (getpostdel==2){
      return this.http.post<object>(url,object);
    }
    else {return this.http.delete(url+objectId)}
  }


}
