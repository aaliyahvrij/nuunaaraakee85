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
    private paintingCharacter: PaintingCharacter;

    public constructor() {
        super(BigHallRoomAlias);
        this.paintingCharacter = new PaintingCharacter();
    }

    public name(): string {
        return "BigHall";
    }

    public images(): string[] {
        return ["bighall"];
    }

    public actions(): Action[] {
        if (this.paintingCharacter.hasCompletedJewelDialogue()) {
            return [
                new ExamineAction(),
                new TalkAction(),
                new CustomAction("Leftdoor", "Take left door", false)
            ];
        }
        return [new ExamineAction(), new TalkAction()];
    }

    public objects(): GameObject[] {
        return [this, new painting(), this.paintingCharacter];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "Leftdoor") {
            return new TextActionResult(["You took the left door and went to the library"]);
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a big hall", "You can also see the beautiful painting there!"]);
    }
}
