import { Injectable } from '@angular/core';
import { Stagiaire } from '../model/stagiaire.model';
import { Stage } from '../model/stage.model';
import { Service } from '../model/service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapperStage } from '../model/WrappedStage.model';
import { WrapperService } from '../model/WrappedService.model';

const httpOptions = {
    headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
}

@Injectable({
  providedIn: 'root'
})

export class Stageservice {

    stageurl : string = 'http://localhost:8080/snim/stages';
    stageresturl : string = 'http://localhost:8080/snim/stage';
    serviceurl : string = 'http://localhost:8080/snim/lesservices';
    apiurl : string = 'http://localhost:8080/snim;';
    badgeurl : string = 'http://localhost:8080/snim/badges';

    stages! : Stage[];
    stage! : Stage;

    constructor (private http : HttpClient) {
        
    }

    listeStage () : Observable<WrapperStage> {
        return this.http.get<WrapperStage>(this.stageurl);
    }

    listeService () : Observable<WrapperService> {
        return this.http.get<WrapperService>(this.serviceurl);
    }

    getStagiaireById(stagiaireId: number): Observable<Stagiaire> {
        return this.http.get<Stagiaire>(`${this.apiurl}/stagiaires/${stagiaireId}`);
    }
    
    getServiceById(serviceId: number): Observable<Service> {
        return this.http.get<Service>(`${this.apiurl}/lesservices/${serviceId}`);
    }

    ajouterStage (s : Stage) :Observable<Stage> {
        return this.http.post<Stage>(this.stageresturl, s, httpOptions);
    }

    getServicesByStage(uio: number): Observable<Service> {
        const url = `${this.stageurl}/${uio}/service`;
        return this.http.get<Service>(url);
    }
      
    getStagiaireByStage(uio: number): Observable<Stagiaire> {
        const url = `${this.stageurl}/${uio}/stagiaire`;
        return this.http.get<Stagiaire>(url);
    }    

    consulterStage(id:number): Observable<Stage>{
        const url = `${this.stageurl}/${id}`;
        return this.http.get<Stage>(url);
    }

    MajStage (id:number,s : Stage) : Observable<Stage> {
        const url = `${this.stageurl}/${id}`;
        return this.http.patch<Stage>(url, s);
    }

    creerBadge(code: number, stageId: number): Observable<any> {      
        const badgeData = {
          code: code,
          stage: `${this.stageurl}/${stageId}`
        };
      
        return this.http.post<any>(`${this.badgeurl}`, badgeData);
    }
}