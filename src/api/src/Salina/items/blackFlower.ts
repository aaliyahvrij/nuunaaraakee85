import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const blackFlowerAlias: string = "black-flower";

export class blackFlowerItem extends Item implements Examine, Pickup {
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
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(blackFlowerAlias)) {
            playerSession.inventory.push(blackFlowerAlias);

            return new TextActionResult(["you pick up the black flower"]);
        }

        return undefined;
    }
}
