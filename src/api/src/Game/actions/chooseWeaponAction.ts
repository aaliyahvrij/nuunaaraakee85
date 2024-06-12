import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";



export const chooseWeaponActionAlias: string = "chooseWeapon";

export interface chooseWeapon {
    chooseWeapon(): ActionResult | undefined;

}

export class chooseWeaponAction extends Action {
    
    public constructor() { 
        super(chooseWeaponActionAlias, "Choose Weapon", true);
    }

    
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, chooseWeaponActionAlias)) {
            return castTo<chooseWeapon>(gameObject).chooseWeapon();
        }

        return undefined;
    }
     
}
