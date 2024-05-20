import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const blackFlowerAlias: string = "black-flower";

export class redFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(blackFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "black flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This exotic plant features large white bracts that resemble bat wings, with long whisker-like filaments. The actual flowers are small and dark, adding a mysterious allure.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["you pick up the black flower"]);
    }
}
