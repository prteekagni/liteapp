import { Component } from "@angular/core";

@Component({
  selector: "singleadd",
  templateUrl: "singleadd.html"
})
export class SingleaddComponent {
  text: string;

  singleLength: number = 5;
  show:number = 2;
  constructor() {
   
  }
}
