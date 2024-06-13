import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const cavePaintingCharacterAlias: string = "cave-character";

export class CavePaintingCharacter extends Character implements Examine {
    public constructor() {
        super(cavePaintingCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cave Painting";
    }

    public examine(): TextActionResult | undefined {
        return new TextActionResult([
            "The paintings description has written:",
            "A dark cave with a faint light illuminating the entrance, showing a path leading deeper inside.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (choiceId === 1) {
            playerSession.hasTalkedToCave = true;

            this.checkVictoryCondition(playerSession);

            return new TextActionResult(["Sounds return in this place, leading you to what you seek."]);
        }

        const choiceActions: TalkChoiceAction[] = [new TalkChoiceAction(1, "Listen carefully...")];

        return new TalkActionResult(this, ["*voices..*"], choiceActions);
    }

    private checkVictoryCondition(playerSession: PlayerSession) {
        console.log("Check victory condition - Cave:");
        console.log("Monk talked:", playerSession.hasTalkedToMonk);
        console.log("Stone talked:", playerSession.hasTalkedtoStone);
        console.log("Cave talked:", playerSession.hasTalkedToCave);

        if (playerSession.hasTalkedToMonk && playerSession.hasTalkedtoStone && playerSession.hasTalkedToCave) {
            playerSession.victory = true;
        }
    }
}
