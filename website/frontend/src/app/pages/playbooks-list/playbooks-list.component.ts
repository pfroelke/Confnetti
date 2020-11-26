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
  isInPlaybookPreviewMode: boolean = false;
  playbookEditMode: boolean = false;
  isInEditMode: boolean = false;
  isInHostsPreviewMode: boolean = false;
  isInCreatePlaybookMode: boolean = false;
  disableMenu: boolean = false;

  playbookStatus: string = "no status yet\n";
  playbook_content: string = "nothing to show";
  playbook_content_temp: string = "nothing to show";
  playbook_create_filename: string = "";
  playbook_create_filename_temp: string = "";


  selectedListPlaybook: string = "";

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  onPlaybookFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.logStatus("processing");
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        this.logStatus(res);
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
    // broken
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
    this.logStatus("processing");
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        this.logStatus(res);
      }
    ) 
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickRemovePlaybook(){
    let playbookString: Array<string>;
    console.log("<onclickpreview>");
    this.http.delete('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        this.logStatus("playbook "+this.selectedListPlaybook + " removed");
        console.log("deleted");
        console.log(res)
      })
      this.playbookEditMode = false;
      this.isInEditMode = false;
      this.isInHostsPreviewMode = false;
      this.isFileSelectedFromList = false;
  }

  onClickAbortChanges(){
    this.playbookEditMode = false;
    this.isInEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
    this.isInPlaybookPreviewMode = false;
    this.isInCreatePlaybookMode = false;
  }

  previewHostsFile(){
    this.playbookEditMode = false;
    this.isInEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
    this.isInPlaybookPreviewMode = false;
    let hostsString: string;
    console.log("entered hosts edit mode");
    this.http.get('http://localhost:8000/api/ansible-tasks/hosts').subscribe(
      res => {
        
        hostsString=res;
        console.log(hostsString)
        console.log(typeof hostsString)
        this.playbook_content =hostsString
      }
    )
    this.isInHostsPreviewMode = true;
  }

  saveEditedHosts(){
    this.playbookEditMode=false;
    this.isInHostsPreviewMode = false;
    this.isInEditMode = false;

    this.playbook_content = this.playbook_content_temp;

    const fd = new FormData();
    fd.append('raw_hosts', this.playbook_content);
    this.http.post('http://localhost:8000/api/ansible-tasks/hosts', fd).subscribe(
      res => {
        console.log(res)
        //this.playbookStatus = res
      }
    )
    this.playbook_content = "";
    this.logStatus("hosts file edited");
  }

  onClickEditHosts(){
    this.playbookEditMode = true;
    this.isInEditMode = true;
  }

  onClickCreateNewPlaybook(){
    this.disableMenu = true
    this.isInCreatePlaybookMode=true;
    this.playbook_content = "\n\n\n\n\n\n\n\n"
    this.playbook_content_temp = this.playbook_content
    this.playbook_create_filename = ""
    
  }

  onClickSaveCreatedPlaybook(){
    this.playbook_content = this.playbook_content_temp;
    this.playbook_create_filename = this.playbook_create_filename_temp
    const fd = new FormData();
    fd.append('raw_yml', this.playbook_content);
    fd.append('playbook_name', this.playbook_create_filename);
    this.http.post('http://localhost:8000/api/ansible-tasks/raw-yml', fd).subscribe(
      res => {
        console.log(res)
        //this.playbookStatus = res
      }
    )
    this.logStatus("playbook "+this.playbook_create_filename +" created")
    this.isInCreatePlaybookMode = false;
    this.disableMenu = false;
  }


  onClickPreview(){
    this.playbookEditMode = false;
    this.isInEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
    let playbookString: Array<string>;
    console.log("<onclickpreview>");
    this.isInPlaybookPreviewMode = true;
    this.http.get('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log("preview");
        console.log(res)
        playbookString=res;
        let concatenatedPlaybook:string = ""
        playbookString.forEach( (playbookString2) => {
          concatenatedPlaybook+=playbookString2;
          });
        console.log(concatenatedPlaybook);
        this.playbook_content =concatenatedPlaybook;
      })


  }

  saveEditedPlaybook(playbookText){
    this.playbookEditMode=false;
    console.log("saved playbook");
    this.logStatus("edited: "+this.selectedListPlaybook)
    this.playbook_content = this.playbook_content_temp;
    console.log(this.playbook_content);
    const fd = new FormData();
    console.log("edited playbook:")
    console.log(this.playbook_content);
    fd.append('raw_yml', this.playbook_content);
    fd.append('playbook_name', this.selectedListPlaybook);
    this.http.post('http://localhost:8000/api/ansible-tasks/raw-yml', fd).subscribe(
      res => {
        console.log(res)
        //this.playbookStatus = res
      }
    )
    this.isInPlaybookPreviewMode=false
    this.playbook_content=""
    this.playbook_content_temp=""
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
    let playbookString = "";
    this.http.get('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log("<download>");
        console.log(res);
        res.forEach( (playbookString2) => {
          playbookString+=playbookString2;
          });
        fileSaver.saveAs(this.returnBlob(playbookString), this.selectedListPlaybook)
        
      }
    )
  }

  onClickRunFromList(){
    this.logStatus("processing " + this.selectedListPlaybook);
    console.log("<onclicklistRun>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/pbrun/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log(String(res))
        let x :string;
        x = String(res)
        this.logStatus(x)
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

  logStatus(status: string){
    this.playbookStatus += ("=".repeat(50) + "\n");
    this.playbookStatus += status+"\n";
    this.playbookStatus += ("=".repeat(50) + "\n");
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