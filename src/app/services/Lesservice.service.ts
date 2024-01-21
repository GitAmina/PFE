import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WrapperHisto } from "../model/WrappedHisto.model";
import { Stage } from "../model/stage.model";

const httpOptions = {
    headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
}

@Injectable({
    providedIn: 'root'
})

export class LesServicesservice {

    histourl : string = 'http://localhost:8080/snim/historiques';
    badgeurl : string = 'http://localhost:8080/snim/badges';

    constructor (private http : HttpClient) {

    }

    listeHisto () : Observable<any> {
        return this.http.get<any>(this.histourl);
    }

    listeBadge () : Observable<any> {
        return this.http.get<any>(this.badgeurl);
    }

    getStageByBadge(uio: number): Observable<Stage> {
        const url = `${this.badgeurl}/${uio}/stage`;
        return this.http.get<Stage>(url);
    }
}