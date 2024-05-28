import { Action } from "../../base/actions/Action";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { ParchmentItemAlias } from "../items/ParchmentItem";
import { WindowItemAlias } from "../items/WindowItem";

export const UseActionAlias: string = "use";

export class UseAction extends Action {
    public constructor() {
        super(UseActionAlias, "Use", true);
    }

    public perform(gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (gameObject.alias === WindowItemAlias && playerSession.inventory.includes(ParchmentItemAlias)) {
            return new TextActionResult(["You place the parchment on the window and a hidden code is revealed: B-R-G-O."]);
        } else if (gameObject.alias === WindowItemAlias) {
            return new TextActionResult(["You don't have the parchment in your inventory to use on the window."]);
        } else {
            return new TextActionResult([`You can't use ${gameObject.name()} right now.`]);
        }
    }
}
