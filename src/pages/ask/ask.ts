import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html',
})
export class AskPage {

data = {date:"",course:"",unit:"",body:""};
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,private toast: Toast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskPage');
  }

  saveData(){
    this.sqlite.create({
     name:'ionicdb.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('INSERT INTO questions VALUES(NULL,?,?,?,?)',[this.data.date,this.data.course,this.data.unit,this.data.body])
      .then(res => {
       console.log(res);
       console.log('data inserted');
        this.toast.show('Data saved','5000','center').subscribe(
          toast=>{
           this.navCtrl.popToRoot();
        }
        );
      });
     })
      .catch(e=>{
        console.log(e);
        this.toast.show(e,'5000','center').subscribe(
          toast => {
            console.log('failed');
            console.log(toast);
          }
        );
   
  });
  }

  

}
