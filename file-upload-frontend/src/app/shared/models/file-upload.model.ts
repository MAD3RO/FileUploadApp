import { FileUploadStatus } from '../types/file-upload-status.type';

export class FileUpload {
  public data: File;
  public name: string;
  public error: string = '';
  public progress = 0;
  public size = 0;
  public status: string = FileUploadStatus.Pending;

  constructor(file: File) {
    this.data = file;
    this.name = file.name;
    this.size = file.size;
  }
}
