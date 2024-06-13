import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const PaintingCharacterAlias: string = "Painting";
export const FoundJewelInfo: string = "found-jewel-info";

export class PaintingCharacter extends Character implements Examine {
    private hasGreeted: boolean = false;

    public constructor() {
        super(PaintingCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Painting";
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["It's a big painting."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            this.hasGreeted = true; 
            return new TalkActionResult(
                this,
                ["Why are you here?"],
                [
                    new TalkChoiceAction(2, "Tell him about the jewel"),
                ]
            );
            
        } else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Ah, you seek the Nico Jewel... A truly formidable artifact shrouded in mystery and allure."],
                [new TalkChoiceAction(3, "Ask where to find it")]
            );
        }
        
        if(choiceId === 3) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.actionsTaken.push(FoundJewelInfo);
            return new TextActionResult (
                ["The Nico Jewel is not a destination, but a journey. Seek it where the stars kiss the sea, on the Isle of Whispers.", "Or just take the left door, and seek it yourself"]);
        }



        if (!this.hasGreeted) {
            return new TalkActionResult(this,
                ["Good evening, dear adventurer. What brings you to my castle?"],
                [new TalkChoiceAction(1, "Great the painting")]
            );
        }

    
        return new TextActionResult(["The painting remains silent."])

    }
}
