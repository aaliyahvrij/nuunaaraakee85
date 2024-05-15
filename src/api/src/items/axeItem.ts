import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";


export const axeItemAlias: string = "axe";

export class axeItem extends Item implements Examine{

    public constructor(){
        super(axeItemAlias, ExamineActionAlias);
    }

    
    public name(): string {
        return "Axe";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a axe. A heavy axe with a sharp blade."]);
    }

}