# Sequentiediagram Documentatie

Dit document beschrijft het proces van de interactie tussen de gebruiker, de browser (frontend), de API (backend) en de database.

**Opmerking**: Dit diagram is gemaakt met behulp van [WebSequenceDiagrams](https://www.websequencediagrams.com/).


![alt text](<sequence diagram.png>)

## Procesbeschrijving

1. **Gebruiker vult het formulier in**: De gebruiker vult de velden in het formulier in.
2. **Gebruiker klikt op Verzenden**: De gebruiker klikt op de knop "Verzenden".
3. **Frontend stuurt een verzoek naar de API**: De browser stuurt de gegevens naar de API.
4. **API valideert de gegevens**: De API controleert of de gegevens correct zijn.
   - *Als de gegevens niet correct zijn*: De API stuurt een foutmelding naar de browser.
   - *Als de gegevens correct zijn*: Ga door naar stap 5.
5. **API voegt gegevens toe aan de database**: De API slaat de gegevens op in de database.
   - *Als het opslaan niet lukt*: De API stuurt een foutmelding naar de browser.
   - *Als het opslaan lukt*: De API stuurt een succesmelding naar de browser.
6. **Gebruiker ziet een succes- of foutmelding**: De gebruiker ziet een bericht of het opslaan is gelukt of niet.
7. **Gebruiker vraagt om game-objecten op te halen**: De gebruiker wil de lijst met game-objecten zien.
8. **Frontend stuurt een verzoek naar de API**: De browser vraagt de lijst met game-objecten op bij de API.
9. **API haalt game-objecten op uit de database**: De API haalt de game-objecten uit de database.
   - *Als het ophalen niet lukt*: De API stuurt een foutmelding naar de browser.
   - *Als het ophalen lukt*: De API stuurt de lijst met game-objecten naar de browser.
10. **Frontend update de gebruikersinterface**: De browser toont de lijst met game-objecten aan de gebruiker.
    - *Als het ophalen niet lukt*: De browser toont een foutmelding.
    - *Als het ophalen lukt*: De browser toont de game-objecten.


