import { Columns } from "../../../../core/interfaces/dataset.interface";

export interface PreprocessStep{
    
    columns: Columns[];
    value?: string | number;
    technique: string;
}
export interface PreprocessTechnique{

    name: string;
    value: string;
    description: string
}

export interface DatasetPreprocess {
    projectID: string;
    datasetID: string;
    entityID: string;
    parameters: PreprocessParameters;

}

export interface PreprocessParameters {
    dataset_status: string;
    need_preprocess: boolean;
    columns: Columns[];
    rows: number;
    steps: PreprocessStep[];
}