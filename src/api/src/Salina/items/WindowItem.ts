import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
//import { getPlayerSession } from "../../instances";
//import { PlayerSession } from "../../types";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";



export const WindowItemAlias: string = "window";

 export class WindowItem extends Item implements Examine, Pickup{
    public constructor() {
        super(WindowItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "window";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a window. The view is pretty."]);
    }


    public pickup(): ActionResult | undefined {
     const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(WindowItemAlias)) {
            playerSession.inventory.push(WindowItemAlias);


            return new TextActionResult(["You use the window."]);
        }
  
    return undefined;
        
}
 }