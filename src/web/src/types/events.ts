import { GameServiceEvent } from "../services/gameService";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";

export type EditGameObjectEvent = GameServiceEvent<{
    id: number;
    gameObject: GameObjectFormResult;
}>;

export type SaveGameObjectEvent = GameServiceEvent<{
    gameObject: GameObjectFormResult;
}>;

export const editGame: string = "edit-game";

export const saveGame: string = "save-game";
