import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

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
        return [this];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new CustomAction("use-telescope", "Use telescope", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the Observatory.", 
            "There is a Star Chart with different celestial bodies on it",
            "There is a telescope in the middle of the room"]);
    }
}