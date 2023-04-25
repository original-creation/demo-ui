import branchmock_data from '../data/branch_mockdata.json';
import subcontractor_mockdata from '../data/subcontractor_mockdata.json';
import deliveries_mockdata from '../data/deliveries_mockdata.json';
import deliveries_detail_nodes from '../data/deliveries_detail_mockdata.json';
import { ProductItem } from '../types/product_item';
import { Actor } from '../types/actor';
import { Branch } from '../types/branch';
import { CertificationItem } from '../types/certification_item';
import { Delivery } from '@/types/delivery';
import { Subcontractor } from '@/types/subcontractor';
import { Node } from '@/types/node';




export class MockService {
    public getBranchNames(): Branch[] {
      return JSON.parse(JSON.stringify(branchmock_data));
    }

    public getProductItems(actor: Actor) : ProductItem[]{
      const contractors: Subcontractor[] = JSON.parse(JSON.stringify(subcontractor_mockdata));
      let contractor = contractors.filter((obj) => obj.uuid === actor.uuid).at(0);
      if(contractor!=undefined){
        return contractor.productgroups;
      }
      return [];
    }

    public getCertifications(actor: Actor) : CertificationItem[]{
      const contractors: Subcontractor[] = JSON.parse(JSON.stringify(subcontractor_mockdata));
      let contractor = contractors.filter((obj) => obj.uuid === actor.uuid).at(0);
      if(contractor!=undefined){
        return contractor.certifications;
      }
      return [];
    }

    public getProductDeliveries(actor: string, pgid : string) : Delivery[]{
      return deliveries_mockdata.filter((x) => x.actor_uuid===actor).filter((y) => y.type===pgid);
    }

    public getNodeData(uuid: string) : Node {
      const details: Node[] = JSON.parse(JSON.stringify(deliveries_detail_nodes))
      const detailNode = details.filter((x)=>x.id===uuid).at(0);
      if(detailNode===undefined){
        return {id:"0", name:"No Data"};
      }
      return detailNode;
    }
  }
   