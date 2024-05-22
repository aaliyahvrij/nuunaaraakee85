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
import { rainbowFlowerItem } from "../items/rainbowFlower";
import { redFlowerItem } from "../items/redFlower";
import { whiteFlowerAlias, whiteFlowerItem } from "../items/whiteFlower";
import { yellowFlowerAlias, yellowFlowerItem } from "../items/yellowFlower";
import { PlayerSession } from "../types";
import { serumALias, serumItem } from "../items/serum";

export const gardenChamberAlias: string = "garden";

export class GardenChamber extends Room {
    public constructor() {
        super(gardenChamberAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Its filled with exotic flowers and plants but looks somewhat overgrown",
            "u decide to investigate the flowers",
        ]);
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

        if (playerSession.inventory.entries()) {
            playerSession.inventory.push(serumALias);
        }

        if (playerSession.inventory.includes(serumALias)) {
            objects.push(new serumItem());
        }

        objects.push(new redFlowerItem(), new rainbowFlowerItem());

        return objects;
    }

    public actions(): Action[] {
        return [new ExamineAction(), new PickupAction()];
    }
}
