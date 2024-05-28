import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { LibraryCharacter } from "../characters/LibraryCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ParchmentItem, ParchmentItemAlias } from "../items/ParchmentItem";
import { PlayerSession } from "../../types";
import { BookItem, BookItemAlias } from "../items/BookItem";
import { WindowItem, WindowItemAlias } from "../items/WindowItem";
import { UseAction } from "../actions/UseAction";

export const LibraryRoomAlias: string = "library-room";

export class LibraryRoom extends Room {
    public constructor() {
        super(LibraryRoomAlias);
    }

    public name(): string {
        return "Library-room";
    }

    public images(): string[] {
        return ["LibraryRoom"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            new CustomAction("test-me", "Look at the floor", false),
            new CustomAction("reveal-code", "Reveal the code with the hint", false)
        ];
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [this];
        const playerSession: PlayerSession = getPlayerSession();

        // Debug log
        console.log("Current inventory before objects:", playerSession.inventory);

        // Voeg items toe aan de kamer, zodat ze kunnen worden opgepakt
        if (!playerSession.inventory.includes(ParchmentItemAlias)) {
            objects.push(new ParchmentItem());
        }
        if (!playerSession.inventory.includes(BookItemAlias)) {
            objects.push(new BookItem());
        }
        if (!playerSession.inventory.includes(WindowItemAlias)) {
            objects.push(new WindowItem());
        }

        objects.push(new LibraryCharacter());

        // Debug log
        console.log("Objects in the room:", objects.map(obj => obj.alias));

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a beautiful library!!", "You can see a lot of roughed up books and papers."]);
    }

    public custom(alias: string, gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "reveal-code" && gameObjects) {
            const inventory: GameObject[] = getGameObjectsFromInventory();
            const window: GameObject | undefined = gameObjects.find(obj => obj.alias === WindowItemAlias) || inventory.find(obj => obj.alias === WindowItemAlias);
            const parchment: GameObject | undefined = gameObjects.find(obj => obj.alias === ParchmentItemAlias) || inventory.find(obj => obj.alias === ParchmentItemAlias);

            if (!window) {
                return new TextActionResult(["No, that can't be right..."]);
            }

            if (!parchment) {
                return new TextActionResult(["No, that doesnt seem right..?"]);
            }

            const useAction: any = new UseAction();
            return useAction.perform(window);
        } else if (alias === "test-me") {
            return new TextActionResult(["You looked at the floor. It's a boring floor."]);
        }

        return undefined;
    }
}
