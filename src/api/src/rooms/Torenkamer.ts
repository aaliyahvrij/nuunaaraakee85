import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { table } from "../items/AniqueTable";

export const TorenkamerAlias: string = "Torenkamer";

export class Torenkamer extends Room {
    public constructor() {
        super(TorenkamerAlias);
    }

    public name(): string {
        return "Torenkamer";
    }


    public images(): string[] {
        return [
            "Torenkamer"
        ];
    }

    public objects(): GameObject[] {
        return [this, new table()];
        
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("Leftdoor", "Take left door", false)];
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "Leftdoor") {
            return new TextActionResult(["You took the left door and went to the library"]);
        }
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A dark, old tower room with echoes. There's a table with a riddle. A small space in the wall has a jewel on a cushion. The room has magic symbols and carvings."]);
    }

}