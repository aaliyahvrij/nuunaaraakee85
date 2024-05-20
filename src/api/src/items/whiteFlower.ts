import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const whiteFlowerAlias: string = "white-flower";

export class whiteFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(whiteFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "white flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This charming flower blooms in shades of pink and white. It is known for its delicate, trumpet-shaped flowers and long-lasting blooms.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["you pick up the white flower"]);
    }
}
