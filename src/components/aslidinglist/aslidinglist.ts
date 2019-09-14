import { Component } from "@angular/core";

/**
 * Generated class for the AslidinglistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "aslidinglist",
  templateUrl: "aslidinglist.html"
})
export class AslidinglistComponent {
  text: string;
  store: any = [];
  constructor() {
    this.store = [
      {
        Name: "Men's Shopping",
        CatType: "1",
        id: "6BE73FBB-B1BF-48F9-856B-00AD284D0475"
      },
      {
        Name: "Food",
        CatType: "1",
        id: "A35E6898-A7C3-4961-B5D6-071B568498B2"
      },
      {
        Name: "Mobiles",
        CatType: "1",
        id: "A35E6798-A7C3-4961-B5D6-071B568498B2"
      },
      {
        Name: "Electronics",
        CatType: "1",
        id: "A35E6998-A7C3-4961-B5D6-071B568498B2"
      },

      {
        Name: "Gadgets",
        CatType: "1",
        id: "A28E6898-A7C3-4961-B5D6-071B568498B2"
      },

      {
        Name: "Travel",
        CatType: "1",
        id: "A35E6898-A7C3-4961-B5D6-078B568498B2"
      },
      {
        Name: "Headphones",
        CatType: "2",
        id: "A35E6898-A7C3-3961-B5D6-071B568498B2",
        CatPID: "A28E6898-A7C3-4961-B5D6-071B568498B2",
        Image: "http://elinfinitoindia.in/images/logo.png"
      },
      {
        Name: "Bands",
        CatType: "2",
        id: "A35E6008-A7C3-3961-B5D6-071B568498B2",
        CatPID: "A28E6898-A7C3-4961-B5D6-071B568498B2",
        Image: "http://elinfinitoindia.in/images/logo.png"
      },
      {
        Name: "Health Drinks",
        CatType: "2",
        id: "A35E6898-A7C3-3961-B5D6-071B56849992",
        CatPID: "A35E6898-A7C3-4961-B5D6-071B568498B2",
        Image: "http://elinfinitoindia.in/images/logo.png"
      }
    ];
  }
}
