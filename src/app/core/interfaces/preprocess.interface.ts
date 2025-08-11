import { Columns } from "./dataset.interface";

export interface preprocessStep{
    
    columns: Columns[];
    value?: string | number;
    technique: string;
}
export interface preprocessTechnique{

    name: string;
    value: string;
    description: string
}
