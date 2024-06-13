import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

export const KeyItemAlias: string = "key";

export class KeyItem extends Item implements Examine, Pickup {
    public static alias = KeyItemAlias;

    public constructor() {
        super(KeyItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's the key to the next puzzle!"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(KeyItemAlias)) {
            playerSession.inventory.push(KeyItemAlias);
            return new TextActionResult(["You pick up the key."]);
        }

        return new TextActionResult(["You already have the key. Silly."]);
    }
}
