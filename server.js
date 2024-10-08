//npx nodemon .\server.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import * as functions from './manipulationsWithText.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (typeof functions[request.body.action] === 'function') {
        modifiedContent = functions[request.body.action]({text});
        console.log('Modified content:', modifiedContent);
    } else {
        console.error(`Функция с именем ${functionName} не найдена`);
    }
    
    response.json({ modifiedContent });
});

app.get('/find_and_replace.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'find_and_replace.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});