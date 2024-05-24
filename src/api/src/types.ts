export type PlayerSession = {
    currentRoom: string;
    inventory: string[];
    pickedUpParchment: boolean;
    windowExamined?:boolean;
    bookGivenToPortrait?: boolean;
    hasTalkedToPortrait: boolean;
};
