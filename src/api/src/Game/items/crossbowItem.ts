import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



export const crossbowItemAlias: string = "crossbow";

export class crossbowItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(crossbowItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
    
 
    public name(): string {
        return "Crossbow";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a crossbow. It's light and powerful, perfect for ranged attacks."]);
    }

    public chooseWeapon(): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(crossbowItemAlias)) {
          playerSession.inventory.push(crossbowItemAlias);

        return new TextActionResult(["You choose the Crossbow give to the guard"]);

       }

       

        return undefined;
    }  






}