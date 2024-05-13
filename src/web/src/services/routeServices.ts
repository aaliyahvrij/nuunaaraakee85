import { GameObjectFormResult } from "@shared/GameObjectFormResult";

// Functie om game-objecten op te halen van het API-endpoint
export async function queryGameObjects(): Promise<any[]> {
    try {
        const response:any = await fetch("/api/gameobjects");
        if (!response.ok) {
            throw new Error("Failed to fetch game objects");
        }
        return await response.json() as any[]; // Type-annotatie toegevoegd
    } catch (error) {
        console.error("Error querying game objects:", error);
        throw error;
    }
}

export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return response.ok;
    } catch (error) {
        console.error("Error adding game object:", error);
        return false;
    }
}

// Functie om een game-object te verwijderen via het API-endpoint
export async function deleteGameObject(id: number): Promise<boolean> {
    try {
        const response: Response = await fetch(`/api/gameobject/${id}/delete`, {
            method: "DELETE",
        });

        return response.ok;
    } catch (error) {
        console.error("Error deleting game object:", error);
        return false;
    }
}