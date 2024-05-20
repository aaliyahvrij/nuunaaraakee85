import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";

export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): ActionResult | undefined;
}
export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }
}
