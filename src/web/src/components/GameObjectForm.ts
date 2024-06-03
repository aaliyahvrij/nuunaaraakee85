import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property() private selectedOption: string = "";
    @property() public formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "",
        price: undefined,
        hp: undefined,
    };

    private handleChange(event: Event): void {
        const target: HTMLSelectElement = event.target as HTMLSelectElement;
        this.selectedOption = target.value;
    }

    @property() public messageField: string = "";
    @property() public messageResponse: string = "";

    public static styles = css`
        .valid {
            color: green;
        }
        .error {
            color: red;
        }
    `;

    private async handleButtonClick(): Promise<void> {
        this.formData = {
            alias: this.formData.alias,
            name: this.formData.name,
            description: this.formData.description,
            type: this.selectedOption,
            price: this.selectedOption === "item" ? this.formData.price : undefined,
            hp: this.selectedOption === "character" ? this.formData.hp : undefined,
        };

        console.log("Data:", this.formData);

        try {
            const addingGameObject: boolean = await addGameObject(this.formData);
            if (addingGameObject) {
                this.messageField = "Adding GameObject was succesfull";
                this.messageResponse = "valid";
                console.log("added GameObject succesfull");
            } else {
                this.messageField = " Adding GameObject was unsuccesfull";
                this.messageResponse = "error";
                console.error(" Adding GameObject was unsuccesfull");
            }
        } catch (error) {
            ("something went wrong");
        }
    }

    public render(): TemplateResult {
        let additionalInput: TemplateResult | null = null;

        if (this.selectedOption === "item") {
            additionalInput = html`<div>
                <label for="itemPrice">Item price:</label>
                <input type="number" @input="${this.changePrice} id" ="price" min="0" step="0.1" />
            </div>`;
        }

        if (this.selectedOption === "character") {
            additionalInput = html`<div>
                <label for="CharacterHP">Character Health Points:</label>
                <input type="number" @input="${this.changeHp} id" ="hp" min="0" step="1" />
            </div>`;
        }

        return html`
           <p>Hello world!</p>

            <div class="${this.messageResponse}">${this.messageField}</div>

            <label for="alias">Alias:</label>
            <input type="text" @input=${this.changeAlias}  id="alias" name="alias">


            <label for="name">Name:</label>
            <input type="text" @input=${this.changeName}  id="name" name="name">

            <label for="description">Description:</label>
            <textarea id="description" @input=${this.changeDescription}  name="description"></textarea>

            <label for="type">Choose a type:</label>
            <select name="type" id="type"  @change="${this.selectOption}">
            <option value="item">Item</option>
            <option value="room"> Room</option>
            <option value="character">Character</option>
            </select>

                ${additionalInput}

                <button @click="${this.handleButtonClick}">Add ${this.selectedOption}</button>
            </div>
        `;
    }

    private changeAlias(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.alias = input.value;
    }

    private changeDescription(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.description = input.value;
    }

    private changeName(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.name = input.value;
    }

    private selectOption(event: Event): void {
        const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
        this.selectedOption = selectElement.value;
    }

    private changePrice(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.price = parseFloat(input.value);
    }

    private changeHp(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.hp = parseFloat(input.value);
    }
}
