import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss'],
})
export class FileUploadDialogComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: any;

  // files: any[] = [];
  public files: FileUpload[] = [];
  public allFailed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('FileUploadDialogComponent initialized.');
  }

  // dropped(files: NgxFileDropEntry[]) {
  //   for (const droppedFile of files) {
  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);

  //         // You could upload it like this:
  //         const formData = new FormData();
  //         formData.append('files', file, droppedFile.relativePath);

  //         this.http
  //           .post('/fileupload/upload', formData, {
  //             reportProgress: true,
  //             observe: 'events',
  //           })
  //           .subscribe((event) => {
  //             if (event.type === HttpEventType.UploadProgress) {
  //               console.log(
  //                 'Upload progress: '
  //                 // Math.round((event.loaded / event.total) * 100)
  //               );
  //             } else if (event.type === HttpEventType.Response) {
  //               console.log('Response: ', event.body);
  //             }
  //           });
  //       });
  //     } else {
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  // fileOver(event: any) {
  //   console.log(event);
  // }

  // fileLeave(event: any) {
  //   console.log(event);
  // }

  // onFileSelect(event: any) {
  //   const files = event.target.files;
  //   for (const file of files) {
  //     const formData = new FormData();
  //     formData.append('files', file, file.name);

  //     this.http
  //       .post('/fileupload/upload', formData, {
  //         reportProgress: true,
  //         observe: 'events',
  //       })
  //       .subscribe((event) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           console.log(
  //             'Upload progress: '
  //             // Math.round((event.loaded / event.total) * 100)
  //           );
  //         } else if (event.type === HttpEventType.Response) {
  //           console.log('Response: ', event.body);
  //         }
  //       });
  //   }
  // }

  // clearFiles() {
  //   this.files = [];
  // }

  // public onFileDropped(files: NgxFileDropEntry[]) {
  //   for (const droppedFile of files) {
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: any) => {
  //         const uploadFile = new FileUpload(file);
  //         this.files.push(uploadFile);
  //         this.uploadFile(uploadFile);
  //       });
  //     }
  //   }
  // }

  // public retry(file: FileUpload) {
  //   file.progress = 0;
  //   file.status = 'Pending';
  //   this.uploadFile(file);
  // }

  // public retryAll() {
  //   this.allFailed = false;
  //   this.files.forEach((file) => {
  //     if (file.status === 'Error') {
  //       file.progress = 0;
  //       file.status = 'Pending';
  //       this.uploadFile(file);
  //     }
  //   });
  // }

  // private uploadFile(file: FileUpload) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);

  //   this.http
  //     .post('/api/upload', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .subscribe(
  //       (event) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           // const progress = Math.round((100 * event.loaded) / event.total);
  //           // file.progress = progress;
  //         } else if (event.type === HttpEventType.Response) {
  //           file.status = 'Done';
  //         }
  //       },
  //       (error) => {
  //         file.status = 'Error';
  //         this.allFailed = this.files.every((file) => file.status === 'Error');
  //       }
  //     );
  // }
}

class FileUpload {
  public data: File;
  public name: string;
  public progress: number = 0;
  public status: string = 'Pending';

  constructor(file: File) {
    this.data = file;
    this.name = file.name;
  }
}
