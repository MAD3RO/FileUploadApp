import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UploadResponse } from '../../models/upload-response';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: any;
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef(null);

  files: FileUpload[] = [];

  uploadResponse: UploadResponse = { progress: 0, files: [] };
  isActive = false;
  // files: any[] = [];
  public allFailed = false;

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    console.log('FileUploadComponent initialized.');
  }

  // onDragOver(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isActive = true;
  // }

  // onDragLeave(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isActive = false;
  // }

  // onDrop(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.isActive = false;
  //   let droppedFiles = event.dataTransfer.files;
  //   if (droppedFiles.length > 0) {
  //     this.onDroppedFile(droppedFiles);
  //   }
  // }

  // onSelectedFile(event: any) {
  //   let selectedFiles = event.target.files;
  //   if (selectedFiles.length > 0) {
  //     this.onDroppedFile(selectedFiles);
  //   }
  // }

  // onDroppedFile(droppedFiles: any) {
  //   let formData = new FormData();
  //   for (let item of droppedFiles) {
  //     // formData.append('userFiles', item.file, item.relativePath);
  //     formData.append('userFiles', item.file);
  //   }

  //   this.fileUploadService.fileUpload(formData).subscribe((result) => {
  //     this.uploadResponse = result;
  //     console.log('result: ', result);
  //   });
  // }

  // ----------------------------- VER. 2 -----------------------------

  onDrop(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
    this.isActive = false;

    const files = <any>event?.dataTransfer?.files;
    if (files?.length > 0) {
      this.onDroppedFile(files);
    }
  }

  onDroppedFile(droppedFiles: any) {
    if (!droppedFiles.length) return;

    for (let i = 0; i < droppedFiles.length; i++) {
      const file = new FileUpload(droppedFiles[i]);
      this.files.push(file);
    }

    this.uploadFiles();
  }

  uploadFiles() {
    this.fileUploadService.fileUpload(this.files).subscribe((result) => {
      // this.uploadResponse = result;
      console.log('result: ', result);
    });
  }

  onClick() {
    this.fileInput.nativeElement.click();
  }

  fileOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }

  fileLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (!files.length) return;

    for (let i = 0; i < files.length; i++) {
      const file = new FileUpload(files[i]);
      this.files.push(file);
    }

    this.uploadFiles();
  }

  // onFileSelect(event: any) {
  //   const files = event.target.files;

  //   if (!files.length) return;
  //   this.uploadFiles(files);
  // }

  clearFiles() {
    this.files = [];
  }

  // onFileDropped(files: NgxFileDropEntry[]) {
  //   for (const droppedFile of files) {
  //     if (droppedFile.fileEntry?.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: any) => {
  //         const uploadFile = new FileUpload(file);
  //         this.files.push(uploadFile);
  //         this.uploadFile(uploadFile);
  //       });
  //     }
  //   }
  // }

  // retry(file: FileUpload) {
  //   file.progress = 0;
  //   file.status = 'Pending';
  //   this.uploadFile(file);
  // }

  // retryAll() {
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

export class FileUpload {
  public data: File;
  public name: string;
  public progress = 0;
  public size = 0;
  public status: string = 'Pending';

  constructor(file: File) {
    this.data = file;
    this.name = file.name;
    this.size = file.size;
  }
}
