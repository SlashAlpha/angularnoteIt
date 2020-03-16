import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";
import {VariableIdentifier} from "@angular/compiler-cli/src/ngtsc/indexer";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    notebooks:Notebook[]=[];
    notes:Note[]=[];
    selectedNotebook:Notebook;
    searchText:string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();

  }

  repIt(x:any,request:number,notebook:Notebook,note:Note){
    x.subscribe(
      res=> {
        switch (request) {
          //--get ALL--
          case 1:
            this.notebooks = res;
            break;
          case 2:
            this.notes = res;
            break;
            //--update--
          case 3:
            break;
            //--create--
          case 4:
            note.id = res.id;
            this.notes.push(note);
            break;
          case 5:
            notebook.id = res.id;
            this.notebooks.push(notebook);
            break;
            //--delete--
          case 6:
            let indexOfNotebook=this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNotebook);
            break;
          case 7:
            let indexOfNote=this.notes.indexOf(note);
            this.notes.splice(indexOfNote);
            break;

        }


      },
      err=>{alert("can't process your request "+name);});}

  public getAllNotebooks(){
      this.repIt(this.apiService.many(this.notebooks,"",1,1),1,null,null);
  }

  getAllNotes(){
   this.repIt(this.apiService.many(this.notes,"",1,3),2,null,null);
  }

  createNotebook() {
    let newNotebook:Notebook=this.apiService.creat(1,"");
   this.repIt( this.apiService.many(newNotebook,"",2,7),5,newNotebook,null);
  }

  updateNotebook(notebook: Notebook) {
   this.repIt(this.apiService.many(notebook,"",2,7),3,null,null);
  }

  deleteNotebook(notebook: Notebook) {
    if(confirm("Are you sure you want to delete the "+notebook.name+" notebook ?")){
     this.repIt(this.apiService.many(notebook,notebook.id,3,4),6,notebook,null)}
  }

  deleteNote(note: Note) {
 if(confirm("Are you sure you want to delete the "+note.title+" note ?")){
     this.repIt(this.apiService.many(note,note.id,3,5),7,null,note);}
  }

  createNote(notebookId: string) {
    let newNote:Note = this.apiService.creat(2,notebookId);
   this.repIt( this.apiService.many(newNote,"",2,6),4,null,newNote)
  }

  selectNotebook(notebook:Notebook){
    this.selectedNotebook=notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(
      res=>{
        this.notes=res;
      },
      err=>{alert("an error has occurred while getting "+notebook.name+" notes");}
    );
  }

  updateNotes(note: Note) {
  this.repIt(  this.apiService.many(note,note.id,2,6),3,null,null)
  }

  selectedAllNotes() {
    this.selectedNotebook=null;
    this.getAllNotes();
  }
}
