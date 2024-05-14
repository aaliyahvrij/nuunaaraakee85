import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ParchmentItem } from "../items/ParchmentItem";

export const LibraryRoomAlias: string = "library-room";

export class LibraryRoom extends Room {

    public constructor() {
        super(LibraryRoomAlias);
    }

    public name(): string {
        return "Library-room";
    }

    public images(): string[] {
        return [
            "library room",
            "example"
        ];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new CustomAction("test-me", "Look at the window", false)];
    }

    public objects(): GameObject[] {
        return [this, new ParchmentItem()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a beautiful library!!", "You can see alot of roughed up books and papers."]);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "test-me") {
            return new TextActionResult(["You looked at the window, the view is pretty gorgeous."]);
        }


        return undefined;
    }
}   