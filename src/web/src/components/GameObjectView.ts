import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { deleteGameObject, fetchGameObjects, updateGameObject } from "../services/gameObjectService";



@customElement("gameobject-view")
export class GameObjectView extends LitElement {
    
    @property({ type: Array }) public gameObjects: GameObjectFormResult[] = [];

    public static styles = css`
    
    table {
        width: 100%;
        border-collapse: collapse;
        background-color: #ffe6e6; 
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #ffcccc; 
    }
    tr:nth-child(even) {
        background-color: #ffe6e6; 
    }
    tr:nth-child(odd) {
        background-color: #ffffff; 
    }
`;


public async connectedCallback(): Promise<void> {
    super.connectedCallback();
    try {
        this.gameObjects = await fetchGameObjects();
    } catch (error) {
        // Behandel fouten bij het ophalen van gegevens
    }
}



private async confirmDelete(id: number): Promise<void> {
    if (confirm("Are you sure you want to delete this game object?")) {
        try {
            await deleteGameObject(id);
            this.gameObjects = await fetchGameObjects(); // Update de lijst na verwijdering
        } catch (error) {
            // Behandel fouten bij het verwijderen van gegevens
        }
    }
}


private handleDeleteClick(id?: number): void {
    if (id !== undefined) {
        void this.confirmDelete(id);
    } else {
        console.error("Game object ID is undefined");
    }
}



private handleEditClick(gameObject: GameObjectFormResult): void {
    const newAlias: string | null = prompt("Enter new alias:", gameObject.alias);
    const newName: string | null = prompt("Enter new name:", gameObject.name);
    const newDescription: string | null = prompt("Enter new description:", gameObject.description);
    const newType: string | null = prompt("Enter new type:", gameObject.type);
    const newPrice: string | null = gameObject.type === "item" ? prompt("Enter new price:", gameObject.price?.toString() ?? "") : null;
    const newHp: string | null = gameObject.type === "character" ? prompt("Enter new HP:", gameObject.hp?.toString() ?? "") : null;

    

    if (newAlias && newName && newDescription && newType) {
        const updatedGameObject: GameObjectFormResult ={
            ...gameObject,
            alias: newAlias,
            name: newName,
            description: newDescription,
            type: newType,
            price: newPrice ? parseFloat(newPrice) : undefined,
            hp: newHp ? parseInt(newHp) : undefined,
        };

        void this.confirmUpdate(updatedGameObject);
    }
}

private async confirmUpdate(gameObject: GameObjectFormResult): Promise<void> {
    try {
        await updateGameObject(gameObject);
        this.gameObjects = await fetchGameObjects();
    } catch (error) {
        console.error("Error updating game object:", error);
    }
}



    public render(): TemplateResult {
        
        return html`
            <table>
                <thead>
                    <tr>
                        <th>Alias</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>HP</th>
                    </tr>
                </thead> 
                <tbody>
                ${this.gameObjects.map((gameObject) => html`
                        <tr>
                            <td>${gameObject.alias}</td>
                            <td>${gameObject.name}</td>
                            <td>${gameObject.description}</td>
                            <td>${gameObject.type}</td>
                            <td>${gameObject.price ?? "-"}</td>
                            <td>${gameObject.hp ?? "-"}</td>
                        </tr>
                        <td>
                        <button @click=${(): void => this.handleDeleteClick(gameObject.id)}>Delete</button>
                        <button @click=${(): void => this.handleEditClick(gameObject)}>Edit</button>
                        </td>
                    `)}
                </tbody>
            </table>
        `;

    
    }
}

