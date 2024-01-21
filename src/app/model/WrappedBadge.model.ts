import { Badge } from "./badge.model";

export class WrapperBadge {
    _embedded!: {badges : Badge[]};
}