import { GameObjectFormResult } from "../components/GameObjectFormResult";

const API_URL: string = "http://localhost:3001"; // Pas dit aan naar de gewenste URL voor je API

export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${API_URL}/gameobject/add`, {
            method: "POST",
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
        console.error("Error adding game object:", error);
        return false;
    }
}

