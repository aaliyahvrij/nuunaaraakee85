import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { cavePaintingCharacterAlias, CavePaintingCharacter } from "./Game/characters/CavePaintingCharacter";
import { DoorCharacterAlias, DoorCharacter } from "./Game/characters/DoorCharacter";
import { ExampleCharacter, ExampleCharacterAlias } from "./Game/characters/ExampleCharacter";
import { LibraryCharacterAlias, LibraryCharacter } from "./Game/characters/LibraryCharacter";
import { MagicalBookAlias, MagicalBookCharacter } from "./Game/characters/MagicalBookCharacter";
import { monkPaintingCharacterAlias, MonkPaintingCharacter } from "./Game/characters/MonkPaintingCharacter";
import { guardCharacterAlias, guardCharacter } from "./Game/characters/guardCharacter";
import { PaintingCharacter, PaintingCharacterAlias } from "./Game/characters/paintingCharacter";
import { stonePaintingCharacterAlias, StonePaintingCharacter } from "./Game/characters/StonePaintingCharacter";
import { BlueBookItemAlias, BlueBookItem } from "./Game/items/BlueBookItem";
import { BookItemAlias, BookItem } from "./Game/items/BookItem";
import { BookshelfItemAlias, BookshelfItem } from "./Game/items/BookshelfItem";
import { axeItemAlias, axeItem } from "./Game/items/axeItem";
import { blackFlowerAlias, blackFlowerItem } from "./Game/items/blackFlower";
import { crossbowItemAlias, crossbowItem } from "./Game/items/crossbowItem";
import { daggerItemAlias, daggerItem } from "./Game/items/daggerItem";
import { ExampleItem, ExampleItemAlias } from "./Game/items/ExampleItem";
import { PaintingItemAlias, painting } from "./Game/items/fireplaceitem";
import { GreenBookItemAlias, GreenBookItem } from "./Game/items/GreenBookItem";
import { KeyItemAlias, KeyItem } from "./Game/items/KeyItem";
import { OrangeBookItemAlias, OrangeBookItem } from "./Game/items/OrangeBookItem";
import { ParchmentItemAlias, ParchmentItem } from "./Game/items/ParchmentItem";
import { RedBookItemAlias, RedBookItem } from "./Game/items/RedBookItem";
import { WindowItemAlias, WindowItem } from "./Game/items/WindowItem";
import { hammerItemAlias, hammerItem } from "./Game/items/hammerItem";
import { maceItemAlias, maceItem } from "./Game/items/maceItem";
import { pinkFlowerAlias, pinkFlowerItem } from "./Game/items/pinkFlower";
import { rainbowFlowerAlias, rainbowFlowerItem } from "./Game/items/rainbowFlower";
import { redFlowerAlias, redFlowerItem } from "./Game/items/redFlower";
import { serumALias, serumItem } from "./Game/items/serum";
import { shieldItemAlias, shieldItem } from "./Game/items/shieldItem";
import { spearItemAlias, spearItem } from "./Game/items/spearItem";
import { swordItemAlias, swordItem } from "./Game/items/swordItem";
import { whiteFlowerAlias, whiteFlowerItem } from "./Game/items/whiteFlower";
import { yellowFlowerAlias, yellowFlowerItem } from "./Game/items/yellowFlower";
import { armoryRoom, armoryRoomAlias } from "./Game/rooms/armoryRoom";
import { BigHall, BigHallRoomAlias } from "./Game/rooms/BighallRoom"
import { ExampleRoom, ExampleRoomAlias } from "./Game/rooms/ExampleRoom";
import { GardenChamberAlias, GardenChamber } from "./Game/rooms/gardenChamber";
import { LibraryRoomAlias, LibraryRoom } from "./Game/rooms/LibraryRoom";
import { StartupRoom, StartupRoomAlias } from "./Game/rooms/StartupRoom";
import { PlayerSession } from "./types";
import { Torenkamer, TorenkamerRoomAlias } from "./Game/rooms/Torenkamer";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        correctRiddle: false,
        BookExamine: false,
        lever: false,
        torenkamer: false,
        table: false,
        currentRoom: "startup",
        inventory: [],
        actionsTaken: [],
        hasTalkedToDoorCharacter: false,
        hasGivenSerum: false,
        hasTalkedToMonk: false,
        hasTalkedtoStone: false,
        hasTalkedToCave: false,
        hints: 0,
        chooseWeapons: false,
        hasGivenCorrectWeapon: false,
        pickedUpParchment: false,
        bookGivenToPortrait: false,

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
            
            case BigHallRoomAlias:
                return new BigHall();

        case LibraryRoomAlias:
            return new LibraryRoom();

            case GardenChamberAlias:
            return new GardenChamber();

            case armoryRoomAlias:
            return new armoryRoom();

            case TorenkamerRoomAlias:
                return new Torenkamer();



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
        
        case swordItemAlias:
            return new swordItem();

        case daggerItemAlias:
            return new daggerItem();

        case maceItemAlias:
            return new maceItem();

        case axeItemAlias:
            return new axeItem();

        case shieldItemAlias:
            return new shieldItem();

        case spearItemAlias:
            return new spearItem();

        case crossbowItemAlias:
            return new crossbowItem();

        case hammerItemAlias:
            return new hammerItem();


        case guardCharacterAlias:
            return new guardCharacter();


        case ExampleCharacterAlias:
            return new ExampleCharacter();

            case MagicalBookAlias:
                return new MagicalBookCharacter();
    

        case PaintingCharacterAlias:
            return new PaintingCharacter();

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

        case cavePaintingCharacterAlias:
            return new CavePaintingCharacter();

        case stonePaintingCharacterAlias:
            return new StonePaintingCharacter();

        case monkPaintingCharacterAlias:
            return new MonkPaintingCharacter();
            
        case ParchmentItemAlias:
            return new ParchmentItem();

        case LibraryCharacterAlias:
            return new LibraryCharacter();

        case BookItemAlias:
            return new BookItem();

        case WindowItemAlias:
            return new WindowItem();

        case BlueBookItemAlias:
            return new BlueBookItem();

        case GreenBookItemAlias:
            return new GreenBookItem();

        case RedBookItemAlias:
            return new RedBookItem();

        case OrangeBookItemAlias:
            return new OrangeBookItem();

       case BookshelfItemAlias:
             return new BookshelfItem();

             case KeyItemAlias:
                return new KeyItem();
     
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
