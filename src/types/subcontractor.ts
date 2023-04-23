import { CertificationItem } from "./certification_item"
import { ProductItem } from "./product_item"

export interface Subcontractor {
    uuid: string,
    name: string,
    productgroups: ProductItem[],
    certifications: CertificationItem[]
}
