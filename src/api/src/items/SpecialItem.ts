import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const SpecialItemAlias: string = "special-item";

export class SpecialItem extends Item implements Examine{
    constructor() {
        super(SpecialItemAlias, ExamineActionAlias) 
    }
    
    public name(): string {
        return "Special item";
    }

    examine(): ActionResult | undefined {
        return new TextActionResult(["You collect special item fragment"]);
    }
}