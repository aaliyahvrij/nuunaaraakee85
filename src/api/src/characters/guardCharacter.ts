import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const guardCharacterAlias: string = "guard";

export class guardCharacter extends Character implements Examine {

    public constructor() {
        super(guardCharacterAlias, ExamineActionAlias);
    }
  

    public name(): string {
        return "Guard";
    }


    public examine(): ActionResult | undefined {
        return new TextActionResult(["You see a A stern-looking guard stands watch in the armory."]);
    } 

    public talk(choiceId?: number | undefined): ActionResult | undefined {

        if(choiceId === 1) {
            return new TextActionResult(["The shield has a specific emblem that matches one of the weapons. Look for the weapon with a similar emblem."]);
        }

        if(choiceId === 2){
            return new TextActionResult(["The right weapon is both light and deadly. Choose wisely"]);
        }

        if(choiceId === 3){
            return new TextActionResult(["This armory has stood for centuries, protecting our land with its finest weapons"]);
        }

        


        
        return new TalkActionResult(this, ["The shield in the center of the room holds the key to choosing the correct weapon. Remember, the right weapon is both light and deadly. If you choose the wrong weapon, you will need to try again."], [
            new TalkChoiceAction(1, "Ask for more details about the shield."), new TalkChoiceAction(2, "Ask for hints about the weapons."), new TalkChoiceAction(3,"Ask about the history of the armory.")
        ]);

      
        
        
    }

    
 

}