// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import BodyParser from 'koa-body';
import * as BoxRequestController from '../controllers/DbUpdatesController';
import * as FileLRVController from '../controllers/FileLanguageResourceValueController';
import { getInputFileForAssignment, uploadOutputFileForAssignment } from '../controllers/KaryaFileController';
import * as WorkerController from '../controllers/WorkerController';

// Import router from the automatically created routes
// This router includes basic APIs that perform CRU operations on the tables
import router from './Routes.auto';

// GET LRV files
router.get('/file_language_resource_value', FileLRVController.getLRVFile);

// Worker requests
router.get('/worker/checkin', WorkerController.checkIn);
router.get('/worker/cc/:creation_code', WorkerController.checkCreationCode);
router.put('/worker/phone-auth', BodyParser(), WorkerController.initiatePhoneAuthentication);
router.put('/worker/update/cc', BodyParser(), WorkerController.updateWorkerWithCreationCode);
router.put('/worker/refresh_token', WorkerController.refreshIdToken);

router.post('/db/updates-for-worker', BodyParser(), BoxRequestController.sendUpdatesForWorker);
router.post(
  '/db/updates-from-worker',
  BodyParser({ jsonLimit: '10mb', textLimit: '10mb' }),
  BoxRequestController.receiveUpdatesFromWorker
);

// Controller to send/receive input/output files for assignment
router.get('/microtask_assignment/:id/input_file', getInputFileForAssignment);
router.post('/microtask_assignment/:id/output_file', BodyParser({ multipart: true }), uploadOutputFileForAssignment);

export default router;
