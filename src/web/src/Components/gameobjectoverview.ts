import { html, LitElement, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { queryGameObjects, deleteGameObject, editGameObject } from "../services/routeService";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

@customElement("gameobject-overview")
export class GameObjectOverview extends LitElement {
    @property({ type: Array }) private gameObjects: GameObjectFormResult[] = [];
    @state() private isEditing: boolean = false;
    @state() private editingGameObject: GameObjectFormResult | null = null;

    public static styles = css`
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 18px;
            text-align: left;
            box-shadow: 0 2px 15px rgba(64, 64, 64, 0.2);
        }
        th, td {
            padding: 12px 15px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f4f4f4;
            color: #333;
            font-weight: bold;
            text-transform: uppercase;
        }
        tr {
            background-color: #fff;
            transition: background-color 0.2s ease-in-out;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        td {
            color: #555;
        }
        th, td {
            text-align: center;
        }
        button {
            padding: 8px 12px;
            margin: 5px;
            border: none;
            background-color: #007bff;
            color: #fff;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }
        button:hover {
            background-color: #0056b3;
        }
        button:focus {
            outline: none;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-width: 400px;
            margin: 20px auto;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        label {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            color: #333;
        }
        input {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 5px;
        }
    `;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.fetchGameObjects();
    }

    private async fetchGameObjects(): Promise<void> {
        try {
            this.gameObjects = await queryGameObjects();
        } catch (error) {
            console.error("Failed to fetch GameObjects", error);
        }
    }

    public render(): TemplateResult {
        return html`
            ${this.isEditing ? this.renderEditForm() : this.renderTable()}
        `;
    }

    private renderTable(): TemplateResult {
        return html`
            <table>
                <thead>
                    <tr>
                        <th>Alias</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.gameObjects.map((gameObject: GameObjectFormResult): TemplateResult => html`
                        <tr>
                            <td>${gameObject.alias}</td>
                            <td>${gameObject.name}</td>
                            <td>${gameObject.description}</td>
                            <td>${gameObject.type}</td>
                            <td>
                                <button @click=${(): Promise<void> => this.deleteGameObject(gameObject.id)}>Delete</button>
                                <button @click=${(): void => this.startEditing(gameObject)}>Edit</button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    private renderEditForm(): TemplateResult {
        if (!this.editingGameObject) return html``;

        return html`
            <form @submit="${this.handleEditSubmit}">
                <label>
                    Alias:
                    <input type="text" name="alias" .value="${this.editingGameObject.alias}" />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" .value="${this.editingGameObject.name}" />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" .value="${this.editingGameObject.description}" />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" .value="${this.editingGameObject.type}" />
                </label>
                <button type="submit">Save</button>
                <button type="button" @click="${this.cancelEditing}">Cancel</button>
            </form>
        `;
    }

    private startEditing(gameObject: GameObjectFormResult): void {
        this.isEditing = true;
        this.editingGameObject = { ...gameObject };
    }

    private async deleteGameObject(id: number | undefined): Promise<void> {
        if (id !== undefined) {
            const confirmed: boolean = confirm("Are you sure you want to delete this GameObject?");
            if (confirmed) {
                const success: boolean = await deleteGameObject(id);
                if (success) {
                    this.gameObjects = this.gameObjects.filter((obj) => obj.id !== id);
                } else {
                    console.error("Error deleting game object");
                }
            }
        } else {
            console.error("GameObject ID is undefined");
        }
    }

    private cancelEditing(): void {
        this.isEditing = false;
        this.editingGameObject = null;
    }

    private async handleEditSubmit(event: Event): Promise<void> {
        event.preventDefault();
        if (!this.editingGameObject) return;

        const formData: FormData = new FormData(event.target as HTMLFormElement);
        const updatedGameObject: GameObjectFormResult = {
            id: this.editingGameObject.id,
            alias: formData.get("alias") as string,
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            type: formData.get("type") as string
        };

        if (this.editingGameObject.id !== undefined) {
            const success: boolean = await editGameObject(this.editingGameObject.id, updatedGameObject);
            if (success) {
                this.isEditing = false;
                await this.fetchGameObjects();
            } else {
                console.error("Error updating game object");
            }
        } else {
            console.error("Editing GameObject ID is undefined");
        }
    }
}
