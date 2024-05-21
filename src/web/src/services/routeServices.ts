import { GameObjectFormResult } from "@shared/GameObjectFormResult";

export async function queryGameObjects(): Promise<GameObjectFormResult[]> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobjects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch game objects: ${response.statusText}`);
        }

        const data: GameObjectFormResult[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching game objects:", error);
        throw error;
    }
}


export async function deleteGameObject(id: number): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete game object: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting game object:", error);
        return false;
    }
}

export async function editGameObject(id: number, gameObjectData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/${id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameObjectData),
        });

        if (!response.ok) {
            throw new Error(`Failed to edit game object: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Error editing game object:", error);
        return false;
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

