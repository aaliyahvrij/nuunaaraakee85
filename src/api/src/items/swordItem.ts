import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";



export const swordItemAlias: string = "sword";

export class swordItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(swordItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
    
 
    public name(): string {
        return "Sword";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a sword. An old and rusty sword that might still be usable."]);
    }

    public chooseWeapon(): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();

       if(playerSession.chooseWeapons) { //  als de room klaar is zet een  false waarde  zodat de item niet meer in de wereld bevindt 
          playerSession.chooseWeapons = true;
          playerSession.inventory.push(swordItemAlias);
          

        return new TextActionResult(["YOU choose the Sword give to the guard"]);

       }

       

        return undefined;
    }  






}