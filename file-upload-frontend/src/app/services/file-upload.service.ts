import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../shared/models/file-upload.model';
import { FileUploadStatus } from '../shared/types/file-upload-status.type';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl = `${environment.baseUrl}/fileupload/`;

  constructor(private http: HttpClient) {}

  uploadFile(data: FileUpload) {
    const file = data.data;
    const __headers = new HttpHeaders();
    __headers.append('Content-Type', 'multipart/form-data');
    let __body: any = null;
    const __formData = new FormData();

    if (file !== null && typeof file !== 'undefined') {
      __formData.append('file', file);
    }

    __body = __formData;

    return this.http
      .post<any>(this.generateFullApiUrl('upload'), __body, {
        headers: __headers,
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            data.progress = this.fileUploadProgress(event);
          } else if (
            event.type === HttpEventType.Response ||
            event instanceof Response
          ) {
            data.status = FileUploadStatus.Completed;
          }
        }),
        catchError((error) => {
          data.status = FileUploadStatus.Failed;
          data.error = error;

          return of();
        })
      );
  }

  private fileUploadProgress(event: any) {
    return Math.round((100 * event.loaded) / event.total);
  }

  private generateFullApiUrl(apiUrl: string): string {
    return this.baseUrl + apiUrl;
  }
}
