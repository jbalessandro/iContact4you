import { IAction } from "./action";

export interface IWorkflow {
    _pk: string;
    client: string;
    createDate: string;
    createBy: string;
    version: number;
    actions: IAction[];
}
