export interface Dag{
    uuid: string,
    description: string,
    nodes : [
        nodeId : number,
        level: string,
        parent: number,
        display: string,
        data : string
    ]
}