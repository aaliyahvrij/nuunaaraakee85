import { MagicalBookCharacter } from "../characters/MagicalBookCharacter";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";

// Simuleer de speler die het antwoord invoert
function playerInput(answer: string) {
    const bookCharacter = new MagicalBookCharacter();
    const result = bookCharacter.submitAnswer(answer);
    displayResult(result);
}

function displayResult(result: ActionResult) {
    if (result instanceof TextActionResult) {
        console.log(result.text.join("\n"));
    } else if (result instanceof TalkActionResult) {
        console.log(result.text.join("\n"));
        // Display choices to the player if any
        if (result.choices) {
            result.choices.forEach(choice => {
                console.log(`${choice.id}: ${choice.text}`);
            });
        }
    }
}

// Voorbeeld van spelerinput
playerInput("Echo");  // Correct answer
playerInput("Noise"); // Incorrect answer
