export type PlayerSession = {
    BookExamine: boolean;
    lever: boolean;
    torenkamer: boolean;
    table: boolean;
    currentRoom: string;
    inventory: string[];
    actionsTaken: string[];
};
