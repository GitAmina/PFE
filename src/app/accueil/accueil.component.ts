import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit{

  nombreStagesDirectionsTempsChart: any;

  data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    datasets: [
      {
        label: "Direction des technoilogies de l'information ",
        data: [10, 15, 20, 25,, 50, 55, 60, 65, 30, 35, 40, 45], // Exemple de données factices
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Direction des ressources humaines',
        data: [15, 20, 25, 30, 55, 60, 65, 70, 35, 40, 45, 50], // Exemple de données factices
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Direction des laboratoires',
        data: [20, 25, 30, 35,60, 65, 70, 75, 40, 45, 50, 55], // Exemple de données factices
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Direction Adminitrative',
        data: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80], // Exemple de données factices
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };


  constructor() { }

  ngOnInit(): void {
    this.drawNombreStagiairesChart();
    this.drawStagesEnCoursEtEchusChart();
    this.initNombreStagesDirectionsTempsChart();
  }

  drawNombreStagiairesChart(): void {
    const ctx = document.getElementById('nombreStagiairesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Nombre de stagiaires',
          data: [12, 19, 3, 5, 2, 30, 47, 59, 55, 5, 2, 3],
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  }

  drawStagesEnCoursEtEchusChart(): void {
    const ctx = document.getElementById('stagesEnCoursEtEchusChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['En cours', 'Echus', 'A venir'],
        datasets: [{
          data: [52, 57, 18],
          backgroundColor: ['green', 'red', 'blue'],
        }]
      }
    });
  }

  initNombreStagesDirectionsTempsChart() {
    // Récupération du contexte du canvas dans lequel le graphique sera dessiné
    const ctx = document.getElementById('nombreStagesDirectionsTempsChart') as HTMLCanvasElement;
    // Création du graphique
    this.nombreStagesDirectionsTempsChart = new Chart(ctx, {
      type: 'bar', // Type de graphique (ici, un graphique à barres groupées)
      data: this.data, // Données à afficher dans le graphique
      options: {
        scales: {
          x: { stacked: true }, // Empile les barres horizontalement
          y: { stacked: true } // Empile les barres verticalement
        }
      }
    });
  }
}
