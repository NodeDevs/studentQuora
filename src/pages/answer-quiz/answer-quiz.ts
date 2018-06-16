import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the AnswerQuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-quiz',
  templateUrl: 'answer-quiz.html',
})
export class AnswerQuizPage {

  data = {date:"",body:""};
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite:SQLite,private toast:Toast) {
    this.queryRow();
  }

  ionViewDidLoad() {
    this.queryRow();
  }


  ionViewWillEnter(){
    this.queryRow();
  }

  question = [];

  queryRow(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS answers(rowid INTEGER PRIMARY KEY,date Text,body TEXT)', {})
      .then(res => console.log('Executed SQL for answers'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM answers ORDER BY rowid DESC', {})
      .then(res => {
        this.question = [];
        console.log('select statement executed for answers');
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

  saveAnswer(){
    console.log('start of the save');
    this.sqlite.create({
      name:'ionicdb.db',
       location:'default'
     }).then((db:SQLiteObject)=>{
       console.log('sqliteobject executed');
       db.executeSql('INSERT INTO answers VALUES(NULL,?,?)',[this.data.date,this.data.body])
       .then(res => {
        console.log("here is the point");
        console.log('data inserted');
         this.toast.show('Data saved','5000','center').subscribe(
           toast=>{
            this.navCtrl.pop();
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
