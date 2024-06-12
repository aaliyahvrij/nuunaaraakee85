export type PlayerSession = {
    currentRoom: string;
    inventory: string[];
    actionsTaken: string[];
    hasTalkedToDoorCharacter: boolean;
    hasGivenSerum: boolean;
    hasTalkedToMonk: boolean;
    hasTalkedtoStone: boolean;
    hasTalkedToCave: boolean;
    hints: number;
};
