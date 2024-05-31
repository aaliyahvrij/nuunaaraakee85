import { GameObjectFormResult } from "@shared/GameObjectFormResult";

export async function fetchGameObjects(): Promise<GameObjectFormResult[]> {
    try {
        const response: Response = await fetch("/gameobjects");
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to fetch game objects");
        }
    } catch (error) {
        console.error("Error fetching game objects:", error);
        throw error;
    }
}

export async function deleteGameObject(id: number): Promise<void> {
    try {
        const response: Response = await fetch(`/gameobjects/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete game object");
        }
    } catch (error) {
        console.error("Error deleting game object:", error);
        throw error;
    }
}



export async function updateGameObject(gameObject: GameObjectFormResult): Promise<void> {
    try {
        const response: Response = await fetch(`/gameobjects/${gameObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameObject),
        });
        if (!response.ok) {
            throw new Error("Failed to update game object");
        }
    } catch (error) {
        console.error("Error updating game object:", error);
        throw error;
    }
}