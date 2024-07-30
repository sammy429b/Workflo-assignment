import {Router} from 'express';

import { addNewTaskController, deleteTaskController, getAllTasksController } from '../controllers/task.controller';
import { JWTverify } from '../utils/JWT';

const router = Router();

router.use(JWTverify)

router.post('/gettask', getAllTasksController);
router.post('/addtask', addNewTaskController);
// router.put('/update/:id', updateTaskController);
router.delete('/deletetask', deleteTaskController);



export default router;