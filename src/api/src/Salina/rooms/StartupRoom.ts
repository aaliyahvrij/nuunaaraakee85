<<<<<<< HEAD:src/api/src/Salina/rooms/StartupRoom.ts
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { LibraryRoom } from "./LibraryRoom";
=======
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { Torenkamer } from "./Torenkamer";

>>>>>>> e2122ef3b07370572486bb1b08bf7724f2e8e8d7:src/api/src/rooms/StartupRoom.ts

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Example Game";
    }

    public images(): string[] {
        return ["startup"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
<<<<<<< HEAD:src/api/src/Salina/rooms/StartupRoom.ts
            const room: LibraryRoom = new LibraryRoom();
=======
            const room: Torenkamer = new Torenkamer();
            const playerSession: PlayerSession = getPlayerSession();
>>>>>>> e2122ef3b07370572486bb1b08bf7724f2e8e8d7:src/api/src/rooms/StartupRoom.ts

            //Set the current room to the example room
            playerSession.currentRoom = room.alias;
            playerSession.actionsTaken = [];

            return room.examine();
        }

        return undefined;
    }
}
