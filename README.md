# FileUploadApp

This is a web application developed using Angular 15 and .NET Core 6. The application allows users to upload multiple files from their local disk or by dragging and dropping onto the modal. It also displays a progress bar for each file showing the upload status, and in case of failed upload, it provides an error notification with a 'Retry' button for each file. Additionally, it has a 'Retry all' button that appears when all files in the batch have failed to upload.

## Installation

 1. Clone the repository: git clone https://github.com/MAD3RO/FileUploadApp.git
 2. Install dependencies for the Angular application: cd FileUploadApp/file-upload-frontend && npm install
 3. Install dependencies for the .NET Core application: cd ../FileUploadApi && dotnet restore
 
## Running the Application
 
 1. Start the .NET Core application: cd ../FileUploadApi/FileUploadApi && dotnet run
 2. Start the Angular application: cd ../../file-upload-frontend && ng serve
 3. Navigate to http://localhost:4200/ in your browser.

## Backend
The application has a backend implemented in .NET Core 6 with a controller that receives files.

Swagger URL:
` https://localhost:7011/swagger/index.html `
