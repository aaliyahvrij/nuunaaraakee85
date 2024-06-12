import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";


export const axeItemAlias: string = "axe";

export class axeItem extends Item implements Examine, chooseWeapon{

    public constructor(){
        super(axeItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
   
    
    public name(): string {
        return "Axe";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a axe. A heavy axe with a sharp blade."]);
    }

    public chooseWeapon(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(axeItemAlias)) {
          playerSession.inventory.push(axeItemAlias);

        return new TextActionResult(["You choose the Axe give to the guard"]);

       }

       

        return undefined;
    }  
        
    
    

}