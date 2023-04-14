import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParameterCodec,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../shared/components/file-upload/file-upload.component';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl = `${environment.baseUrl}/fileupload/`;
  // handleError:HandleError;

  constructor(
    private http: HttpClient //  private httpErrorHandler:HttpErrorHandler
  ) {}

  // uploadFile(file: FormData): Observable<any> {
  //   // const formData = new FormData();
  //   // formData.append('file', file);
  //   return this.http
  //     .post(this.generateFullApiUrl('upload'), file, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(
  //       tap((res) => console.log('MH: ', res)),
  //       map((event) => this.getEventMessage(event))
  //       // catchError(this.handleError('fileUpload',null))
  //     );
  // }

  fileUpload(data: FileUpload[]) {
    const files = data.map((o) => o.data);
    let __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __headers.append('Content-Type', 'multipart/form-data');
    const __formData = new FormData();

    console.log('MH files: ', files);

    if (files !== null && typeof files !== 'undefined') {
      for (let i = 0; i < files.length; i++) {
        __formData.append('files', files[i]);
        console.log('MH files[i]: ', files[i]);
        // __formData.append('file', files[i] as string | Blob);
      }
    }

    __body = __formData;

    console.log('MH __body: ', __body);
    const req = new HttpRequest<any>('POST', this.baseUrl + `upload`, __body, {
      headers: __headers,
      // headers: undefined,
      params: __params,
      responseType: 'json',
      reportProgress: true,
    });

    return this.http.request<any>(req);

    // return this.http
    //   .post(`${this.baseUrl}upload`, formData, {
    //     reportProgress: true,
    //     observe: 'events',
    //   })
    //   .pipe(
    //     // first(),
    //     tap((res) => console.log('MH result: ', res)),
    //     map((event) => this.getEventMessage(event))
    //     // catchError(this.handleError('fileUpload',null))
    //   );
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round((100 * event.loaded) / event.total);
    return { progress: percentDone, files: [] };
  }

  private generateFullApiUrl(apiUrl: string): string {
    return this.baseUrl + apiUrl;
  }

  protected newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC,
    });
  }
}

class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

const PARAMETER_CODEC = new ParameterCodec();
