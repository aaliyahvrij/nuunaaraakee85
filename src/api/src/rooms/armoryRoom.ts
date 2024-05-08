import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

export const armoryRoomAlias: string = "Armory";

export class armoryRoom extends Room {
    public constructor(){
        super(armoryRoomAlias);
    }

    public name(): string {
        return "Armory";
    }

    public images(): string[] {
        return [
            // hier komt de foto
        ];
        
    }

    public actions(): Action[] {
        return [new ExamineAction(), new CustomAction("test-me", "test the weapon", false)];
    }



    public objects(): GameObject[] {
        return [this];
        
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welcome to the Armory!", "Here, you'll forge the weapons of your destiny."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "test-me")

            return new TextActionResult([" You test me for a weapon?"]);

            return undefined;

    }


    



}
  