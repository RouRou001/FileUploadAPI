import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-upload',
  templateUrl: './large-upload.page.html',
  styleUrls: ['./large-upload.page.scss'],
})
export class LargeUploadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chuckUploadUrl: string;

  async streamUpload() {
    console.log("Start POST Stream");

    let form = document.getElementById("uploadStreamFrm") as HTMLFormElement;
    let output = document.querySelector(
      '#uploadStreamFrm output[name="result"]'
    ) as HTMLOutputElement;

    const formData = new FormData(form);
    console.log(formData);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("POST Stream Success");
      }
      output.value = "Result: " + response.status + " " + response.statusText;
    } catch (error) {
      console.log("Error:", error);
    }

    console.log("End POST Stream");

  }
}
