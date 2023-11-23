import { Component, OnInit } from '@angular/core';
import { Stagiaire } from '../model/stagiaire.model';
import { StagiaireService } from '../services/stagiaire.service';

@Component({
  selector: 'app-tableaudebord',
  templateUrl: './tableaudebord.component.html',
  styleUrls: ['./tableaudebord.component.css']
})
export class TableaudebordComponent  implements OnInit{

  stagiaires? : Stagiaire[];

  constructor(private stagiaireservice : StagiaireService) {
    
  }

  ngOnInit(): void {
    
  }

  // Diagramme en bar

  // public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels: string[] = ['Actif', 'En Cours', 'Échus'];
  // public barChartType: string = 'bar';
  // public barChartLegend: boolean = true;

  // public barChartData: any[] = [
  //   { data: [236, 236, 17], label: 'Nombre de Stagiaires' }
  // ];

}
