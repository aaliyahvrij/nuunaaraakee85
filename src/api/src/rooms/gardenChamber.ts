import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { blackFlowerItem } from "../items/blackFlower";
import { pinkFlowerItem } from "../items/pinkFlower";
import { rainbowFlowerItem } from "../items/rainbowFlower";
import { redFlowerItem } from "../items/redFlower";
import { whiteFlowerItem } from "../items/whiteFlower";
import { yellowFlowerItem } from "../items/yellowFlower";

export const gardenChamberAlias: string = "garden";

export class gardenChamber extends Room {
    public constructor() {
        super(gardenChamberAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["yappa yappa yappa", "yappy blala"]);
    }

    public name(): string {
        return "Garden Chambers";
    }

    public images(): string[] {
        return ["garden_1"];
    }

    public objects(): GameObject[] {
        return [
            this,
            new redFlowerItem(),
            new yellowFlowerItem(),
            new pinkFlowerItem(),
            new blackFlowerItem(),
            new whiteFlowerItem(),
            new rainbowFlowerItem(),
        ];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new PickupAction()];
    }
}
