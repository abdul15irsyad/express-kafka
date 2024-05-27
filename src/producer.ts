import { Request, Response, Router } from 'express';
import { producer } from '.';
export const producerRoute = Router();

producerRoute.post('/', async (req: Request, res: Response) => {
  try {
    const message = JSON.stringify(req.body?.message ?? 'test message');
    await producer.connect();
    await producer.send({
      topic: 'my-topic',
      messages: [{ value: message }],
    });
    console.log(`message sent: ${message}`);
    res.json({ message: 'message produced successfully!' });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await producer.disconnect();
  }
});
