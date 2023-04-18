import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './shared/components/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFilesizeModule } from 'ngx-filesize';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AppComponent, FileUploadComponent, FileUploadDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    NgxFileDropModule,
    HttpClientModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxFilesizeModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
