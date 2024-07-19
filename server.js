//npx nodemon .\server.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import { addQuotes } from './manipulationsWithText.js';
import { removeDoubleSigns } from './manipulationsWithText.js';
import { directTranslation } from './manipulationsWithText.js';
const app = express();
const port = 3000;

app.use(morgan('combined')); // Логирование HTTP-запросов
app.use(express.static('public'));
//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/upload', (request, response) => {
    console.log('Received request:', request.body);
    if (!request.body || !request.body.text) {
        console.error('No text provided');
        return response.status(400).json({ error: 'No text provided.' });
    }

    const text = request.body.text;
    console.log('Processing text:', text);
    let modifiedContent = null;
    //console.log(request.body.action);
    if (request.body.action == 'addQuotes') {
        modifiedContent = addQuotes({ text });
        //console.log('Quotes added: ', modifiedContent);
    } else if(request.body.action == 'removeDoubleSigns') {
        modifiedContent = removeDoubleSigns({ text });
    } else if(request.body.action == 'directTranslation') {
        modifiedContent = directTranslation({ text });
    }
    console.log('Modified content:', modifiedContent);

    response.json({ modifiedContent });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});