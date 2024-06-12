import { chooseWeaponAction } from "../actions/chooseWeaponAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { guardCharacter } from "../characters/guardCharacter";
import { getGameObjectsFromInventory, getPlayerSession, getRoomByAlias } from "../instances";
import { axeItem, axeItemAlias } from "../items/axeItem";
import { crossbowItem, crossbowItemAlias } from "../items/crossbowItem";
import { daggerItem, daggerItemAlias } from "../items/daggerItem";
import { hammerItem, hammerItemAlias } from "../items/hammerItem";
import { maceItem, maceItemAlias } from "../items/maceItem";
import { shieldItem } from "../items/shieldItem";
import { spearItem, spearItemAlias } from "../items/spearItem";
import { swordItem, swordItemAlias } from "../items/swordItem";
import { PlayerSession } from "../types";
import { StartupRoomAlias } from "./StartupRoom";

export const armoryRoomAlias: string = "Armory";


export class armoryRoom extends Room {
    

    public constructor(){
        super(armoryRoomAlias);
    }

    public name(): string {
        return "Armory";
    }

    public images(): string[] {
        return [
            "Armory room"
        ];
        
    }

    public actions(): Action[] {
        const actions: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new CustomAction("test-me", "Inspect the Armory", false),
            new chooseWeaponAction()
        ];
    
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.hasGivenCorrectWeapon) {
            actions.push(new CustomAction("unlock-door", "Unlock the door", false));
        }
    
        // if(playerSession.inventory.includes(swordItemAlias))
            
        return actions;
    }

    public objects(): GameObject[] {

        const playerSession: PlayerSession = getPlayerSession();
        

        const objects: GameObject[] =[this, ... getGameObjectsFromInventory()];

        if(!playerSession.inventory.includes(daggerItemAlias)) {
            objects.push( new daggerItem());
        }

        if(!playerSession.inventory.includes(spearItemAlias)) {
            objects.push( new spearItem());
        }


        if(!playerSession.inventory.includes(crossbowItemAlias)) {
            objects.push( new crossbowItem());
        }

        if(!playerSession.inventory.includes(swordItemAlias)) {
            objects.push( new swordItem());
        }

        if(!playerSession.inventory.includes(hammerItemAlias)) {
            objects.push( new hammerItem());
        }

        if(!playerSession.inventory.includes(axeItemAlias)) {
            objects.push( new axeItem());
        }

        if(!playerSession.inventory.includes(maceItemAlias)) {
            objects.push( new maceItem());
        }
        




        objects.push(
        new shieldItem(),
        new guardCharacter(),
        );


        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welcome to the Armory!", "Here, you'll forge the weapons of your destiny. Inspect the Armory "]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "test-me") {
            return new TextActionResult([
                "Examine all the weapons and the shield in the armory to find clues.",
                "The shield holds a clue to which weapon is the right choice.",
                "Once you find the right weapon, talk to the guard and give it to him."
            ]);
        }

        if (alias === "unlock-door") {
            if (playerSession.hasGivenCorrectWeapon) {
                const startupRoom: Room | undefined = getRoomByAlias(StartupRoomAlias);
                if (startupRoom) {
                    playerSession.currentRoom = startupRoom.alias;
                    playerSession.hasGivenCorrectWeapon = false;
                    return startupRoom.examine();
                } else {
                    return new TextActionResult(["You made a coding error :-("]);
                }
            } else {
                return new TextActionResult(["The door remains locked. You need to give the correct weapon to the guard first."]);
            }
        }

        return undefined;
    }
}
   

    




  