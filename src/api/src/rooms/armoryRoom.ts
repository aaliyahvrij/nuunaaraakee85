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
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { axeItem, axeItemAlias } from "../items/axeItem";
import { crossbowItem, crossbowItemAlias } from "../items/crossbowItem";
import { daggerItem, daggerItemAlias } from "../items/daggerItem";
import { hammerItem, hammerItemAlias } from "../items/hammerItem";
import { maceItem, maceItemAlias } from "../items/maceItem";
import { shieldItem } from "../items/shieldItem";
import { spearItem, spearItemAlias } from "../items/spearItem";
import { swordItem, swordItemAlias } from "../items/swordItem";
import { PlayerSession } from "../types";

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
        return [new ExamineAction(), 
            new TalkAction(), 
            new CustomAction("test-me", "Inspect the Armory", false,),
            new chooseWeaponAction()
        ];
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
        return new TextActionResult(["Welcome to the Armory!", "Here, you'll forge the weapons of your destiny."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "test-me")

            return new TextActionResult([" You notice a particular weapon on the wall that seems significant.", 
            "It might be worth examining it more closely to see if it matches the shield in the center of the room."]);

            return undefined;

    }


    



}
  