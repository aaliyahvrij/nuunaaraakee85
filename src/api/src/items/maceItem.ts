import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const maceItemAlias: string = "mace";

export class maceItem extends Item implements Examine{
    public constructor(){
        super(maceItemAlias, ExamineActionAlias);
    }

    
    public name(): string {
        return "Mace";
    }

    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a mace. A spiked mace that looks quite dangerous."]);
    }


}