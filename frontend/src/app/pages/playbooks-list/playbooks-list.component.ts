import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-playbooks-list',
  templateUrl: './playbooks-list.component.html',
  styleUrls: ['./playbooks-list.component.scss'],
})
export class PlaybooksListComponent implements OnInit {
  playbooks: any;
  playbooks_list: Array<string> = [];
  isFileSelectedFromList: boolean = false;
  isInPlaybookPreviewMode: boolean = false;

  playbookEditMode: boolean = false;
  hostEditMode: boolean = false;
  //isInEditMode: boolean = false;

  isInHostEditMode: boolean = false;
  isInPlaybookEditMode: boolean = false;

  isInHostsPreviewMode: boolean = false;
  isInCreatePlaybookMode: boolean = false;
  
  disableMenu: boolean = false;

  hostFile_content:string ='nothing to show';
  hostFile_content_temp: string = 'nothing to show';

  playbookStatus: string = 'no status yet\n';
  playbook_content: string = 'nothing to show';
  playbook_content_temp: string = 'nothing to show';
  playbook_create_filename: string = '';
  playbook_create_filename_temp: string = '';

  selectedListPlaybook: string = '';

  onPlaybookFileSelected(event) {
    const selectedFile = <File>event.target.files[0];
    this.logStatus('processing');
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    this.http
      .post('http://localhost:8000/api/ansible-tasks/', fd)
      .subscribe((res) => {
        this.logStatus(res as string);
      });
    console.log(event);
  }

  downloadHostsFile() {
    console.log('<onclickdownload>');
    this.http
      .get('http://localhost:8000/api/ansible-tasks/hosts')
      .subscribe((res) => {
        console.log('<download>');
        fileSaver.saveAs(this.returnBlob(res), 'hosts');
      });
  }

  onHostsFileSelected(event) {
    // broken
    const selectedHostsFile = <File>event.target.files[0];
    console.log(event);
    this.playbookStatus = 'uploaded hosts file';
    const fd = new FormData();
    fd.append('image', selectedHostsFile, selectedHostsFile.name);
    this.http
      .post('http://localhost:8000/api/ansible-tasks/hosts', fd)
      .subscribe(
        /// esdfwegwergw
        (res) => {
          this.playbookStatus += res;
        }
      );
  }

  onClickRemovePlaybook() {
    let playbookString: Array<string>;
    console.log('<onclickpreview>');
    this.http
      .delete(
        'http://localhost:8000/api/ansible-tasks/pb/' +
          this.selectedListPlaybook
      )
      .subscribe((res) => {
        this.logStatus('playbook ' + this.selectedListPlaybook + ' removed');
        console.log('deleted');
        console.log(res);
      });
    //this.playbookEditMode = false;
    //this.isInEditMode = false;
    this.isInPlaybookEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
  }

  disableEditModes() {
    this.isInHostEditMode = false;
    this.isInPlaybookEditMode = false;
  }

  onClickAbortChanges() {
    //this.playbookEditMode = false;
    this.isInPlaybookEditMode = false;
    //this.isInEditMode = false;
    this.disableEditModes();
    // check this above!!!
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
    this.isInPlaybookPreviewMode = false;
    this.isInCreatePlaybookMode = false;
  }  

  previewHostsFile() {
    //this.playbookEditMode = false;
    this.isInPlaybookEditMode = false;
    this.hostEditMode = false;
    //this.isInEditMode = false;
    this.isInHostEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = false;
    this.isInPlaybookPreviewMode = false;
    let hostsString: string;
    console.log('entered hosts edit mode');
    this.http
      .get('http://localhost:8000/api/ansible-tasks/hosts')
      .subscribe((res) => {
        hostsString = res as string;
        console.log(hostsString);
        console.log(typeof hostsString);        
        this.hostFile_content = hostsString;
        this.hostFile_content_temp = this.hostFile_content;
      });
    this.isInHostsPreviewMode = true;
  }

  saveEditedHosts() {
    //this.playbookEditMode = false;
    this.isInPlaybookEditMode = false;
    this.hostEditMode = false;
    this.isInHostsPreviewMode = false;
    //this.isInEditMode = false;
    this.isInHostEditMode = false;

    //this.playbook_content = this.playbook_content_temp;
    this.hostFile_content = this.hostFile_content_temp;

    const fd = new FormData();
    fd.append('raw_hosts', this.hostFile_content);
    this.http
      .post('http://localhost:8000/api/ansible-tasks/hosts', fd)
      .subscribe((res) => {
        console.log(res);
        //this.playbookStatus = res
      });
    this.hostFile_content = '';
    this.logStatus('hosts file edited');
  }

  onClickEditHosts() {
    //this.playbookEditMode = true;
    this.hostEditMode = true;
    //this.isInEditMode = true;
    this.isInHostEditMode = true;
  }

  onClickCreateNewPlaybook() {
    this.disableMenu = true;
    this.isInCreatePlaybookMode = true;
    this.playbook_content = '\n\n\n\n\n\n\n\n';
    this.playbook_content_temp = this.playbook_content;
    this.playbook_create_filename = '';
  }

