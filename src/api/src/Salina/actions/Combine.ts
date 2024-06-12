import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const CombineActionAlias: string = "combine";

export interface Combine {
    combine(): ActionResult | undefined;
}

export class CombineAction extends Action {
    public constructor() {
        super(CombineActionAlias, "combine", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, CombineActionAlias)) {
            return castTo<Combine>(gameObject).combine();
        }

        return undefined;
    }
}
