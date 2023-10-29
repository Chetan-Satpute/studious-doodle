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
  percent: number;
}

export interface ILabel {
  x: number;
  y: number;
  text: string;
}

export interface IFrame {
  nodes: INode[];
  edges: IEdge[];
  labels: ILabel[];
}

export function createFrame(): IFrame {
  return {
    nodes: [],
    edges: [],
    labels: [],
  };
}
