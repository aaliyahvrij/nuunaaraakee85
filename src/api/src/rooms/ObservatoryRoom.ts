import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
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
        return [];
    }

    public actions(): Action[] {
        return [new ExamineAction()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is the Observatory.", "There is a telescope in the middle of the room"]);
    }
}