import { Room } from "../base/gameObjects/Room";
import { ExampleRoomAlias, ExampleRoom } from "./rooms/ExampleRoom";
import { LibraryRoomAlias, LibraryRoom } from "./rooms/LibraryRoom";
import { StartupRoomAlias, StartupRoom } from "./rooms/StartupRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();

        case LibraryRoomAlias:
            return new LibraryRoom();
    }

    return undefined;
}