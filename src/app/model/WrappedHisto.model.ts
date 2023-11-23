import { Historique } from "./historique.model";

export class WrapperHisto {
    _embedded!: { historiques: Historique[]};
}