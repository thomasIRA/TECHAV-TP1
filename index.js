import express  from 'express';
import request from 'request';
import path from 'path';
import fs from 'fs';
import config from './config/config.js';
import { fileURLToPath } from 'url';
import RandomRecipesWriter from './lib/RandomRecipesWriter.js';
 
/* for __dirname because not supported in ES6 module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

/* config variables */
const port = config.PORT;
const apiKey = config.API_KEY;

/* write a new random recipes file from a list of ingredient */
const randomRecipesWriter = new RandomRecipesWriter(apiKey);
randomRecipesWriter.writeRecipe();

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(config.PORT || 8081, () => console.log('server running...'));