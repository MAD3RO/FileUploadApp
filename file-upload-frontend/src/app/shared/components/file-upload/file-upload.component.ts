import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { FileUpload } from '../../models/file-upload.model';
import { FileUploadStatus } from '../../types/file-upload-status.type';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef(null);

  get allFailed() {
    return this.files.every((file) => file.status === FileUploadStatus.Failed);
  }
  files: FileUpload[] = [];
  isActive = false;
  importing = false;
  showAllFailedDiv = true;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    console.log('FileUploadComponent initialized.');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    this.resetSetup();

    const files = <any>event?.dataTransfer?.files;
    if (files?.length > 0) {
      this.onDroppedFile(files);
    }
  }

  onDroppedFile(droppedFiles: any[]) {
    if (!droppedFiles.length) return;

    for (let i = 0; i < droppedFiles.length; i++) {
      const file = new FileUpload(droppedFiles[i]);
      this.files.push(file);
    }
  }

  onImport() {
    this.importing = true;
    this.resetSetup();
    this.uploadFiles();
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
  }

  retryUpload(file: FileUpload) {
    file.progress = 0;
    file.status = FileUploadStatus.Pending;
    this.uploadFile(file);
  }

  retryAll() {
    this.files.forEach((file) => {
      if (file.status === FileUploadStatus.Failed) {
        file.progress = 0;
        file.status = FileUploadStatus.Pending;
        this.uploadFile(file);
      }
    });
  }

  removeFile(file: FileUpload) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }

    if (this.files.length === 0) {
      this.importing = false;
    }
  }

  getProgressBarColor(file: FileUpload): string {
    switch (file.status) {
      case FileUploadStatus.Pending:
        return 'accent';
      case FileUploadStatus.Uploading:
      case FileUploadStatus.Completed:
        return 'primary';
      case FileUploadStatus.Failed:
        return 'warn';
      default:
        return 'primary';
    }
  }

  hideAllFailedDiv() {
    this.showAllFailedDiv = false;
  }

  private uploadFile(file: FileUpload) {
    this.fileUploadService.uploadFile(file).subscribe();
  }

  private uploadFiles() {
    this.files.forEach((file) => {
      file.status = FileUploadStatus.Uploading;
      this.uploadFile(file);
    });
  }

  private resetSetup() {
    this.showAllFailedDiv = true;
  }
}
