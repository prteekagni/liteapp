import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SlideComponent } from './slide/slide';
import { CardslideComponent } from './cardslide/cardslide';
import { ShareComponent } from './share/share';
import { SingleaddComponent } from './singleadd/singleadd';
import { LoginComponent } from './login/login';
import { ProfileComponent } from './profile/profile';
import { SquareComponent } from './square/square';
import { CardlistComponent } from './cardlist/cardlist';
import { ActionsheetComponent } from './actionsheet/actionsheet';
import { CardgridComponent } from './cardgrid/cardgrid';
import { DealsgridComponent } from './dealsgrid/dealsgrid';
@NgModule({
	declarations: [
    SlideComponent,
    CardslideComponent,
    ShareComponent,
    SingleaddComponent,
    LoginComponent,
    ProfileComponent,
    SquareComponent,
    CardlistComponent,
    ActionsheetComponent,
    CardgridComponent,
    DealsgridComponent],
	imports: [IonicModule],
	exports: [
    SlideComponent,
    CardslideComponent,
    ShareComponent,
    SingleaddComponent,
    LoginComponent,
    ProfileComponent,
    SquareComponent,
    CardlistComponent,
    ActionsheetComponent,
    CardgridComponent,
    DealsgridComponent]
})
export class ComponentsModule {}
