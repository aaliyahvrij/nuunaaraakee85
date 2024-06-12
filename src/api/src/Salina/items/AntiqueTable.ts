import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const TableItemAlias: string = "table";

export class table extends Item implements Examine {
    public constructor() {
        super(TableItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Antique Table";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.table = true;
        return new TextActionResult(["It's a really old table in the middle of the room."]);
    }


}
