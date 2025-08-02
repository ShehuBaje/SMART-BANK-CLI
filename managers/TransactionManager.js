const AccountManager = require('./AccountManager');

class TransactionManager {
    constructor() {
        this.accountManager = new AccountManager();
    }

    async deposit(account, amount) {
        if (amount <= 0) throw new Error('Invalid deposit amount.');
        account.balance += amount;
        account.transactions.push({type: 'deposit', amount, date: new Date().toISOString()});
        await this.accountManager.updateAccount(account);
    }

    async withdraw(account, amount) {
        if (amount <= 0 || amount > account.balance) throw new Error('Invalid withdrawal amount.');
        account.balance -= amount;
        account.transactions.push({type: 'withdrawal', amount, date: new Date().toISOString()});
        await this.accountManager.updateAccount(account); 
    }

    async transfer(sender, recipientEmail, amount) {
        const recipient = await this.accountManager.getAccountByEmail(recipientEmail);
        if (!recipient) throw new Error('Invalid recipient. Please verify the email.');
        if (amount <= 0 || amount > sender.balance) throw new Error('Insufficient fund.');

        sender.balance -= amount;
        sender.transactions.push({type: 'transfer_out', to: recipient.email, amount, date: new Date().toISOString()});
        
        recipient.balance += amount;
        recipient.transactions.push({type: 'transfer_in', from: sender.email, amount, date: new Date().toISOString()});
        
        await this.accountManager.updateAccount(sender);
        await this.accountManager.updateAccount(recipient);
    }

    async viewTransactions(account) {
        return account.transactions;
    }
}

module.exports = TransactionManager;