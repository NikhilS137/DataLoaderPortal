import { Component, OnInit } from '@angular/core';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-uploaded-file-list',
  templateUrl: './uploaded-file-list.component.html',
  styleUrls: ['./uploaded-file-list.component.css']
})
export class UploadedFileListComponent implements OnInit {

  uploadFileList : any;

  display : string = 'none';
  ModalTitle="File Upload";

  constructor(private service:DataLoaderPortalService) { }

  ngOnInit(): void {
    this.loadUploadFileList();
  }

  loadUploadFileList(){
    this.service.FileUploadList().subscribe( 
      response => {this.uploadFileList  = response;}
    );
   }
   onCloseHandled() {
    this.display = "none";
  }

  OpenFileUpload(){
    this.display = "block";
  }

}
