import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { findBestOption } from './ai';

const app = express();
app.use(bodyParser.json());

const token = process.env.WHATSAPP_TOKEN;

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const verifyToken = req.query['hub.verify_token'];

  if (mode && verifyToken) {
    if (mode === 'subscribe' && verifyToken === process.env.VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;

  console.log(JSON.stringify(body, null, 2));

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const from = body.entry[0].changes[0].value.messages[0].from;
      const msgBody = body.entry[0].changes[0].value.messages[0].text.body;
      
      const bestOption = await findBestOption(msgBody);

      if (bestOption) {
        axios({
          method: 'POST',
          url: `https://graph.facebook.com/v13.0/${process.env.PHONE_NUMBER_ID}/messages?access_token=${token}`,
          data: {
            messaging_product: 'whatsapp',
            to: from,
            interactive: bestOption,
          },
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
