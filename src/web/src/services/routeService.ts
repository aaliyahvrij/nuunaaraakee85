import { GameObjectFormResult } from "../shared/GameObjectFormResult";

export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("error with request", error);
        return false;
    }
}

export async function queryGameObjects(): Promise<GameObjectFormResult[]> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobjects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

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

export async function updateGameObject(id: number, formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
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

export async function deleteGameObject(id: number): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/delete/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error with request", error);
        return false;
    }
}
