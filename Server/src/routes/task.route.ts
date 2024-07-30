import {Router} from 'express';

import { addNewTaskController, getAllTasksController } from '../controllers/task.controller';
import { JWTverify } from '../utils/JWT';

const router = Router();

router.use(JWTverify)

router.post('/addtask', addNewTaskController);
router.post('/gettask', getAllTasksController);
// router.get('/get/:id', getTaskController);
// router.put('/update/:id', updateTaskController);
// router.delete('/delete/:id', deleteTaskController);

export default router;