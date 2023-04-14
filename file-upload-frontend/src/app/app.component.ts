import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './shared/components/dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'file-upload-app';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log('AppComponent initialized.');
  }

  openFileUploadDialog() {
    console.log('openFileUploadDialog()');

    this.dialog.open(FileUploadDialogComponent).afterClosed().subscribe();
  }
}
