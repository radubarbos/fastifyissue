const fastify = require('fastify');

const requestSchema = require('./validation/schema.json');
const REQUEST_JSON_SCHEMA_ID = 'https://test/request-config-schema.json';

const app = fastify({
    logger: {
        level: 'warn',
        timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
        formatters: {
            level: label => ({level: label})
        }
    }
});


app.get('/', (req, res) => {
    res.send('OK');
});

app.addSchema(requestSchema);

app.post('/json', {
    schema: {
        body: {$ref: REQUEST_JSON_SCHEMA_ID}
    }
}, async (req, res) => {
    res.send('The POST payload was valid.');
});


module.exports = {
    server: null,

    start(port = 3000) {
        return new Promise((resolve, reject) => {
            if (this.server && this.server.listening) {
                reject('Server already listening.');
            }
            app.listen(port, '::', (err, address) => {
                if (err) {
                    console.error(err);
                    throw err;
                }
                console.log(`Server listening on ${address}`);
                this.server = app.server;
                resolve(app);
            });
        });
    },

    stop() {
        return new Promise(resolve => {
            if (this.server) {
                this.server.close();
            }
            resolve();
        });
    }
};
