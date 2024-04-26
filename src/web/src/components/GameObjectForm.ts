
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";


@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property({ type: String }) public selectedType: string = "item";
    @property({ type: Object }) public formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "",
        price: undefined, 
        hp: undefined
    };
    

    

    private async dataClick(): Promise<void> {
    
        const data: GameObjectFormResult = {
            alias: this.formData.alias,
            name: this.formData.name,
            description: this.formData.description,
            type: this.selectedType,
            price: this.selectedType === "item" ? this.formData.price : undefined,
            hp: this.selectedType === "character" ? this.formData.hp : undefined
        };

        console.log("Ingevoerde gegevens:", data);

        try{
            
            const addGame: boolean = await addGameObject(data);
            if (addGame){
                console.log("het toevoegen van een GameObject is gelukt!");
            } else{
                console.error(" het toevoegen van een GameObject is mislukt!");
            }

        } catch (error) {
            console.error("Er is een fout");
        }
        
    }
    



    public render(): TemplateResult {
        

        return html`
            <p>Hello world!</p>

            <label for="alias">Alias:</label>
            <input type="text" @input=${this.changeAlias}  id="alias" name="alias">


            <label for="name">Name:</label>
            <input type="text" @input=${this.changeName}  id="name" name="name">

            <label for="description">Description:</label>
            <textarea id="description" @input=${this.changeDescription}  name="description"></textarea>

            <label for="type">Choose a type:</label>
            <select name="type" id="type"  @change="${this.selectType}">
            <option value="item">Item</option>
            <option value="room"> Room</option>
            <option value="character">Character</option>
            </select>

            ${this.renderComboBox()}<br>

            <button @click="${this.dataClick}">submit ${this.selectedType}</button>
            
            
        `;

    
    }

    
// eventlistners
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


    private selectType(event: Event): void {
        const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
        this.selectedType = selectElement.value;
    }

    private changePrice(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.price = parseFloat(input.value);;
      }

      private changeHp(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.hp = parseFloat(input.value);
      }



    private renderComboBox(): TemplateResult {
        if (this.selectedType === "item") {
            return html`
                <label for="price">Price:</label>
                <input type="number" @input=${this.changePrice} id="price" name="price" min="0" step="0.01"><br>
            `;
        } else if (this.selectedType === "character") {
            return html`
                <label for="hp">Health Points:</label>
                <input type="number" @input=${this.changeHp} id="hp" name="hp" min="0" step="1"><br>
            `;
        } else {
            return html``;
        }
    }
}



