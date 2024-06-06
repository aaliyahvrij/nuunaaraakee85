import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { BookItemAlias } from "../items/BookItem";

export const LibraryCharacterAlias: string = "portrait";

export class LibraryCharacter extends Character implements Examine {

    public constructor() {
        super(LibraryCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "portrait";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a portrait. Apparently it can be talked to."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            return new TextActionResult(["I will give you a hint. But only after you find a book for me. You see, i lost it and i can't really move around... Help me and i'll help you."]);
        } else if(choiceId === 2) {
            return new TextActionResult(["Goodbye. I wish you good luck."]);
        } else if(choiceId === 3) {
            playerSession.inventory = [];
            return new TextActionResult(["Thank you so much! As promised, here is my hint: If you shed some light on the parchment, maybe it will help you see better."]);
        } else if(choiceId === 4) {
        return new TextActionResult(["You need to get the key in order to leave this room. To do that you need to put the books in right order. But watch out! The bookshelf is enchanted! So you have to look closely."]);
    }
        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Give me a hint"),
            new TalkChoiceAction(2, "Leave the painting alone"),
            new TalkChoiceAction(4, "How do i solve the puzzle here?"),
        ];
   
        if (playerSession.inventory.includes(BookItemAlias)) {
            choiceActions.push(new TalkChoiceAction (3, "Give the book to the portrait"));
        }
        //if (playerSession.hasTalkedToPortrait) {
       //     if (playerSession.inventory.includes(BookItemAlias)) {
        //        choiceActions.push(new TalkChoiceAction(3, "Give the book to the portrait"));
        //    }
      //  }

        return new TalkActionResult(this, 
            ["Hello! I am the librarian. No one has been here for a long time. You need to solve the puzzle here if you want to go to the next room."], 
            choiceActions
        );
    }
}
