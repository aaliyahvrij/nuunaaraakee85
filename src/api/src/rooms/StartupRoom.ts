import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
//import { ExampleRoom } from "./ExampleRoom";
import { ObservatoryRoom, ObservatoryRoomAlias } from "./ObservatoryRoom";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { BigHall } from "./BigHall";
import { ExampleRoom } from "./ExampleRoom";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Example Game";
    }

    public images(): string[] {
        return ["startup"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: BigHall = new BigHall();
            const playerSession: PlayerSession = getPlayerSession();

            //Set the current room to the example room
            playerSession.currentRoom = room.alias;
            playerSession.actionsTaken = [];

            return room.examine();
            
            // const room: Room | undefined = getRoomByAlias(ObservatoryRoomAlias);
            // if (room){
            //     getPlayerSession().currentRoom = room.alias
            //     return room.examine();
            // }
            // return room
            
        }

        return undefined;
    }
}
