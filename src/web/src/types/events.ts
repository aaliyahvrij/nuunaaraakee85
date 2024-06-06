import { GameServiceEvent } from "../services/gameService";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";

export type EditGameObjectEvent = GameServiceEvent<GameObjectFormResult>;
export type DeleteGameObjectEvent = GameServiceEvent<{ id: number }>;
