# Sequence Diagram

In dit document leg ik uit hoe ik mijn sequence diagram heb gemaakt voor mijn individuele opdracht website.

## PlantUML + Code

Voor het maken van mijn sequence diagram heb ik gebruik gemaakt van een tool "PlantUML" via de website [App websequencediagrams](websequencediagrams.com). Door dit kon ik met een soort code dti diagram maken. Hieronder de code:

```
opt add GameObject
note left of Frontend
Adds the GameObject to the database!
end note
Frontend ->+ Backend: post:3001/gameobject/add
Backend -> Database: INSERT INTO GameObject
alt type = Room
Backend -> Database: INSERT INTO Room
end
alt type = Character
Backend -> Database: INSERT INTO Character
end
alt type = Item
Backend -> Database: INSERT INTO Item
end
Database -> Backend: Response (success)
Backend ->- Frontend: Response (success)

else Error adding gameobject
Database ->+ Backend: Response error (fail)
Backend ->- Frontend: Response error (fail)
end

opt Show Gameobject
note left of Frontend
Gets the GameObjects from database
shows in the Frontend
end note
Frontend ->+ Backend: get:3001/gameobject
Backend -> Database: SELECT FROM GameObject, Item and Character
Database -> Backend: Response (gameObjects data)
Backend ->- Frontend: Response (gameObjects data)
else Error fetching gameobjects
Database ->+ Backend: Response error (fail)
Backend ->- Frontend: Response error (fail)
end

opt Update GameObject
note left of Frontend
Updates GameObjects in database
and Frontend
end note
Frontend ->+ Backend: put:3001/gameobject/edit/id
Backend -> Database: UPDATE GameObject
Database -> Backend: Response updated GameObject(success)
Backend ->- Frontend: Response updated GameObject(success)
else Error
Database ->+ Backend: Response error (fail)
Backend ->- Frontend: Response error (fail)
end

opt Deleting GameObject
note left of Frontend
Deletes GameObjects from database
and updates Frontend
end note
opt User Confirms Deletion
Frontend ->+ Backend: delete:3001/gameobject/delete/id
Backend -> Database: DELETE FROM GameObject
Database -> Backend: Response (success)
Backend ->- Frontend: Response (success)
else Error
Database ->+ Backend: Response error (fail)
Backend ->- Frontend: Response error (fail)
end
else User Cancels Deletion
Frontend -> Database: no request
end
```

### Sequence Diagram(png)

![Sequence Diagram](/docs/assets/Sequence%20diagram[game-individuele-opdracht].png)
