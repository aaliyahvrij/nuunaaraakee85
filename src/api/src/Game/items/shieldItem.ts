import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const shieldItemAlias: string = "shield";

export class shieldItem extends Item implements Examine{
    public constructor(){
        super(shieldItemAlias, ExamineActionAlias);
    }

    
    public name(): string {
        return "Shield";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a shield. An imposing shield with a mysterious inscription  The inscription reads: The weapon that accompanies me is light but deadly"]);
    }


}