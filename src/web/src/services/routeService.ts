import { GameObjectFormResult } from "@shared/GameObjectFormResult";

export async function addGameObject(formData: GameObjectFormResult): Promise <boolean> {
    try{
        
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response){
            return true;   
        } else {
            return false;
        }
    } catch(error) {
        console.error("een fout bij het uitvoeren van een verzoek", error);
        return false;
    }


}