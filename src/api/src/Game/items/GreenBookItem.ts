import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { BookType } from "./BookshelfItem";

export const GreenBookItemAlias: string = "green-book";

export class GreenBookItem extends Item implements Examine, Pickup {
    public type: BookType;

    public constructor() {
        super(GreenBookItemAlias, ExamineActionAlias, PickupActionAlias);
        this.type = BookType.Green;

    }

    public name(): string {
        return "green book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a green book."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(GreenBookItemAlias)) {
            playerSession.inventory.push(GreenBookItemAlias);
            return new TextActionResult(["You pick up the green book."]);
        }

        return new TextActionResult(["You already have the book."]);
    }
}
