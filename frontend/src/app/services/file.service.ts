import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  unshift(file: string) {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  // define function to upload file
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(this.apiUrl + 'file/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download file
  download(fileName: string): Observable<HttpEvent<Blob>> {
    return this.http.get(this.apiUrl + 'file/download/' + fileName, {
      reportProgress: true,
      responseType: 'blob',
      observe: 'events'
    });
  }
}
