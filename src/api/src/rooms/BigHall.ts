import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { PaintingCharacter } from "../characters/paintingcharacter";
import { painting } from "../items/CandleItem";

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
        return [new ExamineAction(), new TalkAction(), new CustomAction("praat", "Test", false)];
    }

    public objects(): GameObject[] {
        return [this, new painting(), new PaintingCharacter];
        
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "praat") {
            return new TextActionResult(["You tested"]);
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a big hall", "You can also see the beautifull picture there!"]);
    }

}