import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const keyItemAlias: string = "key";

export class keyItem extends Item implements Examine{

    public constructor(){
        super(keyItemAlias, ExamineActionAlias);
    }

    
    public name(): string {
        return "Key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A small key that might open a hidden door."]);
    }

}