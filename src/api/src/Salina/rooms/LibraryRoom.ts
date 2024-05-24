import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { LibraryCharacter } from "../characters/LibraryCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ParchmentItem, ParchmentItemAlias } from "../items/ParchmentItem";
import { PlayerSession } from "../../types";
import { BookItem, BookItemAlias } from "../items/BookItem";
import { WindowItem } from "../items/WindowItem";
import { UseAction } from "../actions/UseAction";

export const LibraryRoomAlias: string = "library-room";

export class LibraryRoom extends Room {

    public constructor() {
        super(LibraryRoomAlias);
    }

    public name(): string {
        return "Library-room";
    }

    public images(): string[] {
        return ["LibraryRoom"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            new UseAction(),
            new CustomAction("test-me", "Look at the floor", false)
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(ParchmentItemAlias)) {
            objects.push(new ParchmentItem());
        }
        if (!playerSession.inventory.includes(BookItemAlias)) {
            objects.push(new BookItem());
        }
        objects.push(new LibraryCharacter());
        objects.push(new WindowItem());

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a beautiful library!!", "You can see a lot of roughed up books and papers."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === "test-me") {
            playerSession.windowExamined = true;
            return new TextActionResult(["You looked at the floor. It's a boring floor."]);
        }
   

        return undefined;
    }
}
