import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



export const hammerItemAlias: string = "hammer";

export class hammerItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(hammerItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
    
 
    public name(): string {
        return "Hammer";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a hammer. It's heavy and looks very powerful."]);
    }

    public chooseWeapon(): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(hammerItemAlias)) {
          playerSession.inventory.push(hammerItemAlias);

        return new TextActionResult(["You choose the Hammer. It feels powerful, but is it the right choice?"]);

       }

       

        return undefined;
    }  






}