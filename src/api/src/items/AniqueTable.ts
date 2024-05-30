import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const TableItemAlias: string = "painting";

export class table extends Item implements Examine{
    public constructor() {
        super(TableItemAlias, ExamineActionAlias);
    }
public name(): string {
    return "Anique Table";
}
public examine(): ActionResult | undefined {
    return new TextActionResult(["It's a really old table in the middle of the room."]);
}
}