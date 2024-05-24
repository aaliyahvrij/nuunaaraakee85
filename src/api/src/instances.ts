import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacter, ExampleCharacterAlias } from "./Salina/characters/ExampleCharacter";
import { LibraryCharacter, LibraryCharacterAlias } from "./Salina/characters/LibraryCharacter";
import { ExampleItem, ExampleItemAlias } from "./Salina/items/ExampleItem";
import { ParchmentItem, ParchmentItemAlias } from "./Salina/items/ParchmentItem";
import { BookItem, BookItemAlias } from "./Salina/items/BookItem";
import { getRoomByAlias as getRoomByAliasSalina } from "./Salina/instances";
import { PlayerSession } from "./types";
import { WindowItemAlias, WindowItem } from "./Salina/items/WindowItem";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        pickedUpParchment: false,
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
    const room: Room | undefined = getRoomByAliasSalina(alias);

    if (room) {
        return room;
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

        case ParchmentItemAlias:
            return new ParchmentItem();

        case LibraryCharacterAlias:
            return new LibraryCharacter();

        case BookItemAlias:
            return new BookItem();

        case WindowItemAlias:
            return new WindowItem();

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
