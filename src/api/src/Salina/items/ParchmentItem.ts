import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const ParchmentItemAlias: string = "parchment";

export class ParchmentItem extends Item implements Examine, Pickup {
    public constructor() {
        super(ParchmentItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "parchment";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an old piece of parchment."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(ParchmentItemAlias)) {
            playerSession.inventory.push(ParchmentItemAlias);
            return new TextActionResult(["You pick up the parchment."]);
        }

        return new TextActionResult(["You already have the parchment."]);
    }
}
