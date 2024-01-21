import { LesServicesservice } from './../services/Lesservice.service';
import { Component, OnInit } from '@angular/core';
import { Badge } from '../model/badge.model';
import { Stage } from '../model/stage.model';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  // badges! : Badge[];
  badge! : Badge;
  page : number = 0;
  totalLength : any;

  constructor(private lesservices : LesServicesservice) {}

  ngOnInit(): void {
    this.ChargerBadge();
  }

  ChargerBadge () {
    this.lesservices.listeBadge().subscribe(data => {
      console.log(data);
      this.badges = data._embedded.badges;
      this.ChargerStage();
      console.log('Nombre d\'entrées:', this.badges.length);
    });
  }

  getEtat(stage: Stage | undefined): string {
    if (stage && stage.datedebut && stage.datefin) {
        const today = new Date();
        const dateDebut = new Date(stage.datedebut);
        const dateFin = new Date(stage.datefin);

        if (today < dateDebut) {
            return 'A venir';
        } else if (today >= dateDebut && today <= dateFin) {
            return 'En cours';
        } else {
            return 'Echu';
        }
    } else {
        return 'N/A'; // Ou une valeur par défaut si les propriétés ne sont pas définies
    }
  }

  badges : Badge[] = [];

  ChargerStage () {
    for (const badge of this.badges) {
      this.lesservices.getStageByBadge(badge.uio).subscribe(stage =>{
        badge.stage = stage;
      })
    }
  }
}


