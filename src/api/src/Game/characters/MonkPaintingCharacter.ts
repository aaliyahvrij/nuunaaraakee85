import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession, getRoomByAlias } from "../../instances";
import { PlayerSession } from "../../types";

export const monkPaintingCharacterAlias: string = "monk-character";

export class MonkPaintingCharacter extends Character implements Examine {
    public constructor() {
        super(monkPaintingCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Monk Painting";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The paintings description has written:",
            "A monk sitting cross-legged in deep meditation within a tranquil temple.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        playerSession.hasGivenSerum = false;
        playerSession.hasTalkedToMonk = true;

        if (choiceId === 1) {
            playerSession.hints++;
            playerSession.hasTalkedToMonk = false;
            playerSession.hasGivenSerum = true;

           if (playerSession.hints > 3) {
                const TorenKamerRoom | undefined = getRoomByAlias(TorenKamerAlias);
                if (torenKamer) {
                    playerSession.currentRoom = torenKamer.alias;
                    playerSession.hints = 0;
                    return torenKamer.examine();
                } else {
                    return new TextActionResult(["You made a coding error :-("]);
                }
            }

            return new TextActionResult([
                "In silence, echoes reveal what is hidden. Seek the place where sounds converge.",
            ]);
        }

        const choiceActions: TalkChoiceAction[] = [new TalkChoiceAction(1, "Listen carefully...")];

        return new TalkActionResult(this, ["*voices..*"], choiceActions);
    }
}
