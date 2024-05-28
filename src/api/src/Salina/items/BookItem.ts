import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const BookItemAlias: string = "book";

export class BookItem extends Item implements Examine, Pickup {
    public constructor() {
        super(BookItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a dusty old book."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(BookItemAlias)) {
            playerSession.inventory.push(BookItemAlias);
            return new TextActionResult(["You pick up the book."]);
        }

        return new TextActionResult(["You already have the book."]);
    }
}
