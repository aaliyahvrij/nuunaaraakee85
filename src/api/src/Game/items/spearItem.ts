import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";



export const spearItemAlias: string = "spear";

export class spearItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(spearItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
    
 
    public name(): string {
        return "Spear";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a spear. It is long and sharp."]);
    }

    public chooseWeapon(): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(spearItemAlias)) {
          playerSession.inventory.push(spearItemAlias);

        return new TextActionResult(["You choose the Spear."]);

       }

       

        return undefined;
    }  






}