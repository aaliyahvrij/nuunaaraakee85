import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { blackFlowerAlias, blackFlowerItem } from "../items/blackFlower";
import { pinkFlowerAlias, pinkFlowerItem } from "../items/pinkFlower";
import { rainbowFlowerAlias, rainbowFlowerItem } from "../items/rainbowFlower";
import { redFlowerAlias, redFlowerItem } from "../items/redFlower";
import { whiteFlowerAlias, whiteFlowerItem } from "../items/whiteFlower";
import { yellowFlowerAlias, yellowFlowerItem } from "../items/yellowFlower";
import { PlayerSession } from "../types";

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
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(redFlowerAlias)) {
            objects.push(new redFlowerItem());
        }

        if (!playerSession.inventory.includes(blackFlowerAlias)) {
            objects.push(new blackFlowerItem());
        }

        if (!playerSession.inventory.includes(yellowFlowerAlias)) {
            objects.push(new yellowFlowerItem());
        }

        if (!playerSession.inventory.includes(pinkFlowerAlias)) {
            objects.push(new pinkFlowerItem());
        }

        if (!playerSession.inventory.includes(whiteFlowerAlias)) {
            objects.push(new whiteFlowerItem());
        }

        if (!playerSession.inventory.includes(rainbowFlowerAlias)) {
            objects.push(new rainbowFlowerItem());
        }

        return objects;
    }

    public actions(): Action[] {
        return [new ExamineAction(), new PickupAction()];
    }
}
