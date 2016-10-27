import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  moduleId: module.id,
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.css']
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
