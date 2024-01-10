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
  page : number = 0;
  totalLength : any;

  constructor (private lesservices : LesServicesservice) {

  }

  ngOnInit(): void {
    this.ChargerService(); 
  
  }

  ChargerService () {
    this.lesservices.listeHisto().subscribe(data => {
      console.log(data);
      this.historiques = data._embedded.historiques;
      console.log('Nombre d\'entrées:', this.historiques.length);
    });
  }

}