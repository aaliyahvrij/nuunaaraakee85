import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { PaintingCharacter } from "../characters/PaintingCharacter";
import { painting } from "../items/FireplaceItem";

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
        return [new ExamineAction(), new TalkAction(), new CustomAction("Leftdoor", "Take left door", false)];
    }

    public objects(): GameObject[] {
        return [this, new painting(), new PaintingCharacter];
        
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "Leftdoor") {
            return new TextActionResult(["You took the left door and went to the library"]);
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a big hall", "You can also see the beautifull painting there!"]);
    }

}