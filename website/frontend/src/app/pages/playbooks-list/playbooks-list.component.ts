import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import * as fileSaver from 'file-saver';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-playbooks-list',
  templateUrl: './playbooks-list.component.html',
  styleUrls: ['./playbooks-list.component.scss']
})

export class PlaybooksListComponent implements OnInit {
  playbooks : any
  playbooks_list : Array<string> = [];
  isFileSelectedFromList : boolean = false;
  isInPreviewMode: boolean = false;
  playbookEditMode: boolean = false;
  isInEditMode: boolean = false;
  
  playbookStatus: string = "no status yet";
  playbook_content: string = "nothing to show";
  playbook_content_temp: string = "nothing to show";
  selectedListPlaybook: string = "";

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  onPlaybookFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.playbookStatus += "\n===============================\n";
    this.playbookStatus += "processing";
    this.playbookStatus += "\n===============================\n";
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        this.playbookStatus += res
      }
    )
    console.log(event);
  }

  downloadHostsFile(){
    console.log("<onclickdownload>");
    this.http.get('http://localhost:8000/api/ansible-tasks/hosts').subscribe(
      res => {
        console.log("<download>");
        fileSaver.saveAs(this.returnBlob(res), "hosts")
      }
    )

  }

  onHostsFileSelected(event){
    this.selectedHostsFile = <File>event.target.files[0];
    console.log(event);
    this.playbookStatus = "uploaded hosts file";
    const fd = new FormData();
    fd.append('image', this.selectedHostsFile, this.selectedHostsFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/hosts', fd).subscribe(  /// esdfwegwergw
      res => {
        this.playbookStatus += res
      }
    ) 
  }

  onUploadAndRun(){
    this.playbookStatus += "\n===============================\n";
    this.playbookStatus += "processing";
    this.playbookStatus += "\n===============================\n";
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        this.playbookStatus += res
      }
    ) 
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickPreview(){
    let playbookString: Array<string>;
    console.log("<onclickpreview>");
    this.isInPreviewMode = true;
    this.http.get('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log("preview");
        playbookString=res;
        let concatenatedPlaybook:string = ""
        playbookString.forEach( (playbookString) => {
          concatenatedPlaybook+=playbookString;
          });
        console.log(concatenatedPlaybook);
        this.playbook_content =concatenatedPlaybook;
        /*
        
        
        const dialogRef = this.dialog.open(DialogContentPlaybookViewer,{
          data: {
            "dataKey": playbookString,
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        */
      })


  }

  saveEditedPlaybook(playbookText){
    this.playbookEditMode=false;
    console.log("saved playbook");
    this.playbook_content = this.playbook_content_temp;
    console.log(this.playbook_content);

    // this.selectedFile = <File>event.target.files[0];
    //this.playbookStatus = "processing";
    const fd = new FormData();
    fd.append('raw_yml', this.playbook_content);
    fd.append('playbook_name', this.selectedListPlaybook);
    this.http.post('http://localhost:8000/api/ansible-tasks/raw-yml', fd).subscribe(
      res => {
        console.log(res)
        //this.playbookStatus = res
      }
    )
    this.isInPreviewMode=false
    this.playbook_content=""
    this.playbook_content_temp=""
    this.playbookStatus += "playbook edited"
  }
  startPlaybookEdit(){
    console.log("start edit mode")
    this.isInEditMode = true
    this.playbook_content_temp = this.playbook_content
    this.playbookEditMode=true;
  }


  onClickUploadRunNewPlaybook(filename, fileContent){

  }

  returnBlob(res): Blob{
    console.log("file downloaded");
    return new Blob([res], {type: ''});
  }

  onClickDownload(){
    // download playbook file from backend
    console.log("<onclickdownload>");
    this.http.get('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log("<download>");
        fileSaver.saveAs(this.returnBlob(res), this.selectedListPlaybook)
        
      }
    )
  }

  onClickRunFromList(){
    this.playbookStatus = "processing";
    console.log("<onclicklistRun>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/pbrun/'+this.selectedListPlaybook).subscribe(
      res => {
        this.playbookStatus += res
      }
    )
  }


  playbookListClick(playbookName){
      this.selectedListPlaybook = playbookName;
      this.isFileSelectedFromList = true;
  }
  
  onClick(){
    this.http.get('http://localhost:8000/api/ansible-tasks/playbooks').subscribe(
      res => {
        this.playbooks = res;
        console.log(res[0]['file']);
      }
      
    )
  }
  onClickDisplayPlaybooks(){
    console.log("<debug display playbooks onclick>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/playbooks').subscribe(
      res => {
        console.log("<display");
        this.playbooks_list = [];
        this.playbooks = [];
        this.playbooks = JSON.parse(res).files;
        for (let a of this.playbooks){
          this.playbooks_list.push(a['filename']);
          
        }
        console.log("list to display:")
        console.log(this.playbooks_list);
      }
    )
  }



  constructor(private http: HttpClient, public dialog: MatDialog
    ) {
      this.onClickDisplayPlaybooks();
    }
  ngOnInit(): void {
  }


}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: '../playbook-editor',
  templateUrl: '../playbook-editor/playbook-editor.component.html',
  //styleUrls: '../playbook-editor/playbook-editor.component.css',
})
export class DialogContentExampleDialog {
  constructor(private http: HttpClient
    ) {}

  onClickUploadRunNewPlaybook(filename, fileContent){
    console.log(filename.value)
    console.log(fileContent.value)

    // this.selectedFile = <File>event.target.files[0];
    //this.playbookStatus = "processing";
    const fd = new FormData();
    fd.append('raw_yml', fileContent.value)
    fd.append('playbook_name', filename.value)
    this.http.post('http://localhost:8000/api/ansible-tasks/raw-yml', fd).subscribe(
      res => {
        console.log(res)
        //this.playbookStatus = res
      }
    )
  }

};

@Component({
  selector: '../playbook-viewer',
  templateUrl: '../playbook-viewer/playbook-viewer.component.html',
  //styleUrls: '../playbook-editor/playbook-editor.component.css',
})
export class DialogContentPlaybookViewer {
  playbook_content: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }
    ngOnInit() {
      console.log("some.log");
      console.log(this.data["dataKey"]);
      this.playbook_content = this.data["dataKey"];
    }

  

};