const {readData, writeData} = require('../utils/fileHandler');
const {hashPassword} = require('../utils/password');

const ACCOUNT_FILE = 'account.json';

class AccountManager {
    async createAccount(name, email, password, role = 'user') {
        const accounts = await readData(ACCOUNT_FILE);
        const exists = accounts.find(acc => acc.email === email);
        if (exists) throw new Error('Email already in use');

        const createNewAcc = {id: Date.now().toString(), 
            name, 
            email, 
            password: await hashPassword(password),
            role,
            balance: 0,
            transactions: []
        };

        accounts.push(createNewAcc);
        await writeData(ACCOUNT_FILE, accounts);
        return createNewAcc;
    }

   async getAccountByEmail(email) {
        const accounts = await readData(ACCOUNT_FILE);
        return accounts.find(acc => acc.email === email);
    }

    async getAccountById(id) {
        const accounts = await readData(ACCOUNT_FILE);
        return accounts.find(acc => acc.id === id);
    }

    async updateAccount(account) {
        const accounts = await readData(ACCOUNT_FILE);
        const idx = accounts.findIndex(acc => acc.id === account.id);
        if (idx === -1) throw new Error('Account not found.');
        accounts[idx] = account;
        await writeData(ACCOUNT_FILE, accounts);
    }

    async listAllAccounts() {
        return await readData(ACCOUNT_FILE);
    }
}

module.exports = AccountManager;

