import { GameObjectFormResult } from "../shared/GameObjectFormResult";

export async function addGameObject(gameObjectFormResult: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FormData),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

    return Boolean(gameObjectFormResult);
}
