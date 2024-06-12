import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession} from "../../instances";
import { PlayerSession } from "../../types";

export const stonePaintingCharacterAlias: string = "stone-character";

export class StonePaintingCharacter extends Character implements Examine {
    public constructor() {
        super(stonePaintingCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Stone Painting";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The paintings description has written:",
            "A radiant stone glowing softly, set within an ornate frame. The stone seems to emit a gentle light that illuminates its surroundings.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        playerSession.hasGivenSerum = false;
        playerSession.hasTalkedtoStone = true;

        if (choiceId === 1) {
            playerSession.hints++;
            playerSession.hasTalkedtoStone = false;
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
                "rests in silence, concealed within the walls. Let the sounds guide you",
            ]);
        }

        const choiceActions: TalkChoiceAction[] = [new TalkChoiceAction(1, "Listen carefully...")];

        return new TalkActionResult(this, ["*voices..*"], choiceActions);
    }
}
