import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3500;
const server = http.createServer((request, response) => {
    const queryObject = url.parse(request.url as string, true).query;

    if (url.parse(request.url as string, true).pathname !== '/index.js') {
        response.writeHead(404, { 'Content-type': 'text/html' });
        response.write('error 404, pagina no encontrada');
        response.end();
    }

    if (!Number(queryObject.num1) || !Number(queryObject.num2)) {
        response.writeHead(500, { 'Content-type': 'text/html' });
        response.write('introduce solo numeros, por favor');
        response.end();
    }

    response.writeHead(200, { 'Content-type': 'text/html' });
    const sum = Number(queryObject.num1) + Number(queryObject.num2);
    const resultSum = `${queryObject.num1} + ${queryObject.num2} = ${sum}`;
    const sustract = Number(queryObject.num1) - Number(queryObject.num2);
    const resultSustract = `${queryObject.num1} - ${queryObject.num2} = ${sustract}`;
    const mult = Number(queryObject.num1) * Number(queryObject.num2);
    const resultMult = `${queryObject.num1} x ${queryObject.num2} = ${mult}`;
    const division = Number(queryObject.num1) / Number(queryObject.num2);
    const resultDivision = `${queryObject.num1} : ${queryObject.num2} = ${division}`;

    response.write(`
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculadora</title>
    </head>
    <body>
        <header>
            <h1>Calculadora</h1>
        </header>
        <main>
            <div className="operations-container">
                <p>${resultSum}</p>
                <p>${resultSustract}</p>
                <p>${resultMult}</p>
                <p>${resultDivision}</p>
            </div>
        </main>
        <footer>Sara Flores, ISDI CODERS</footer>
    </body>
</html>
    
    `);
    response.end();
});

server.listen(port);

// res.end('Feel free to add query parameters to the end of the url')

// const querystring = require('querystring');
// const url = 'localhost:3300/index.js?code=string&num1=6&num2=5';
// const qs = 'num1=6&num2=5';
