import {IEdge, ILabel, INode} from './canvas/types';

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
