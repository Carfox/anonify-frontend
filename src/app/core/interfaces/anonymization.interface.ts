
export interface Anonymization {
  session_id: string;
  attributes: Attribute[];
}

export interface Attribute {
  name?: string;
  technique?: string;
  privacyModel?: string;
  attributeType?: string;
  parameters?: Parameters;
  hierarchyStrategy?: HierarchyStrategy;
}

export interface HierarchyStrategy {
  type: string;
  numClasses: number;
  amplitud: number;
}


export interface AttributeType {
  name: string;
  value: string;
}
export interface Parameters {}
