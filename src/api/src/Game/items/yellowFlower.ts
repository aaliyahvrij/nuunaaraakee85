import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

export const yellowFlowerAlias: string = "yellow-flower";

export class yellowFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(yellowFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "yellow flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This bright yellow bloom resembles a bird in flight. Its unique shape and vivid colors make it a captivating and exotic sight.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(yellowFlowerAlias)) {
            playerSession.inventory.push(yellowFlowerAlias);

            return new TextActionResult(["you pick up the yellow flower"]);
        }

        return undefined;
    }
}
