import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  text = "default text";
  constructor() {}

  testFunction() {
    this.text = "Change JK";
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob: Blob = new Blob([
        new Uint8Array(reader.result as ArrayBuffer),
      ]);

      const blobURL: string = URL.createObjectURL(blob);
    };
    console.log("Said something");
  }

  jsFileFetch() {
    console.log("called");
    const myForm = document.getElementById("myForm");
    const inpFile = document.getElementById("inpFile") as HTMLInputElement;

    const endpoint = "upload.php";
    const formData = new FormData();
    console.log(inpFile.files);
    formData.append("inpFile", inpFile.files[0]);

    fetch("url", {
      method: "post",
      body: formData,
    }).catch(console.error);
  }


  // Micorsoft docs 
  async AJAXSubmit() {
    
    var form = document.getElementById("formUpload") as HTMLFormElement;
    var output = document.querySelector("#formUpload output[name=\"result\"]") as HTMLOutputElement;

    const formData = new FormData(form);

    try{
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': 'https://localhost:5001'
        },
        body: formData
      });

      if(response.ok) {
        window.location.href = '/';
      }

      output.value = 'Result: ' + response.status + ' ' + response.statusText;
    } catch (error) {
      console.log('Error:', error);
    }
    console.log("Microsoft Docs File Upload Js function end");
  }
}
