export type PlayerSession = {
    correctRiddle: any;
    BookExamine: boolean;
    lever: boolean;
    torenkamer: boolean;
    table: boolean;
    currentRoom: string;
    inventory: string[];
    actionsTaken: string[];
};
