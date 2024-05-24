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
            return new TextActionResult(["Maybe if you shed some light on the parchment, maybe it will help you see better."]);
        } else if(choiceId === 2) {
            return new TextActionResult(["Goodbye. I wish you good luck."]);
        } else if(choiceId === 3) {
            playerSession.inventory = [];
            return new TextActionResult(["You gave the book to the painting."]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Give me a hint"),
            new TalkChoiceAction(2, "Leave the painting alone")
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
