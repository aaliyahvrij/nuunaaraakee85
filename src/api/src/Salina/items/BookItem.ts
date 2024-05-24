import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

export const BookItemAlias: string = "book";

export class BookItem extends Item implements Examine, Pickup {
    public constructor() {
        super(BookItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an ordinary book."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(BookItemAlias)) {
            playerSession.inventory.push(BookItemAlias);

            console.log("Book picked up. Updated player session:", playerSession);
            return new TextActionResult(["You pick up the book."]);
        }
  
        return undefined;
    }
}
