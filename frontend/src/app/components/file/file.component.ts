import { FileService } from './../../services/file.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  filenames: string[] = [];
  fileStatus = {status: "", requestType: "", precent: 0};

  constructor(private file: FileService) { }

  ngOnInit(): void {
  }

  // define function to upload file
  uploadFile(files: File[]){
    const formData = new FormData();
    for(const file of files){
      formData.append('files', file, file.name);
    }
    this.file.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportprogress(event);
      },
      (error: HttpErrorResponse) => console.log(error),
    );
  }

  // define function to download file
  downloadFile(fileName: string): void{
    this.file.download(fileName).subscribe(
      event => {
        console.log(event);
        this.reportprogress(event);
      },
      (error: HttpErrorResponse) => console.log(error),
    );
  }

  reportprogress(httpEvent: HttpEvent<string[] | Blob>): void{
    // throw new Error('Method not implemented.');
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.uploadSatus(httpEvent.loaded, httpEvent.total, "Uploading");
        break;
      case HttpEventType.DownloadProgress:
        this.uploadSatus(httpEvent.loaded, httpEvent.total, "Downloading");
        break;
      case HttpEventType.ResponseHeader:
        console.log("Response Header", httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          for(const file of httpEvent.body){
            this.fileStatus.status = 'done';
            this.file.unshift(file);
          }
        }else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, {type:`${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        // console.log(this.fileStatus.status);

        break;
      default:
        console.log(httpEvent);

    }
  }
  uploadSatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.precent = Math.round((loaded / total!) * 100);
  }

}
