import { Action } from "../../base/actions/Action";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { getPlayerSession } from "../../instances"; // Update de import naar getPlayerSession
import { Room } from "../../base/gameObjects/Room";
import { PlayerSession } from "../../types";
import { armoryRoom } from "../rooms/armoryRoom"; // Update de import naar armoryRoom

export class NextRoomAction extends Action {
    public constructor() {
        super("next-room", "Go to the next room", false);
    }

    public perform(): ActionResult {
        const playerSession: PlayerSession = getPlayerSession();
        const nextRoom: Room | undefined = this.getNextRoom();

        if (nextRoom) {
            playerSession.currentRoom = nextRoom.alias;
            // updatePlayerSession(playerSession); // Update de speler sessie indien nodig
            return new TextActionResult(["You have moved to the next room: the armory room."]);
        }

        return new TextActionResult(["There is no next room available."]);
    }

    private getNextRoom(): Room | undefined {
        // Return een nieuwe instantie van armoryRoom
        return new armoryRoom();
    }
}
