const fs = require('fs').promises;

async function readData(file) {
    try {
        const data = await fs.readFile(`./data/${file}`, 'utf8')
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

async function writeData(file, data) {
    try {
        await fs.writeFile(`./data/${file}`, JSON.stringify(data, null, 2));
    } catch (err) {
        console.log('Failed to write file:', err.message);
    }
}

module.exports = {readData, writeData};