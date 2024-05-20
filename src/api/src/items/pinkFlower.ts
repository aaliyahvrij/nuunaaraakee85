import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const pinkFlowerAlias: string = "pink-flower";

export class pinkFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(pinkFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "pink flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This highly fragrant flower exudes a delightful scent reminiscent of jasmine, citrus, and gardenia. The pink blossoms are symbols of beauty and grace.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["you pickup the pink flower"]);
    }
}
