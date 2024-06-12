import { Action } from "../../base/actions/Action";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { getPlayerSession } from "../../instances";
import { Room } from "../../base/gameObjects/Room";
import { PlayerSession } from "../../types";

export class NextRoomAction extends Action {
    public constructor() {
        super("next-room", "Go to the next room", false);
    }

    public perform(): ActionResult {
        const playerSession: PlayerSession = getPlayerSession();
        // Assuming there's a method to set the current room in the player session
        const nextRoom: Room | undefined = this.getNextRoom();
        if (nextRoom) {
            playerSession.currentRoom = nextRoom.alias;
            return new TextActionResult(["You have moved to the next room."]);
        }
        return new TextActionResult(["There is no next room available."]);
    }

    private getNextRoom(): Room | undefined {
        // Logic to get the next room. This is a placeholder and should be replaced with actual logic.
        // For example, this could return an instance of the next room class.
        // return new NextRoom();
        return undefined; // Placeholder, replace with actual room instance
    }
}
