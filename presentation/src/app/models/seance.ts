import { Presance } from './presance';
export interface Seance {

    id: number;
    description: string;
    date: any;
    hourEnd:string;
    
    presences: Array<Presance>;
}
