import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { FoundJewelInfo, PaintingCharacter } from "../characters/paintingCharacter";
import { getPlayerSession, getRoomByAlias } from "../../instances";
import { painting } from "../items/fireplaceitem";
import { PlayerSession } from "../../types";
import { LibraryRoomAlias } from "./LibraryRoom";

export const BigHallRoomAlias: string = "BigHall";


export class BigHall extends Room {
    public constructor() {
        super(BigHallRoomAlias);
    }

    public name(): string {
        return "BigHall";
    }

    public images(): string[] {
        return [
            "bighall"
        ];
    }

    public actions(): Action[] {
        let actions: Action[] = [new ExamineAction(), new TalkAction()];
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.actionsTaken.includes(FoundJewelInfo)) {
            actions.push(new CustomAction("Leftdoor", "Take left door", false));
        }

        return actions;
    }

    public objects(): GameObject[] {
        return [this, new painting(), new PaintingCharacter()];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        if (alias === "Leftdoor") {
            const libraryRoom: Room | undefined = getRoomByAlias(LibraryRoomAlias);
            if (libraryRoom) {
                playerSession.currentRoom = libraryRoom.alias;
                return libraryRoom.examine();
            } else {
                return new TextActionResult(["You made a coding error :-("]);
            }
        }

        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a big hall",
            "You can also see the beautiful painting there!"
        ]);
    }
}
