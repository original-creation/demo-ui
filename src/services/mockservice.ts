import branchmock_data from '../data/branch_mockdata.json';
import subcontractor_mockdata from '../data/subcontractor_mockdata.json';
import deliveries_mockdata from '../data/deliveries_mockdata.json';
import dag_detail from '../data/deliveries_detail_mockdata.json';

import { ProductItem } from '../types/product_item';
import { Actor } from '../types/actor';
import { Branch } from '../types/branch';
import { CertificationItem } from '../types/certification_item';
import { Delivery } from '@/types/delivery';
import { Dag } from '@/types/dag';



export class MockService {
    public getBranchNames(): Branch[] {
      return branchmock_data;
    }

    public getProductItems(actor: Actor) : ProductItem[]{
      return subcontractor_mockdata.find((obj) => obj.uuid === actor.uuid )?.productgroups;
    }

    public getCertifications(actor: Actor) : CertificationItem[]{
      return subcontractor_mockdata.find((obj) => obj.uuid === actor.uuid )?.certifications;
    }

    public getProductDeliveries(actor: string, pgid : string) : Delivery[]{
      return deliveries_mockdata.filter((x) => x.actor_uuid===actor).filter((y) => y.type===pgid);
    }

    public getDAGDetails(uuid: string) : Dag[] {
      return dag_detail.filter((x)=>x.uuid===uuid);
    }
  }
   