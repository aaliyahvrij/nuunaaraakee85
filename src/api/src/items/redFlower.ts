import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const redFlowerAlias: string = "red-flower";

export class redFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(redFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "red flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["its red hihi"]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["omg u pick up red bloem"]);
    }
}
