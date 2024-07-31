import {Router} from 'express';

import { addNewTaskController, deleteTaskController, getAllTasksController, updateTaskController } from '../controllers/task.controller';
import { JWTverify } from '../utils/JWT';

const router = Router();

router.use(JWTverify)

router.post('/gettask', getAllTasksController);
router.post('/addtask', addNewTaskController);
router.put('/updatetask', updateTaskController);
router.delete('/deletetask', deleteTaskController);



export default router;