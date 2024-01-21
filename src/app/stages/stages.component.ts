import { Component, OnInit } from '@angular/core';
import { Stage } from '../model/stage.model';
import { Stagiaire } from '../model/stagiaire.model';
import { Service } from '../model/service.model';
import { Stageservice } from '../services/stage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})

export class StagesComponent implements OnInit{
  stagiaire! : Stagiaire;
  // stages! : Stage[];
  stage! : Stage;
  message : string = '';
  page : number = 0;
  totalLength : any;


  constructor(private stageservice : Stageservice) {

  }

  ngOnInit(): void {
    this.ChargerStages();
  }

  getEtat(stage: Stage): string {
    const today = new Date();
    const dateDebut = new Date(stage.datedebut);
    const dateFin = new Date(stage.datefin);

    if (today < dateDebut) {
        return 'A venir';
    }
    else if (today >= dateDebut && today <= dateFin) {
        return 'En cours';
    }
    else {
        return 'Echus';
    }
  }

  ChargerStages() {
    this.stageservice.listeStage().subscribe(data => {
      console.log(data);
      this.stages = data._embedded.stages;

      this.chargerServicesEtStagiaires();

      console.log('Nombre d\'entrées:', this.stages.length);
      
    })
  }

  stages: Stage[] = [];

  chargerServicesEtStagiaires() {
    for (const stage of this.stages) {
      this.stageservice.getServicesByStage(stage.uio).subscribe(service => {
        stage.service = service;
      });

      this.stageservice.getStagiaireByStage(stage.uio).subscribe(stagiaire => {
        stage.stagiaire = stagiaire;
      });
    }
  }

}
