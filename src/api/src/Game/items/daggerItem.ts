import { chooseWeapon, chooseWeaponActionAlias } from "../actions/chooseWeaponAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";



export const daggerItemAlias: string = "dagger";

export class daggerItem extends Item implements Examine, chooseWeapon{
    public constructor(){
        super(daggerItemAlias, ExamineActionAlias, chooseWeaponActionAlias);
    }
    
 
    public name(): string {
        return "Dagger";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a dagger. It's light and sharp, perfect for quick strikes."]);
    }

    public chooseWeapon(): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();

       if(!playerSession.inventory.includes(daggerItemAlias)) {
          playerSession.inventory.push(daggerItemAlias);

        return new TextActionResult(["You choose the Dagger. It feels deadly, but is it the right choice?"]);

       }

       

        return undefined;
    }  






}