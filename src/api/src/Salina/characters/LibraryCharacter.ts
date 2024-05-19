import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { ParchmentItemAlias } from "../items/ParchmentItem";
import { PlayerSession } from "../../types";

export const LibraryCharacterAlias: string = "portrait";

export class LibraryCharacter extends Character implements Examine {

    public constructor() {
        super(LibraryCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "portrait";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a portrait."]);
    }


    public talk(choiceId?: number | undefined): ActionResult | undefined {
      
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            return new TextActionResult(["Pookie.. You're making me nervous. O///O"]);
        }
        else if(choiceId === 2) {
            return new TextActionResult(["Goodbye Pookie..."]);
        }
      
        else if(choiceId === 3){

            playerSession.inventory = [];

            return new TextActionResult(["You gave the parchment to the painting."]);
        }
        


        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Oogle at the painting"), new TalkChoiceAction(2, "Leave the painting alone")
        ];

   
     if (playerSession.inventory.includes(ParchmentItemAlias)) {
        choiceActions.push(new TalkChoiceAction (3, "Give the parchment to the portrait"));
    }
    
        return new TalkActionResult(this, 
            ["hi pookie!"], 
            choiceActions
        );
    }}
