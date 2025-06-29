import { Entity } from "./entity.interface";

interface DatasetColumn {
  name: string;
  column_type_id: string; // Esto lo asignarás en el backend o con IDs fijos en frontend
  value_type_id: string; // Esto lo asignarás en el backend o con IDs fijos en frontend
}

export interface Dataset {
  name: string;
  status: string;
  project_id: string;
  rows: number
  entity?: Entity
  entity_id?: string
  // query_id: string; // Puedes dejarlo como opcional si no es relevante para el CSV
  columns: DatasetColumn[];
  files: FileInterface[]; // Lista de archivos asociados al dataset
  id: string; // UUID del dataset
}

export interface DatasetUpdatestatus {
  id: string;
  status: string;
  rows: number
}

export interface Columns {
  name: string;
  id: string; // UUID
  column_type: {
    name: string; // 'string', 'number', etc.
    id: string; // UUID
    // Puedes añadir más propiedades si es necesario
  };
  value_type: {
    name: string; // 'string', 'number', etc.
    id: string; // UUID
    // Puedes añadir más propiedades si es necesario
  };
}

interface FileInterface {
  name: string;
  path: string;
  size: number;
  is_public: boolean; // Ruta del archivo en el servidor
  id: string; // UUID
  // columns: Columns[];
  dataset_id: string; // ID del dataset al que pertenece
}
