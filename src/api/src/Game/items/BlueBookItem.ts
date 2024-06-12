import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { BookType } from "./BookshelfItem";

export const BlueBookItemAlias: string = "blue-book";

export class BlueBookItem extends GameObject implements Examine, Pickup {
    public type: BookType;
    
    public constructor() {
        super(BlueBookItemAlias, ExamineActionAlias, PickupActionAlias);
        this.type = BookType.Red;
    }

    public name(): string {
        return " blue book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a blue book."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(BlueBookItemAlias)) {
            playerSession.inventory.push(BlueBookItemAlias);
            return new TextActionResult(["You pick up the red book."]);
        }

        return new TextActionResult(["You already have the book."]);
    }
}
