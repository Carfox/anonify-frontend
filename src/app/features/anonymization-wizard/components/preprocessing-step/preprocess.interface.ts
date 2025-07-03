import { Columns } from "app/core/interfaces/dataset.interface"

export default interface DatasetPreprocess{

    // userID: string
    projectID: string
    datasetID: string
    parameters: DatasetParameters

}

interface DatasetParameters{

    dataset_status: string
    need_preprocess: boolean
    need_imputation: boolean
    cleaning_method: string
    columns: Columns[]
    rows: number
}


