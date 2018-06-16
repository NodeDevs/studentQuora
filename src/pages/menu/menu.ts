import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';

export interface PageInterface{
    title:string;
    pageName:string;
    tabComponent?:any;
    index?:number;
    icon:string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav:Nav;

  pages: PageInterface[]=[
    {title:'Recent Feeds',pageName:'TabsPage',tabComponent:'Tab1Page',index:0,icon:'md-paper'},
    {title:'Notifications',pageName:'TabsPage',tabComponent:'Notifications',index:1,icon:'ios-notifications-outline'},
    {title:'Set Preferences',pageName:'TabsPage',tabComponent:'Tab2Page',index:1,icon:'md-cog'},
    {title:'About',pageName:'SpecialPage',icon:'md-help'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  openPage(page: PageInterface){
    let params = {};

    if(page.index){
      params = {tabIndex:page.index};
    }

    if(this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.getActiveChildNav().select(page.index);
    }else{
      this.nav.setRoot(page.pageName,params);
    }
  }
  isActive(page: PageInterface){
    let childNav = this.nav.getActiveChildNav();
    if(childNav){
      if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return 'primary';
      }
      return;
    }

    if(this.nav.getActive() && this.nav.getActive().name === page.pageName){
      return 'primary';
    }
  }
}
