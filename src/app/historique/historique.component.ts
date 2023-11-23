import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LesServicesservice } from '../services/Lesservice.service';
import { Historique } from '../model/historique.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: []
})
export class HistoriqueComponent implements OnInit{

  historiques! : Historique[];
  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject<any>();

  constructor (private lesservices : LesServicesservice) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType : 'full_numbers',
      paging : true,
      lengthMenu : [5, 10, 20, 30, 40, 50],
      ordering : true,
      pageLength : 5,
    };

    this.ChargerService(); 
  
  }

  ChargerService () {
    this.lesservices.listeHisto().subscribe(data => {
      console.log(data);
      this.historiques = data._embedded.historiques;
      console.log('Nombre d\'entrées:', this.historiques.length);
      this.dtTrigger.next(null);
    });
  }

}