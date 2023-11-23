import { Stage } from "./stage.model";
import { Stagiaire } from "./stagiaire.model";

export class Badge {
    uio! : number;
    uuid! : string;
    code! : number;
    datedelivrance! : Date;
    stage!: Stage;
}