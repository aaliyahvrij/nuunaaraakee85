import { Action } from "../../base/actions/Action";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { WindowItemAlias } from "../items/WindowItem";

export const UseActionAlias: string = "use";

export class UseAction extends Action {
    public constructor() {
        super(UseActionAlias, "Use", true);
    }

    public static perform(_gameObject: GameObject, ParchmentItemAlias : string): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (ParchmentItemAlias === "parchment" && WindowItemAlias === "window" && playerSession.inventory.includes("parchment")) {
            return new TextActionResult(["You place the parchment on the window and a hidden code is revealed: B-R-G-O."]);
        } else {
            return new TextActionResult([`You can't use ${ParchmentItemAlias} on ${WindowItemAlias}.`]);
        }
    }
}
