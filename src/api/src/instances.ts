import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { blackFlowerAlias, blackFlowerItem } from "./items/blackFlower";
import { pinkFlowerAlias, pinkFlowerItem } from "./items/pinkFlower";
import { rainbowFlowerAlias, rainbowFlowerItem } from "./items/rainbowFlower";
import { redFlowerAlias, redFlowerItem } from "./items/redFlower";
import { whiteFlowerAlias, whiteFlowerItem } from "./items/whiteFlower";
import { yellowFlowerAlias, yellowFlowerItem } from "./items/yellowFlower";
import { ExampleRoom, ExampleRoomAlias } from "./rooms/ExampleRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";
import { serumALias, serumItem } from "./items/serum";
import { Room3, Room3Alias } from "./rooms/Room3";
import { DoorCharacter, DoorCharacterAlias } from "./characters/DoorCharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();

        case Room3Alias:
            return new Room3();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();

        case redFlowerAlias:
            return new redFlowerItem();

        case yellowFlowerAlias:
            return new yellowFlowerItem();

        case blackFlowerAlias:
            return new blackFlowerItem();

        case whiteFlowerAlias:
            return new whiteFlowerItem();

        case rainbowFlowerAlias:
            return new rainbowFlowerItem();

        case pinkFlowerAlias:
            return new pinkFlowerItem();

        case serumALias:
            return new serumItem();

        case DoorCharacterAlias:
            return new DoorCharacter();
        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
