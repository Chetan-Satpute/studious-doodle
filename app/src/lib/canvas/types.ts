export enum EdgeType {
  DIRECTED = 'DIRECTED',
  UNDIRECTED = 'UNDIRECTED',
  DOUBLE_DIRECTED = 'DOUBLE_DIRECTED',
}

export interface IPoint {
  x: number;
  y: number;
}

export interface INode {
  x: number;
  y: number;
  value: number;
  color: string;
  corners: number;
}

export interface IEdge {
  startNodePosition: IPoint;
  endNodePosition: IPoint;
  type: EdgeType;
}

export interface ILabel {
  x: number;
  y: number;
  text: string;
}
