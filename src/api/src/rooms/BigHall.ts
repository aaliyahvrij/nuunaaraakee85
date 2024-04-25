import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

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
        return [new ExamineAction(), new CustomAction("test-me", "Test me", false)];
    }

    public objects(): GameObject[] {
        return [this];
        
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test-me") {
            return new TextActionResult(["Je hebt gepraat met het schilderij"]);
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a big hall", "you can also see the beautifull picture there!"]);
    }

}