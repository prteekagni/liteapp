import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Slides, Item } from 'ionic-angular';


@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent implements OnInit{

   @ViewChild(Slides) slides: Slides;
  text: string;
  @Input() items;

  constructor() {
    console.log('Hello SlideComponent Component');
    this.text = 'Hello World';
  }

   ngOnInit(): void {
  
   }
  
}
