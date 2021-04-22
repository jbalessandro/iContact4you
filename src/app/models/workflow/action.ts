export interface IAction {
    id: number;
    type: string;
    parent: number;
    next: number;
    description: string;
    conditional?: number[];
    details?: any;
}