  onClickSaveCreatedPlaybook() {
    this.playbook_content = this.playbook_content_temp;
    this.playbook_create_filename = this.playbook_create_filename_temp;
    const fd = new FormData();
    fd.append('raw_yml', this.playbook_content);
    fd.append('playbook_name', this.playbook_create_filename);
    this.http
      .post('http://localhost:8000/api/ansible-tasks/raw-yml', fd)
      .subscribe((res) => {
        console.log(res);
        //this.playbookStatus = res
      });
    this.logStatus('playbook ' + this.playbook_create_filename + ' created');
    this.isInCreatePlaybookMode = false;
    this.disableMenu = false;
  }

  onClickPreview() {
    //this.playbookEditMode = false;
    this.isInPlaybookEditMode = false;
    this.hostEditMode = false;
    //this.isInEditMode = false;
    this.isInPlaybookPreviewMode = false;
    this.isInPlaybookEditMode = false;
    this.isInHostEditMode = false;
    this.isInHostsPreviewMode = false;
    this.isFileSelectedFromList = true;
    //this.isInCreatePlaybookMode = true;
    let playbookString: string;
    console.log('<onclickpreview>');
    this.http
      .get(
        'http://localhost:8000/api/ansible-tasks/pb/' +
          this.selectedListPlaybook
      )
      .subscribe((res) => {
        console.log('preview');
        console.log(res);
        playbookString = res as string;
        this.playbook_content = playbookString;
      });
      this.isInPlaybookPreviewMode = true;
  }

  saveEditedPlaybook(playbookText) {
    //this.playbookEditMode = false;
    this.isInPlaybookEditMode = false;
    console.log('saved playbook');
    this.logStatus('edited: ' + this.selectedListPlaybook);
    this.playbook_content = this.playbook_content_temp;
    console.log(this.playbook_content);
    const fd = new FormData();
    console.log('edited playbook:');
    console.log(this.playbook_content);
    fd.append('raw_yml', this.playbook_content);
    fd.append('playbook_name', this.selectedListPlaybook);
    this.http
      .post('http://localhost:8000/api/ansible-tasks/raw-yml', fd)
      .subscribe((res) => {
        console.log(res);
        //this.playbookStatus = res
      });
    this.isInPlaybookPreviewMode = false;
    this.playbook_content = '';
    this.playbook_content_temp = '';
  }
  startPlaybookEdit() {
    this.isInPlaybookPreviewMode = true;
    console.log('start edit mode');
    //this.isInEditMode = true;
    this.isInPlaybookEditMode = true;
    this.playbook_content_temp = this.playbook_content;
    //this.playbookEditMode = true;
  }

  onClickUploadRunNewPlaybook(filename, fileContent) {}

  returnBlob(res): Blob {
    console.log('file downloaded');
    return new Blob([res], { type: '' });
  }

  onClickDownload() {
    // download playbook file from backend
    console.log('<onclickdownload>');
    let playbookString = '';
    this.http
      .get(
        'http://localhost:8000/api/ansible-tasks/pb/' +
          this.selectedListPlaybook
      )
      .subscribe((res) => {
        console.log('<download>');
        console.log(res);
        // res.forEach((playbookString2) => {
        //   playbookString += playbookString2;
        // });
        fileSaver.saveAs(
          this.returnBlob(playbookString),
          this.selectedListPlaybook
        );
      });
  }

  onClickRunFromList() {
    this.logStatus('processing ' + this.selectedListPlaybook);
    console.log('<onclicklistRun>');
    this.http
      .get(
        'http://localhost:8000/api/ansible-tasks/pbrun/' +
          this.selectedListPlaybook
      )
      .subscribe((res) => {
        console.log(String(res));
        let x: string;
        x = String(res);
        this.logStatus(x);
      });
  }

  playbookListClick(playbookName) {
    this.selectedListPlaybook = playbookName;
    this.isFileSelectedFromList = true;
  }

  onClick() {
    this.http
      .get('http://localhost:8000/api/ansible-tasks/playbooks')
      .subscribe((res) => {
        this.playbooks = res;
        console.log(res[0]['file']);
      });
  }
  onClickDisplayPlaybooks() {
    console.log('<debug display playbooks onclick>');
    this.http
      .get('http://localhost:8000/api/ansible-tasks/playbooks')
      .subscribe((res) => {
        console.log('<display');
        this.playbooks_list = [];
        this.playbooks = [];
        this.playbooks = JSON.parse(res as string).files;
        for (let a of this.playbooks) {
          this.playbooks_list.push(a['filename']);
        }
        console.log('list to display:');
        console.log(this.playbooks_list);
      });
  }

  logStatus(status: string) {
    this.playbookStatus += '='.repeat(50) + '\n';
    this.playbookStatus += status + '\n';
    this.playbookStatus += '='.repeat(50) + '\n';
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.onClickDisplayPlaybooks();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
