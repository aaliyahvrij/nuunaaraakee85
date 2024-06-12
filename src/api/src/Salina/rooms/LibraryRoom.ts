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
import { WindowItem, WindowItemAlias } from "../items/WindowItem";
import { UseAction } from "../actions/UseAction";
import { BookType, BookshelfItem } from "../items/BookshelfItem";
import { KeyItem } from "../items/KeyItem";
import { BookItem, BookItemAlias } from "../items/BookItem";
import { NextRoomAction } from "../actions/NextroomAction";


export const LibraryRoomAlias: string = "library-room";

export class LibraryRoom extends Room {
    private bookshelf: BookshelfItem;
    private correctOrder: BookType[];
    private allowedShuffles: BookType[][] = [
        [BookType.Blue, BookType.Red, BookType.Green, BookType.Orange],
        [BookType.Red, BookType.Orange, BookType.Blue, BookType.Green],
        [BookType.Green, BookType.Blue, BookType.Orange, BookType.Red],
        [BookType.Orange, BookType.Green, BookType.Red, BookType.Blue],
        [BookType.Red, BookType.Blue, BookType.Orange, BookType.Green]
    ];

    public constructor() {
        super(LibraryRoomAlias);
        this.bookshelf = new BookshelfItem();
        this.correctOrder = [BookType.Blue, BookType.Red, BookType.Green, BookType.Orange];
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
            new CustomAction("examine-bookshelf", "Examine the bookshelf", false),
            new CustomAction("check-puzzle", "Check if the puzzle is solved", false),
            new CustomAction("test-me", "Look at the floor", false),
            new CustomAction("reveal-code", "Reveal the code with the hint", false),
            new NextRoomAction()  // Add the new action here
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
        objects.push(this.bookshelf); // Voeg dezelfde bookshelf toe
        objects.push(new LibraryCharacter());

        // Debug log
        console.log("Objects in the room:", objects.map(obj => obj.alias));

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a beautiful library!!", "You can see a lot of roughed up books and papers."]);
    }

    public custom(alias: string, gameObjects: GameObject[] | undefined, _targetObjectAlias?: string): TextActionResult | undefined {
        if (alias === "examine-bookshelf") {
            const books: BookType[] = this.bookshelf.getBooks();
            const booksString: string = books.map(book => book.toString()).join(", ");
            return new TextActionResult([`The books on the bookshelf are: ${booksString}`]);
        } else if (alias === "shuffle-books") {
            this.bookshelf.shuffleBooks();
            if (this.checkPuzzle()) {
                this.updatePlayerInventoryWithKey();
                return new TextActionResult(["Congratulations! You solved the puzzle by shuffling the books and found the key! Now you can go to the next room!"]);
            }
            return new TextActionResult(["You shuffled the books on the bookshelf."]);
        } else if (alias === "check-puzzle") {
            if (this.checkPuzzle()) {
                this.updatePlayerInventoryWithKey();
                return new TextActionResult(["Congratulations! You solved the puzzle and found the key! Now you can go to the next room!"]);
            } else {
                return new TextActionResult(["The puzzle is not solved yet."]);
            }
        } else if (alias === "reveal-code" && gameObjects) {
            const inventory: GameObject[] = getGameObjectsFromInventory();
            const window: GameObject | undefined = gameObjects.find(obj => obj.alias === WindowItemAlias) || inventory.find(obj => obj.alias === WindowItemAlias);
            const parchment: GameObject | undefined = gameObjects.find(obj => obj.alias === ParchmentItemAlias) || inventory.find(obj => obj.alias === ParchmentItemAlias);

            if (!window) {
                return new TextActionResult(["No, that can't be right..."]);
            }

            if (!parchment) {
                return new TextActionResult(["No, that doesn't seem right...?"]);
            }

            const useAction: any = new UseAction();
            return useAction.perform(window);
        } else if (alias === "test-me") {
            return new TextActionResult(["You looked at the floor. It's a boring floor."]);
        }
        return undefined;
    }

    private checkPuzzle(): boolean {
        const currentOrder: BookType[] = this.bookshelf.getBooks();
        for (let i:any = 0; i < this.correctOrder.length; i++) {
            if (currentOrder[i] !== this.correctOrder[i]) {
                return false;
            }
        }
        return true;
    }

    private updatePlayerInventoryWithKey(): void {
        const playerSession: PlayerSession = getPlayerSession();
        const keyItem:any = new KeyItem();
        if (!playerSession.inventory.includes(keyItem.alias)) {
            playerSession.inventory.push(keyItem.alias);
        }
    }
}
