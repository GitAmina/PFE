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
  dtoptions : DataTables.Settings = {};
  dttrigger : Subject<any> = new Subject<any>();

  constructor(private stageservice : Stageservice) {

  }

  ngOnInit(): void {
    this.ChargerStages();
    this.dtoptions = {
      pagingType : 'full_numbers',
      lengthMenu : [5, 10, 20, 30, 40, 50],
      ordering : true,
      pageLength : 5,
    };
  }

  ChargerStages() {
    this.stageservice.listeStage().subscribe(data => {
      console.log(data);
      this.stages = data._embedded.stages;

      this.chargerServicesEtStagiaires();

      console.log('Nombre d\'entrées:', this.stages.length);

      this.dttrigger.next(this.stages);
      
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
