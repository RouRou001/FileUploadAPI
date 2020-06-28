import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = 'default text';
  constructor() {}

  onChangeText() {
    this.text = 'Change JK';
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

      const blobURL: string = URL.createObjectURL(blob);
    };
    console.log('Said something');
  }
}
