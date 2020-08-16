import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tus from "tus-js-client";

@Component({
  selector: 'app-tusdotnet',
  templateUrl: './tusdotnet.page.html',
  styleUrls: ['./tusdotnet.page.scss'],
})
export class TusdotnetPage implements OnInit, AfterViewInit {
  upload: any = null;
  uploadIsRunning = false;
  @ViewChild('toggleBtn') toggleBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('fileInput') input: ElementRef<HTMLInputElement>;
  @ViewChild('progress') progress: ElementRef<HTMLDivElement>;
  @ViewChild('bar') progressBar: ElementRef<HTMLDivElement>;
  @ViewChild('supportAlert') alertBox: ElementRef<HTMLDivElement>;
  @ViewChild('uploadList') uploadList: ElementRef<HTMLParagraphElement>;
  @ViewChild('chunksize') chunkInput: ElementRef<HTMLInputElement>;
  @ViewChild('paralleluploads') parallelInput: ElementRef<HTMLInputElement>;
  @ViewChild('endpoint') endpointInput: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    if (!tus.isSupported) {
      this.alertBox.nativeElement.classList.remove("hidden");
    }
  }

  onToggle(e):void{
    e.preventDefault();
    
      if(this.upload)
      {
        console.log("ok");
      }

      if (this.upload) {
        if (this.uploadIsRunning) {
          this.upload.abort();
          this.toggleBtn.nativeElement.textContent = "resume upload";
          this.uploadIsRunning = false;
        } else {
          this.upload.start();
          this.toggleBtn.nativeElement.textContent = "pause upload";
          this.uploadIsRunning = true;
        }
      } else {

        console.log(this.input);
        console.log(this.input.nativeElement.files);
        if (this.input.nativeElement.files.length > 0) {
          this.startUpload();
        } else {
          this.input.nativeElement.click();
        }
      }
  }

  startUpload():void {
    var file = this.input.nativeElement.files[0];
    // Only continue if a file has actually been selected.
    // IE will trigger a change event even if we reset the input element
    // using reset() and we do not want to blow up later.
    if (!file) {
      return;
    }
  
    var headers =  {
      "Authorization": "Bearer ...",
      "User":"abc"
    }

    var endpoint = this.endpointInput.nativeElement.value;
    var chunkSize = parseInt(this.chunkInput.nativeElement.value, 10);
    if (isNaN(chunkSize)) {
      chunkSize = Infinity;
    }
  
    var parallelUploads = parseInt(this.parallelInput.nativeElement.value, 10);
    if (isNaN(parallelUploads)) {
      parallelUploads = 1;
    }
  
    this.toggleBtn.nativeElement.textContent = "pause upload";
  
    var options = {
      endpoint: endpoint,
      chunkSize: chunkSize,
      retryDelays: [0, 1000, 3000, 5000],
      parallelUploads: parallelUploads,
      metadata: {
        filename: file.name,
        filetype: file.type
      },
      onError : this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess
    };
  
    this.upload = new tus.Upload(file, options);
    this.upload.findPreviousUploads().then((previousUploads) => {
      this.askToResumeUpload(previousUploads, this.upload);
  
      this.upload.start();
      this.uploadIsRunning = true;
    });
  
  }


  reset(): void {
    this.input.nativeElement.value = "";
    this.toggleBtn.nativeElement.textContent = "start upload";
    this.upload = null;
    this.uploadIsRunning = false;
  }


  askToResumeUpload(previousUploads, upload): void {
    if (previousUploads.length === 0) return;

    let text = "You tried to upload this file previously at these times:\n\n";
    previousUploads.forEach((previousUpload, index) => {
      text += "[" + index + "] " + previousUpload.creationTime + "\n";
    });
    text += "\nEnter the corresponding number to resume an upload or press Cancel to start a new upload";

    const answer = prompt(text);
    const index = parseInt(answer, 10);

    if (!isNaN(index) && previousUploads[index]) {
      upload.resumeFromPreviousUpload(previousUploads[index]);
    }
  }

  onError(error): void {
    if (error.originalRequest) {
      if (window.confirm("Failed because: " + error + "\nDo you want to retry?")) {
        this.upload.start();
        this.uploadIsRunning = true;
        return;
      }
    } else {
      window.alert("Failed because: " + error);
    }

    this.reset();
  }

  onProgress(bytesUploaded, bytesTotal): void {
    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    this.progressBar.nativeElement.style.width = percentage + "%";
    console.log(bytesUploaded, bytesTotal, percentage + "%");
  }

  onSuccess(): void {
    var anchor = document.createElement("a");
    anchor.textContent = "Download " + this.upload.file.name + " (" + this.upload.file.size + " bytes)";
    anchor.href = this.upload.url;
    anchor.className = "btn btn-success";
    this.uploadList.nativeElement.appendChild(anchor);

    this.reset();
  }

}
