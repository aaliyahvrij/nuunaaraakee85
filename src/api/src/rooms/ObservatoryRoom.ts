//import { TelescopeAction } from "../actions/TelescopeAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { TelescopeItem } from "../items/TelescopeItem";

export const ObservatoryRoomAlias: string = "observatory";

export class ObservatoryRoom extends Room {
    public constructor() {
        super(ObservatoryRoomAlias)
    }

    public name(): string {
        return "Observatory";
    }
    
    public images(): string[] {
        return [
            "observatory"
        ]
    }

    public objects(): GameObject[] {
        return [this, new TelescopeItem()];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new CustomAction("look-closer", "Use Telescope", false)]
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "telescope-action") {
            return new TextActionResult(["You look into the telescope"])
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the Observatory.", 
            "There is a Star Chart with different celestial bodies on it",
            "There is a telescope in the middle of the room"]);
    }
}