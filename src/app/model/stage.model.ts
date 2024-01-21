import { Badge } from "./badge.model";
import { Service } from "./service.model";
import { Stagiaire } from "./stagiaire.model";

export class Stage {
    uio! : number;
    uuid! : string;
    libelle! : string;
    datedebut! : Date;
    datefin! : Date;
    stagiaire! : Stagiaire;
    service! : Service;
    etat! : string;
}