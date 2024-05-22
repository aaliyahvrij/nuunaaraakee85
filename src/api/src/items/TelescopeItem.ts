import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const TelescopeItemAlias: string = "telescope-item";

export class TelescopeItem extends Item implements Examine{
    constructor() {
        super(TelescopeItemAlias, ExamineActionAlias) 
    }
    
    public name(): string {
        return "Telescope";
    }

    examine(): ActionResult | undefined {
        return new TextActionResult(["You look into the telescope"]);
    }
}