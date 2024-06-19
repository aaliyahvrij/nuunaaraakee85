import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { queryGameObjects, deleteGameObject, editGameObject } from "../services/routeServices";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

@customElement("game-object-list")
export class GameObjectList extends LitElement {
    @property({ type: Array }) public gameObjects: GameObjectFormResult[] = [];
    @state() private isEditing: boolean = false;
    @state() private editingGameObject: GameObjectFormResult | null = null;

    public static styles = css`
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
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
            console.error("Error fetching game objects:", error);
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
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.gameObjects.map((obj) => html`
                        <tr>
                            <td>${obj.name}</td>
                            <td>${obj.description}</td>
                            <td>
                                <button @click="${(): any => this.handleDeleteClick(obj.id)}">Delete</button>
                                <button @click="${(): void => this.startEditing(obj)}">Edit</button>
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
                    Name:
                    <input type="text" name="name" .value="${this.editingGameObject.name}" />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" .value="${this.editingGameObject.description}" />
                </label>
                <label>
                    Alias:
                    <input type="text" name="alias" .value="${this.editingGameObject.alias}" />
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

    private async handleDeleteClick(id: number | undefined): Promise<void> {
        if (id !== undefined) {
            await this.deleteGameObject(id);
        } else {
            console.error("GameObject ID is undefined");
        }
    }

    private async deleteGameObject(id: number): Promise<void> {
        const confirmed: boolean = confirm("Are you sure you want to delete this GameObject?");
        if (confirmed) {
            const success: boolean = await deleteGameObject(id);
            if (success) {
                this.gameObjects = this.gameObjects.filter((obj) => obj.id !== id);
            } else {
                console.error("Error deleting game object");
            }
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
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            alias: formData.get("alias") as string,
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
//commit