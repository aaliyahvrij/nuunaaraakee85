import { Router } from "express";
import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExampleAction, ExampleActionAlias } from "./actions/ExampleAction";
import { PickupAction, PickupActionAlias } from "./actions/PickupAction";
import { UseAction, UseActionAlias } from "./actions/UseAction";

export const router: Router = Router();

router.get("/test", (_, res) => {
  res.json({ test: 123 });
});

export function handleRoutes(_room: Room, alias: string, gameObjects: GameObject[], targetObjectAlias?: string): ActionResult | undefined {
  switch (alias) {
    case ExamineActionAlias:
      return ExamineAction.handle(gameObjects[0]);

    case ExampleActionAlias:
      return ExampleAction.handle(gameObjects[0]);

    case PickupActionAlias:
      return PickupAction.handle(gameObjects[0]);

    case UseActionAlias:
      if (targetObjectAlias) {
        return UseAction.perform(gameObjects[0], targetObjectAlias);
      }
      return undefined;

    default:
      return undefined;
  }
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