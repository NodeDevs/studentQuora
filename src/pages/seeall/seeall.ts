import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the SeeallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seeall',
  templateUrl: 'seeall.html',
})
export class SeeallPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite) {
  }

  question = [];
  
  ionViewDidLoad() {
    this.getData();
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS questions(rowid INTEGER PRIMARY KEY, date TEXT, course TEXT, unit TEXT, body INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM questions WHERE rowid', {})
      .then(res => {
        this.question = [];
        for(var i=0; i<res.rows.length; i++) {
          this.question.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date, course:res.rows.item(i).course,unit:res.rows.item(i).unit,body:res.rows.item(i).body})
        }
        console.log('executed');
      })
      .catch(e => console.log(e));
      // db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
      // .then(res => {
      //   if(res.rows.length>0) {
      //     this.totalIncome = parseInt(res.rows.item(0).totalIncome);
      //     this.balance = this.totalIncome-this.totalExpense;
      //   }
      // })
      // .catch(e => console.log(e));
      // db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
      // .then(res => {
      //   if(res.rows.length>0) {
      //     this.totalExpense = parseInt(res.rows.item(0).totalExpense);
      //     this.balance = this.totalIncome-this.totalExpense;
      //   }
      // })
    }).catch(e => console.log(e));
  }

}
