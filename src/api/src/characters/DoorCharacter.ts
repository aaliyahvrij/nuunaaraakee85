import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { serumALias } from "../items/serum";
import { PlayerSession } from "../types";

export const DoorCharacterAlias: string = "door-character";

export class DoorCharacter extends Character implements Examine {
    public constructor() {
        super(DoorCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Rusty Door";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This looks like an old rusty door",
            "U hear voices coming from the door...",
        ]);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        playerSession.hasTalkedToDoorCharacter = true;

        if (choiceId === 1) {
            return new TextActionResult(["whaaattt.....doooo...uuuuu...waaannttt??"]);
        } else if (choiceId === 2) {
            return new TextActionResult(["..."]);
        } else if (choiceId === 3) {
            return new TextActionResult(["opeeennnn...usssss...giveeeee...usss...seeeerruuummm"]);
        } else if (choiceId === 4) {
            return new TextActionResult(["looookkkk...aaaaatttt...flooowweeeerrrssss"]);
        } else if (choiceId === 5) {
            if (playerSession.inventory.includes(serumALias)) {
                playerSession.inventory = playerSession.inventory.filter((item) => item !== serumALias);
                playerSession.hasGivenSerum = true;
                return new TextActionResult(["You gave the serum to the door"]);
            } else {
                return new TextActionResult(["You don't have the serum"]);
            }
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Hi door!"),
            new TalkChoiceAction(2, "You look rough..."),
            new TalkChoiceAction(3, "How can I open u?"),
            new TalkChoiceAction(4, "How?"),
        ];

        if (playerSession.inventory.includes(serumALias)) {
            choiceActions.push(new TalkChoiceAction(5, "Give the serum to the door"));
        }

        return new TalkActionResult(this, ["*voices..*"], choiceActions);
    }
}
