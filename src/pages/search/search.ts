import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DealsProvider } from "../../providers/deals/deals";
import { map } from "rxjs/operators";
import { SharedProvider } from "../../providers/shared/shared";
import { StorageProvider } from "../../providers/storage/storage";
import { trigger, transition, query, style, stagger, animate } from "@angular/animations";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html",
  animations: [
    trigger("photosAnimation", [
      transition("* => *", [
        query(".dealslist", style({ transform: "translateX(-100%)" }), {
          optional: true
        }),
        query(
          ".dealslist",
          stagger("100ms", [
            animate("500ms", style({ transform: "translateX(0)" }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class SearchPage {
  data;
  fromcategory;
  allitems: any = [];
  listitems;
  copylistitems;
  type;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dealService: DealsProvider,
    private sharedService: SharedProvider,
    private storageService: StorageProvider
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.type = this.navParams.get("type");
    //  this.sharedService.firebaseevent("screen_view", {
    //    Name: "SearchPage"
    //  });

    // this.sharedService.firebaseevent("searchPage", { Name: this.type });
    if (this.type == "stores") {
      this.data = this.navParams.get("data");
      this.allitems = this.data;
      // this.dealService
      //   .getAllStoresLink()
      //   .pipe(map((res: any) => res.filter((resp: any) => resp.isFav != true)))
      //   .subscribe((res: any) => {
      //     this.listitems = res;
      //     this.copylistitems = res;
      //   });
    }
    if (this.type == "deals") {
      this.dealService.getAllDeals().subscribe((res: any) => {
        this.data = res;
        //  this.copylistitems = res;
        this.allitems = this.data;
        console.log(this.allitems);
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
  }

  onInput(event) {
    const val = event.target.value;
    this.data = this.allitems;
    if (val && val.trim() != "") {
      if (this.type == "stores") {
        this.listitems = this.copylistitems;
        this.data = this.data.filter(item => {
          // this.sharedService.firebaseevent("serach_keyword", { Name: val });

          return item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        this.listitems = this.listitems.filter(item => {
          return item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      } else if (this.type == "deals") {
        this.data = this.data.filter(item => {
          // this.sharedService.firebaseevent("serach_keyword", { Name: val });

          return (
            item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            item.SubCategory.Name.toLowerCase().indexOf(val.toLowerCase()) >
              -1 ||
            item.Category.Name.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        });
      }
      this.fromcategory = true;
    } else {
      this.data = this.allitems;
      // this.listitems = this.copylistitems;
    }
  }

  onCancel(data) {
    this.data = this.allitems;
  }
  goToStore(data) {
    this.storageService.visitedStores(data).then((res: any) => {
      console.log(res);
    });
    this.sharedService.openBrowser(data);
  }

  getAllDeals(data) {
    console.log(data);
    this.navCtrl
      .push("StabsPage", {
        data: data
      })
      .then(
        res => {},
        err => {
          this.sharedService.createToast("Sorry !!");
        }
      );
  }
}
