import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss'],
})
export class FileUploadDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>) {}

  ngOnInit() {
    console.log('FileUploadDialogComponent initialized.');
  }
}
