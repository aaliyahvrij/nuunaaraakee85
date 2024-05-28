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
import { serumItem } from "../items/serum";
import { DoorCharacter } from "../characters/DoorCharacter";
import { TalkAction } from "../base/actions/TalkAction";
import { CustomAction } from "../base/actions/CustomAction";
import { StartupRoom } from "./StartupRoom";

export const GardenChamberAlias: string = "garden";

export class GardenChamber extends Room {
    public constructor() {
        super(GardenChamberAlias);
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.isViewingflowers = true;
        return new TextActionResult([
            "Its filled with exotic flowers and plants but looks somewhat overgrown",
            "You decide to investigate the flowers",
        ]);
    }

    public name(): string {
        return "Garden Chambers";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.hasTalkedToDoorCharacter) {
            return ["door"];
        }

        if (playerSession.isViewingflowers) {
            return ["garden_1"];
        }

        return ["garden_1"];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        const flowers: string[] = [blackFlowerAlias, yellowFlowerAlias, pinkFlowerAlias, whiteFlowerAlias];

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

        if (flowers.every((flower) => playerSession.inventory.includes(flower))) {
            objects.push(new serumItem());
        }

        objects.push(new redFlowerItem(), new rainbowFlowerItem(), new DoorCharacter());

        return objects;
    }

    public actions(): Action[] {
        return [
            new ExamineAction(), 
            new PickupAction(), 
            new TalkAction(),
            new CustomAction("NextRoom", "Next Room", false)
        ];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "NextRoom") {
            const nextRoom: Room = new StartupRoom();
            getPlayerSession().currentRoom = nextRoom.alias;
            return nextRoom.examine();
        }
        return undefined;
    }
}
