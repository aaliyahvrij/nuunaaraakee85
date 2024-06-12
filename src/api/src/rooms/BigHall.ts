import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { FoundJewelInfo, PaintingCharacter } from "../characters/PaintingCharacter";
import { getPlayerSession } from "../instances";
import { painting } from "../items/FireplaceItem";
import { PlayerSession } from "../types";

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

        console.log(playerSession);
        if(playerSession.actionsTaken.includes(FoundJewelInfo)){
            actions.push(new CustomAction("Leftdoor", "Take left door", false))
        }

        return actions;
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