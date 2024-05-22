import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";

export const ObservatoryRoomAlias: string = "observatory";

export class ObservatoryRoom extends Room {
    public constructor() {
        super(ObservatoryRoomAlias)
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is the Observatory.", "There is a telescope in the middle of the room"]);
    }
}