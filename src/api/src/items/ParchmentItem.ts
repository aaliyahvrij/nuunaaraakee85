import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const ParchmentItemAlias: string = "parchment";

export class ParchmentItem extends Item implements Examine, Pickup {
    public constructor() {
        super(ParchmentItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "parchment";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Its a perchment. It looks like it has more than meets the eye."]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["You pickup the parchment."]);
    }

}