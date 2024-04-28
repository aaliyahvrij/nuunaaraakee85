import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const PaintingCharacterAlias: string = "Painting";

export class PaintingCharacter extends Character implements Examine {
    private hasGreeted: boolean = false;
    private toldJuwel: boolean = false;

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
            return new TalkActionResult(this,
                ["Why are you here?"],
                [new TalkChoiceAction(2, "Tell him about the jewel")]
            );
        } else if (choiceId === 2) {
            this.toldJuwel = true;
            return new TextActionResult(["You start explaining about the jewel."]);
        }

        if (!this.hasGreeted) {
            return new TalkActionResult(this,
                ["Good evening dear adventurer."],
                [new TalkChoiceAction(1, "Say hi")]
            );
        }

    
        return new TextActionResult(["The painting remains silent."]);
    }
}
