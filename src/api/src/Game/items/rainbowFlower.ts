import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

import { getRoomByAlias } from "../instances";
import { armoryRoomAlias } from "../rooms/armoryRoom";

export const rainbowFlowerAlias: string = "rainbow-flower";

export class rainbowFlowerItem extends Item implements Examine, Pickup {
    public constructor() {
        super(rainbowFlowerAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "rainbow flower";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This vibrant and colorful flower appears to have petals infused with different colors, resulting in a strikingly beautiful and mesmerizing bloom.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const armoryRoom: Room | undefined = getRoomByAlias(armoryRoomAlias);
        if (armoryRoom) {
            playerSession.currentRoom = armoryRoom.alias;
            return armoryRoom.examine();
        }

        return new TextActionResult(["you pick up the colourful flower", "silly that isn't a real flower!"]);
    }
}
