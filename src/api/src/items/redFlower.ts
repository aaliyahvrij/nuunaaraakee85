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
        return new TextActionResult([
            "This striking flower has vibrant red and yellow petals that curl back dramatically, creating a flame-like appearance. It seems to originate from distant, exotic lands.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["you pick up the red flower"]);
    }
}
