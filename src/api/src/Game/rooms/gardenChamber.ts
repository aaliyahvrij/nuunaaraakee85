import { PickupAction } from "../actions/PickupAction";
import { blackFlowerAlias, blackFlowerItem } from "../items/blackFlower";
import { pinkFlowerAlias, pinkFlowerItem } from "../items/pinkFlower";
import { rainbowFlowerItem } from "../items/rainbowFlower";
import { redFlowerItem } from "../items/redFlower";
import { whiteFlowerAlias, whiteFlowerItem } from "../items/whiteFlower";
import { yellowFlowerAlias, yellowFlowerItem } from "../items/yellowFlower";
import { serumALias, serumItem } from "../items/serum";
import { DoorCharacter } from "../characters/DoorCharacter";
import { CavePaintingCharacter } from "../characters/CavePaintingCharacter";
import { MonkPaintingCharacter } from "../characters/MonkPaintingCharacter";
import { StonePaintingCharacter } from "../characters/StonePaintingCharacter";
import { Room } from "../../base/gameObjects/Room";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { PlayerSession } from "../../types";
import { getGameObjectsFromInventory, getPlayerSession, getRoomByAlias } from "../../instances";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { CustomAction } from "../../base/actions/CustomAction";
import { TorenkamerRoomAlias } from "./Torenkamer";
import { Action } from "../../base/actions/Action";

export const GardenChamberAlias: string = "garden";

export class GardenChamber extends Room {
    public constructor() {
        super(GardenChamberAlias);
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.hasGivenSerum) {
            return new TextActionResult([
                "The passage is lined with 3 main paintings emitting faint voices.",
                "You listen closely to the paintings for clues, planning to move quickly after hearing them closely.",
            ]);
        }

        return new TextActionResult([
            "It's filled with exotic flowers and plants but looks somewhat overgrown.",
            "You decide to investigate the flowers.",
        ]);
    }

    public name(): string {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.hasTalkedToDoorCharacter) {
            return "Rusty Door";
        }

        if (playerSession.hasGivenSerum) {
            return "Underground Passage";
        }

        if (playerSession.hasTalkedToCave) {
            return "Cave Painting";
        }

        if (playerSession.hasTalkedToMonk) {
            return "Monk Painting";
        }

        if (playerSession.hasTalkedtoStone) {
            return "Stone Painting";
        }

        return "Garden Chambers";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.hasTalkedToDoorCharacter) {
            return ["door"];
        }

        if (playerSession.hasGivenSerum) {
            return ["hall"];
        }

        if (playerSession.hasTalkedToCave) {
            return ["cave"];
        }

        if (playerSession.hasTalkedToMonk) {
            return ["monk"];
        }

        if (playerSession.hasTalkedtoStone) {
            return ["stone"];
        }

        return ["garden_1"];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        playerSession.hasTalkedToDoorCharacter = false;

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        // List of flowers
        const flowers: string[] = [blackFlowerAlias, yellowFlowerAlias, pinkFlowerAlias, whiteFlowerAlias];

        // Check if the serum has been given
        if (!playerSession.hasGivenSerum) {
            objects.push(new rainbowFlowerItem());
            // Add flowers to the objects array if they are not already in the inventory
            if (!playerSession.inventory.includes(blackFlowerAlias)) {
                objects.push(new blackFlowerItem());
            }

            if (!playerSession.inventory.includes(yellowFlowerAlias)) {
                objects.push(new yellowFlowerItem());
            }

            objects.push(new redFlowerItem());

            if (!playerSession.inventory.includes(pinkFlowerAlias)) {
                objects.push(new pinkFlowerItem());
            }

            if (!playerSession.inventory.includes(whiteFlowerAlias)) {
                objects.push(new whiteFlowerItem());
            }

            if (
                flowers.every((flower) => playerSession.inventory.includes(flower)) &&
                !playerSession.inventory.includes(serumALias)
            ) {
                objects.push(new serumItem());
            }
            objects.push(new DoorCharacter());
        }

        if (playerSession.hasGivenSerum) {
            playerSession.inventory = [];
            objects.push(
                new CavePaintingCharacter(),
                new MonkPaintingCharacter(),
                new StonePaintingCharacter()
            );
        }
        return objects;
    }

    public actions(): Action[] {
        const actions: Action[] = [new ExamineAction(), new PickupAction(), new TalkAction()];

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.hints > 3) {
            actions.push(new CustomAction("go-to-next-room", "Go to the next room", false));
        }

        return actions;
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === "go-to-next-room") {
            const TorenkamerRoom: Room | undefined = getRoomByAlias(TorenkamerRoomAlias);
            if (TorenkamerRoom) {
                playerSession.currentRoom = TorenkamerRoom.alias;
                return TorenkamerRoom.examine();
            } else {
                return new TextActionResult(["Error: Torenkamer not found."]);
            }
        }

        return undefined;
    }
}
