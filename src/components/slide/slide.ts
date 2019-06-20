import { Component, ViewChild, OnInit } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent implements OnInit{

   @ViewChild(Slides) slides: Slides;
  text: string;

  constructor() {
    console.log('Hello SlideComponent Component');
    this.text = 'Hello World';
  }

   ngOnInit(): void {
  
   }
  
}
