import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";


export const swordItemAlias: string = "sword";

export class swordItem extends Item implements Examine{
    public constructor(){
        super(swordItemAlias, ExamineActionAlias);
    }

 
    public name(): string {
        return "Sword";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a sword. An old and rusty sword that might still be usable."]);
    }



}