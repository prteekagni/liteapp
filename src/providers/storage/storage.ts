import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { deals } from "../../models/deal";
import { adjustRendered } from "ionic-angular/umd/components/virtual-scroll/virtual-util";

const DEALS_KEY = "deals";
const N_KEY = "notifications";
const P_KEY = "pushNotifications";
const I_KEY = "images";

@Injectable()
export class StorageProvider {
  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello StorageProvider Provider");
  }

  addDeals(item: deals): Promise<any> {
    return this.storage.get(DEALS_KEY).then((items: deals[]) => {
      if (items) {
        if (items.find(x => x.id === item.id)) {
          return false;
        } else {
          items.push(item);
          this.storage.set(DEALS_KEY, items);
          return true;
        }
      } else {
      }
    });
  }

  addImages(data: any): Promise<any> {
    console.log(data);
    return this.storage.get(I_KEY).then((res: any) => {
      if (res) {
        if (res.find(x => x.id === res.id)) {
          return false;
        } else {
          res.push(data);
          this.storage.set(I_KEY, res);
        }
      } else {
        this.storage.set(DEALS_KEY, [data]);
        return true;
      }
    });
  }
  // READ
  getDeals(): Promise<deals[]> {
    return this.storage.get(DEALS_KEY);
  }

  getImages(): Promise<any[]> {
    return this.storage.get(I_KEY);
  }

  removeImages(): Promise<any> {
    return this.storage.set(I_KEY, []);
  }

  deleteDeals(id: number): Promise<deals> {
    return this.storage.get(DEALS_KEY).then((items: deals[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: deals[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(DEALS_KEY, toKeep);
    });
  }

  addNotification(item: any): Promise<any> {
    return this.storage.get(N_KEY).then(items => {
      if (items) {
        if (items.find(x => x.id === item.id)) {
          return this.updateNotification(item).then(res => {
            return true;
          });
        } else {
          items.push(item);
          this.storage.set(N_KEY, items);
        }
      } else {
        this.storage.set(N_KEY, [item]);
      }
    });
  }

  getNotification(): Promise<any[]> {
    return this.storage.get(N_KEY);
  }

  updateNotification(item): Promise<any> {
    return this.storage.get(N_KEY).then((items: any[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
          this.storage.set(N_KEY, newItems);
        } else {
          newItems.push(i);
          this.storage.set(N_KEY, newItems);
        }
      }
      return true;
    });
  }

  savePushNotification(item): Promise<any> {
    return this.storage.get(P_KEY).then((items: deals[]) => {
      if (items) {
        items.push(item);
        this.storage.set(P_KEY, items);
        return true;
      } else {
        this.storage.set(P_KEY, [item]);
        return true;
      }
    });
  }

  removePushNotification(id: number): Promise<any> {
    return this.storage.get(P_KEY).then((items: deals[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: deals[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(DEALS_KEY, toKeep);
    });
  }

  getPushNotification(): Promise<any> {
    return this.storage.get(P_KEY);
  }
}
