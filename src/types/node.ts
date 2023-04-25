export interface Node {
    id: string;
    name: string;
    parent?: Node;
    children?: Node[];
    content: [ { "key" : string, "value": string }];
  }