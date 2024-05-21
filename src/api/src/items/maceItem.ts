import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const maceItemAlias: string = "mace";

export class maceItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(maceItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
   
    
    public name(): string {
        return "Mace";
    }

    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a mace. A spiked mace that looks quite dangerous."]);
    }

    public chooseWeapon(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(maceItemAlias)) {
          playerSession.inventory.push(maceItemAlias);

        return new TextActionResult(["You choose the Crossbow give to the guard"]);

       }

       

        return undefined;
    }  
      
    



}