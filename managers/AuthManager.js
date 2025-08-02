const {comparePassword} = require('../utils/password');
const AccountManager = require('./AccountManager');

class AuthManager {
    constructor() {
        this.accountManager = new AccountManager();
    }

    async login(email, password) {
        const account = await this.accountManager.getAccountByEmail(email);
        if (!account) throw new Error('Invalid credentials.');

        const valid = await comparePassword(password, account.password);
        if (!valid) throw new Error('Invalid credentials.');

        return account;
    }
}

module.exports = AuthManager;