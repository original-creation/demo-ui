import { BranchRole } from "./branch_role";
export interface Branch{
    id: number;
    name: string;
    description:string;
    roles: BranchRole []
}