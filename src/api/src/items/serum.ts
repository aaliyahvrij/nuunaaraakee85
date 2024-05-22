import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
export const serumALias: string = "serum-alias";

export class serumItem extends Item implements Examine {
    public constructor() {
        super(serumALias, ExamineActionAlias);
    }

    public name(): string {
        return "serum";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["its a serum made by flowers it smells and looks beautiful"]);
    }
}
