require('dotenv').config();
const app = require('./app');
require('./database');

const PORT = app.get('port');

function main() {
    app.listen(PORT, () => {
        console.log('♦ Server live ♦ on port', PORT);
    });
}

main();