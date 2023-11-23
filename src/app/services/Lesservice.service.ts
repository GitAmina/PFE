import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WrapperHisto } from "../model/WrappedHisto.model";

const httpOptions = {
    headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
}

@Injectable({
    providedIn: 'root'
})

export class LesServicesservice {

    histourl : string = 'http://localhost:8080/snim/historiques';

    constructor (private http : HttpClient) {

    }

    listeHisto () : Observable<any> {
        return this.http.get<any>(this.histourl);
    }
}