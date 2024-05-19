import { Router } from "express";
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExampleAction, ExampleActionAlias } from "./actions/ExampleAction";
import { PickupAction, PickupActionAlias } from "./actions/PickupAction";

export const router: Router = Router();

router.get("/test", (_, res) => {
  res.json({ test: 123 });
});

export function handleRoutes(_room: Room, alias: string, gameObjects: GameObject[]): ActionResult | undefined {
  switch (alias) {
    case ExamineActionAlias:
      return ExamineAction.handle(gameObjects[0]);

    case ExampleActionAlias:
      return ExampleAction.handle(gameObjects[0]);

    case PickupActionAlias:
      return PickupAction.handle(gameObjects[0]);

  }
  return undefined;
}


//}    switch (alias) {
//   case ExamineActionAlias:
//     return ExamineAction.handle(gameObjects[0]);
//
//   case ExampleActionAlias:
//        return ExampleAction.handle(gameObjects[0]);
//
//    case PickupActionAlias:
//          return PickupAction.handle(gameObjects[0]);

//}