import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const monkPaintingCharacterAlias: string = "monk-character";

export class MonkPaintingCharacter extends Character implements Examine {
    public constructor() {
        super(monkPaintingCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Monk Painting";
    }

    public examine(): TextActionResult | undefined {
        return new TextActionResult([
            "The paintings description has written:",
            "A monk sitting cross-legged in deep meditation within a tranquil temple.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (choiceId === 1) {
            playerSession.hasTalkedToMonk = true;
            return new TextActionResult(["In silence, echoes reveal what is hidden. Seek the place where sounds converge."]);
        }

        const choiceActions: TalkChoiceAction[] = [new TalkChoiceAction(1, "Listen carefully...")];

        return new TalkActionResult(this, ["*voices..*"], choiceActions);
    }

    private checkVictoryCondition(playerSession: PlayerSession) {
        console.log("Check victory condition - Monk:");
        console.log("Monk talked:", playerSession.hasTalkedToMonk);
        console.log("Stone talked:", playerSession.hasTalkedtoStone);
        console.log("Cave talked:", playerSession.hasTalkedToCave);

        if (playerSession.hasTalkedToMonk && playerSession.hasTalkedtoStone && playerSession.hasTalkedToCave) {
            playerSession.victory = true;
        }
    }
}
