import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const PaintingItemAlias: string = "painting";

export class painting extends Item implements Examine{
    public constructor() {
        super(PaintingItemAlias, ExamineActionAlias);
    }
public name(): string {
    return "Fireplace";
}
public examine(): ActionResult | undefined {
    return new TextActionResult(["It's burning fireplace in an abandoned castle, weird...."]);
}
}
