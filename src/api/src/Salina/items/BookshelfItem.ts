import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";

export enum BookType {
    Blue = "Blue",
    Red = "Red",
    Green = "Green",
    Orange = "Orange"
}

export const BookshelfItemAlias: string = "bookshelf";

export class BookshelfItem extends GameObject implements Examine {
    public books: BookType[];

    // Definieer de toegestane shuffles buiten de constructor
    private allowedShuffles: BookType[][] = [
        [BookType.Blue, BookType.Red, BookType.Green, BookType.Orange],
        [BookType.Red, BookType.Orange, BookType.Blue, BookType.Green],
        [BookType.Green, BookType.Blue, BookType.Orange, BookType.Red],
        [BookType.Orange, BookType.Green, BookType.Red, BookType.Blue],
        [BookType.Red, BookType.Blue, BookType.Orange, BookType.Green]
    ];

    public constructor() {
        super(BookshelfItemAlias, ExamineActionAlias);
        const randomIndex: number = Math.floor(Math.random() * this.allowedShuffles.length);
        this.books = this.allowedShuffles[randomIndex];
    }

    public name(): string {
        return "Bookshelf";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's an enchanted bookshelf. *You hear some snickering from the bookshelf*"]);
    }

    public getBooks(): BookType[] {
        return this.books;
    }

    // Methode om de boeken te shuffelen
    public shuffleBooks(): void {
        const randomIndex: number = Math.floor(Math.random() * this.allowedShuffles.length);
        this.books = this.allowedShuffles[randomIndex];
    }

    // Methode om de huidige shuffle te vergelijken met de juiste volgorde
    public checkPuzzle(): boolean {
        // Definieer de juiste volgorde van de boeken
        const correctOrder: BookType[] = [BookType.Blue, BookType.Red, BookType.Green, BookType.Orange];
        
        // Controleer of de huidige shuffle overeenkomt met de juiste volgorde
        for (let i:any = 0; i < correctOrder.length; i++) {
            if (this.books[i] !== correctOrder[i]) {
                return false;
            }
        }
        
        return true;
    }
}
