import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { axeItemAlias } from "../items/axeItem";
import { crossbowItemAlias } from "../items/crossbowItem";
import { daggerItemAlias } from "../items/daggerItem";
import { hammerItemAlias } from "../items/hammerItem";
import { maceItemAlias } from "../items/maceItem";
import { spearItemAlias } from "../items/spearItem";
import { swordItemAlias } from "../items/swordItem";
import { PlayerSession } from "../types";

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

        const playerSession: PlayerSession = getPlayerSession();

        
        if(choiceId === 1) {
            return new TextActionResult(["The shield has a specific emblem that matches one of the weapons. Look for the weapon with a similar emblem."]);
        }


        if(choiceId === 2){
            return new TextActionResult(["The right weapon is both light and deadly. Choose wisely"]);
        }

        // the descreption of the items when the player choose one of the talkchoices
        if(choiceId === 3){
            playerSession.inventory = [];
            return new TextActionResult(["The sword is the right answer! You've chosen wisely. The keyhole opens."]);
        }

        if(choiceId === 4 || choiceId === 5 || choiceId === 6 || choiceId === 7 || choiceId === 8 ){
            playerSession.inventory = [];
            return new TextActionResult(["This is not the correct weapon. Try again."]);
        }



        const  choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Ask for more details about the shield."), 
            new TalkChoiceAction(2, "Ask for hints about the weapons."),

        ];

// the talk choices for each item to talk to de guard
        if(playerSession.inventory.includes(swordItemAlias)) {
         choiceActions.push (
            new TalkChoiceAction(3,"Give the sword to the guard"));
 
        }

        
        if(playerSession.inventory.includes(daggerItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(4,"Give the dagger to the guard"));
    
           }

        if(playerSession.inventory.includes(spearItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(4,"Give the Spear to the guard"));
    
           }


        if(playerSession.inventory.includes(crossbowItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(5,"Give the Crossbow to the guard"));
    
           }

        if(playerSession.inventory.includes(hammerItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(6,"Give the hammer to the guard"));
    
           }

           
        if(playerSession.inventory.includes(axeItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(7,"Give the Axe to the guard"));
    
           }

           if(playerSession.inventory.includes(maceItemAlias)) {
            choiceActions.push (
               new TalkChoiceAction(8,"Give the mace to the guard"));
    
           }


        
        

        return new TalkActionResult(this, 
            ["The shield in the center of the room holds the key to choosing the correct weapon. Remember, the right weapon is both light and deadly. If you choose the wrong weapon, you will need to try again."], 
            choiceActions
        );

      
        
        
    }

    
 

}