import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession, getRoomByAlias } from "../instances";
import { table } from "../items/AntiqueTable";
import { MagicalBookCharacter } from "../characters/MagicalBookCharacter";
import { PlayerSession } from "../types";
import { StartupRoomAlias } from "./StartupRoom";

export const TorenkamerAlias: string = "Torenkamer";

export class Torenkamer extends Room {
    public constructor() {
        super(TorenkamerAlias);
    }

    public name(): string {
        return "Torenkamer";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.correctRiddle) {
            return ["juweel"];
        }

        if (playerSession.BookExamine) {
            return ["book"];
        }

        if (playerSession.table) {
            return ["table"];
        }

        if (playerSession.lever) {
            return ["Torenkamer"];
        }

        return ["Torenkamerdonker"];
    }

    public objects(): GameObject[] {
        return [this, new table(), new MagicalBookCharacter()];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.correctRiddle) {
            return [new CustomAction("Pickup", "Pick up the jewel", false)];
        }

        return [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("Lever", "Press Lever", false),
        ];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "Lever") {
            playerSession.lever = !playerSession.lever;
            playerSession.table = false;
            if (playerSession.lever) {
                return new TextActionResult(["Wow those were the torches!"]);
            } else {
                return new TextActionResult(["The room is now dark again."]);
            }
        } else if (alias === "ExamineBook") {
            playerSession.BookExamine = true;
            return new TextActionResult(["You examine the magical book."]);
        } else if (alias === "Pickup") {
            const startupRoom: Room | undefined = getRoomByAlias(StartupRoomAlias);
            if (startupRoom) {
                playerSession.currentRoom = startupRoom.alias;
                playerSession.correctRiddle = false; // Reset the riddle state
                return startupRoom.examine();
            } else {
                return new TextActionResult(["You made a coding error :-("]);
            }
        }

        return undefined;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.torenkamer = true;
        playerSession.table = false;
        playerSession.BookExamine = false; 
        return new TextActionResult([
            "A dark, old tower room with echoes. There's a table with a riddle. A small space in the wall has a jewel on a cushion. The room has magic symbols and carvings."
        ]);
    }
}
