import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from "@angular/animations";
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
        transition('* => *',[
          query(':enter', style({ opacity:0 }), {optional: true}),

          query(':enter', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity:0, transform: 'translateY(-75%)', offset: 0}),
              style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
              style({opacity:1, transform: 'translateY(0)', offset: 1}),
            ]))]), {optional: true}),
            //saat di click tulisannya menghilang
            query(':leave', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity:1, transform: 'translateY(0)', offset: 0}),
                style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
                style({opacity:0, transform: 'translateY(-75%)', offset: 1}),
              ]))]), {optional: true})
        ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  //Learn Interpolation
  itemCount : number;
  btnText: string = "Add an Item";
  goalText : string = "My First Life Goal";
  // awal goals= ['My First Life Goal', 'I Want to climb a mountain', 'Go ice skating'];
  goals=[]

  constructor(private _data: DataService) { }

  ngOnInit() {
    // inisiasi jika app load / berjalan auto
    this._data.goal.subscribe(res => this.goals = res); // res : response
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals); // for add, updata and change goal property
  }
  
  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount =this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i){
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);

  }
}
