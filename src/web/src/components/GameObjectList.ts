import { LitElement, html, css, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { queryGameObjects, deleteGameObject } from "../services/routeServices";

interface GameObject {
  id: number;
  name: string;
  description: string;
}

export class GameObjectList extends LitElement {
  @property({ type: Array }) public gameObjects: GameObject[] = [];

  public static styles = css`
        /* CSS-stijlen */
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
    try {
      // Haal game objects op van het API-endpoint
      this.gameObjects = await queryGameObjects();
    } catch (error) {
      console.error("Error fetching game objects:", error);
    }
  }

  public render(): TemplateResult {
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
                    ${this.gameObjects.map(obj => html`
                        <tr>
                          
                            <td>${obj.name}</td>
                            <td>${obj.description}</td>
                            <td>
                            <button @click="${():any => this.deleteGameObject(obj.id)}">Delete</button>
                                <button @click="${():any => this.editGameObject(obj.id)}">Edit</button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
  }

  public async deleteGameObject(id: number): Promise<void> {
    const confirmed: boolean = confirm("Are you sure you want to delete this GameObject?");
    if (confirmed) {
      const success: boolean = await deleteGameObject(id);
      if (success) {
        // Update the list of game objects after deletion
        this.gameObjects = this.gameObjects.filter(obj => obj.id !== id);
      } else {
        console.error("Error deleting game object");
      }
    }
  }

  public async editGameObject(id: number): Promise<void> {
    // Logic for editing a GameObject goes here
    console.log(`Editing GameObject with ID ${id}`);
    // Voeg 'await' toe voor de deleteGameObject-functie
    await deleteGameObject(id);
    // of voeg hier de await expressie toe indien nodig
  }
}

customElements.define("game-object-list", GameObjectList);
