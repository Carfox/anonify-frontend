export interface ReportData {
  num_rows: number;
  num_columns: number;
  types: Record<string, string>;
  null_values: Record<string, number>;
  top_values: Record<string, Record<string, number>>;
}
