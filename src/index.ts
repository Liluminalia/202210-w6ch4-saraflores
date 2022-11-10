import http from 'http';
import url from 'url';
import { program } from 'commander';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3500;
program.option('-u, --userPort <char>').option('-h, --help');
program.parse();
const { userPort, help } = program.opts();
console.log({ userPort }, { help });
if (help) {
    console.log('Escribe -u o --userPort y el número de puerto para elegirlo');
}
const server = http.createServer((request, response) => {
    const queryObject = url.parse(request.url as string, true).query;

    if (url.parse(request.url as string, true).pathname !== '/index.js') {
        response.writeHead(404, { 'Content-type': 'text/html' });
        response.write(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculadora</title>
    </head>
    <body>
        <p>ERROR 404 PAGINA NO ENCONTRADA</p>
    </body>
</html>`);
        response.end();
    }

    if (!Number(queryObject.num1) || !Number(queryObject.num2)) {
        response.writeHead(500, { 'Content-type': 'text/html' });
        response.write(`<!DOCTYPE html>
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
            <div>
                <p>eso no es un numero!</p>
                
            </div>
        </main>
        <footer>Sara Flores, ISDI CODERS</footer>
    </body>
</html>`);
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
