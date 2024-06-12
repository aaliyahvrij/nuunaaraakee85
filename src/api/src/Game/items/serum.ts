import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
export const serumALias: string = "serum-alias";

export class serumItem extends Item implements Examine, Pickup {
    public constructor() {
        super(serumALias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "serum";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["its a serum made by flowers it smells and looks beautiful"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(serumALias)) {
            playerSession.inventory.push(serumALias);

            return new TextActionResult(["You made the serum"]);
        }

        return undefined;
    }
}
