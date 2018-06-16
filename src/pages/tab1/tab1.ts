import { SeeallPage } from './../seeall/seeall';
import { AnswerQuizPage } from './../answer-quiz/answer-quiz';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  question: any = [];
  unit:string;
  course:string;
  body:string;
  data:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  
  }

  addQuiz(){
    this.navCtrl.setRoot('AskPage');
  }

  ionViewWillEnter(){
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
      db.executeSql('SELECT * FROM questions ORDER BY rowid DESC', {})
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

  

  answerQuiz(rowId){
  this.navCtrl.push(AnswerQuizPage);
  }
  seeAll(rowId){
    this.navCtrl.push(SeeallPage,{id:rowId});
  }  
}
