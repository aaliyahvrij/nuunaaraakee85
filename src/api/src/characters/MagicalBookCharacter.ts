import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const MagicalBookAlias: string = "MagicalBook";

export class MagicalBookCharacter extends Character implements Examine {
    private whispers: boolean = false;
    public constructor() {
        super(MagicalBookAlias, ExamineActionAlias);
    }
    
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.BookExamine = true;
        return new TextActionResult([
            "Huh, what is that?",
            "Tttttaaalllkkkk tttooo mmmmeeeee"
        ]);
    }

    public name(): string {
        return "Magical Book";
    }
    
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        // Check if the book has been examined
        if (!playerSession.BookExamine) {
            return new TextActionResult(["Examine me first."]);
        }

        if (choiceId === 1) {
            this.whispers = true;
            return new TalkActionResult(
                this,
                [
                    "Dear adventurer, so close yet far,",
                    "Solve my riddle, shine like a star.",
                    "Crack the impossible, make it yours,",
                    "And the jewel will soon be yours."
                ],
                [
                    new TalkChoiceAction(2, "Ask him about the riddle.")
                ]
            );
        } else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "My voice travels through the air, repeating but never the same.",
                    "I grow weaker with each echo, but I never fully disappear.",
                    "What am I?"
                ],
                [
                    new TalkChoiceAction(3, "Try to solve the riddle.")
                ]
            );
        }

        if (!this.whispers) {
            return new TalkActionResult(
                this,
                ["Whhhoooo aaaarrrreee yooooouuuuu"],
                [new TalkChoiceAction(1, "Say that you come for the jewel and mean no harm.")]
            );
        }

        return new TextActionResult(["No whispers are available now."]);
    }
}
