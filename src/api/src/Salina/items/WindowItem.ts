import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
//import { getPlayerSession } from "../../instances";
//import { PlayerSession } from "../../types";
import { ActionResult } from "../../base/actionResults/ActionResult";


export const WindowItemAlias: string = "window";

 export class WindowItem extends Item implements Examine{
    public constructor() {
        super(WindowItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "window";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a window. The view is pretty."]);
    }


    public pickup(): ActionResult | undefined {
   /*     const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(WindowItemAlias)) {
            playerSession.inventory.push(WindowItemAlias);

            console.log("Parchment picked up. Updated player session:", playerSession);
            return new TextActionResult(["You pick up the book."]);
        }*/
  
        return undefined;
    }
}