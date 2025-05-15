import express from "express";
import * as controller from "../controllers/v1.controllers";

const router = express.Router();

router.post('/create-task', controller.createTask)
router.post('/:id/delete', controller.deleteTask)
router.post('/:id/update', controller.updateTask)
router.post('/:id/update-status', controller.changeStatusTask)
router.get('/tasks', controller.tasks)


export default router;