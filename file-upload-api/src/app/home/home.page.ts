import { Component } from "@angular/core";
import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { Event } from '@angular/router';
import { NgForm } from '@angular/forms';

const { Filesystem } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})

export class HomePage {
  text = "default text";
  constructor() { }


  
  async testFunction() {
    this.text = FilesystemDirectory.ExternalStorage + "Download/bitcoin.pdf";

    let contents = await Filesystem.readFile({
      path: "Download/TestFile.pdf",
      directory: FilesystemDirectory.ExternalStorage
    });

    const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }
    let blob = b64toBlob(contents.data, 'application/pdf')

    var formData = new FormData();
    formData.append("files", blob, "bitcoin.pdf");
    try {
      const response = await fetch("https://localhost:5001/FileUploadBuffer", {
        method: "POST",
        body: formData,
      });
      this.text = "Result: " + response.status + " " + response.statusText;
    } catch (error) {
      console.log("Error:", error);
    }
  }



  // Micorsoft docs
  async AJAXSubmitBuffer() {
    let form = document.getElementById("formUploadBuffer") as HTMLFormElement;
    let output = document.querySelector(
      '#formUploadBuffer output[name="result"]'
    ) as HTMLOutputElement;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/";
      }
      output.value = "Result: " + response.status + " " + response.statusText;
    } catch (error) {
      console.log("Error:", error);
    }
    console.log("Microsoft Docs File Upload Js function end");
  }



  async AJAXSubmitStream(oFormElement) {
    let form = document.getElementById("formUploadStream") as HTMLFormElement;
    let output = document.querySelector(
      '#formUploadStream output[name="result"]'
    ) as HTMLOutputElement;

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'RequestVerificationToken': this.getCookie('RequestVerificationToken')
        },
        body: formData
      });
      output.value = 'Result: ' + response.status + ' ' + response.statusText;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
}
