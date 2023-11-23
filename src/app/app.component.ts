import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "style.css" ]
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';

  ngOnInit(){
    $(document).ready(function () {
      $('.dropdown-toggle').dropdown();
    });
  }

  constructor(public router: Router) {}
}
