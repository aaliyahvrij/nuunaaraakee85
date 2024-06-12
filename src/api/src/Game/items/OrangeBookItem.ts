import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { BookType } from "./BookshelfItem";

export const OrangeBookItemAlias: string = "orange-book";

export class OrangeBookItem extends Item implements Examine, Pickup {
    public type: BookType;

    public constructor() {
        super(OrangeBookItemAlias, ExamineActionAlias, PickupActionAlias);
        this.type = BookType.Orange;
    }

    public name(): string {
        return "Orange book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a orange book. Not my favourite colour."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(OrangeBookItemAlias)) {
            playerSession.inventory.push(OrangeBookItemAlias);
            return new TextActionResult(["You pick up the orange book."]);
        }

        return new TextActionResult(["You already have the book."]);
    }
}
