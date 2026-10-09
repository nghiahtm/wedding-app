import { Router } from 'express';
import Rsvp from '../models/Rsvp.js';
import { errorResponse, successResponse, validationErrors } from '../utils/dataResponse.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const rsvps = await Rsvp.find().sort({ createdAt: -1 }).lean();
    response.json(successResponse(rsvps, 'Danh sách hồi đáp.'));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const rsvp = await Rsvp.create(request.body);
    response.status(201).json(successResponse(rsvp, 'Gửi hồi đáp thành công.'));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json(errorResponse(
        validationErrors(error),
        'Dữ liệu hồi đáp không hợp lệ.'
      ));
    }
    next(error);
  }
});

export default router;