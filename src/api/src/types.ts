export type PlayerSession = {
    correctRiddle: any;
    BookExamine: boolean;
    lever: boolean;
    torenkamer: boolean;
    table: boolean;
    currentRoom: string;
    inventory: string[];
    actionsTaken: string[];
    hasTalkedToDoorCharacter: boolean;
    hasGivenSerum: boolean;
    hasTalkedToMonk: boolean;
    hasTalkedtoStone: boolean;
    hasTalkedToCave: boolean;
    hints: number;
    chooseWeapons: boolean;
    hasGivenCorrectWeapon?: boolean;
    pickedUpParchment: boolean;
    bookGivenToPortrait?: boolean;
  
};
