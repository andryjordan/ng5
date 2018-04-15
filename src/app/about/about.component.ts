import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  goals: any;

  constructor(private route: ActivatedRoute, private router:Router, private _data: DataService) { //untuk console parameter bisa dilihat di browser ctrl+shift+i
    this.route.params.subscribe(res => console.log(res.id));
   }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.router.navigate([''])  // kosong karena lokasi path home pada app-routing.module adalah ''
  }
}
