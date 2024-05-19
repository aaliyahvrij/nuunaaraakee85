import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";


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
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(ParchmentItemAlias)) {
            playerSession.inventory.push(ParchmentItemAlias);

            console.log("Parchment picked up. Updated player session:", playerSession); // Debugging after update
            return new TextActionResult(["You pick up the parchment."]);
        }
  
        return undefined;
    }
}