const prompt = require('prompt-sync')({sigint: true});
const AccountManager = require('./managers/AccountManager');
const AuthManager = require('./managers/AuthManager');
const TransactionManager = require('./managers/TransactionManager');

const accountManager = new AccountManager();
const authManager = new AuthManager();
const transactionManager = new TransactionManager();

async function showMenu() {
    console.log('\n===WELCOME TO SMART BANK CLI===');

    let user;

    while(!user) {
        const choice = prompt('\n1. Sign up\n2. Login\n. Choose an option: ');
        if (choice === '1') {
            const name = prompt('Enter name: ').trim().toLowerCase();
            const email = prompt('Enter email: ').trim().toLowerCase();
            const password = prompt('Password: ');

           try {
             const newUser = await accountManager.createAccount(name, email, password);
             console.log('Account created. You can now login.')
           } catch (err) {
            console.log(err.message);
           }
        } else if (choice === '2') {
            try {
                const email = prompt('Enter email: ').trim().toLowerCase();
                const password = prompt('Enter password: ');
                user = await authManager.login(email, password);
                console.log(`\nWelcome back, ${user.name}`);
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    while (true) {
        console.log('\n=== DASHBOARD ===');

        console.log('1. View Balance');
        console.log('2. Deposit');
        console.log('3. Withdraw.');
        console.log('4. Transfer');
        console.log('5. Transactions');
        if (user.role === 'admin') console.log('6. View All Accounts');
        console.log('0. Exit')

        const option = prompt('choose: ');
        
        try {
            if (option === '1') {
                console.log(`Balance: ₦${user.balance}`);
            } else if (option === '2') {
                const amount = parseFloat(prompt('Enter amount to deposit: '));
                await transactionManager.deposit(user, amount);
                console.log('Deposit successful!');
            } else if (option === '3') {
                const amount = parseFloat(prompt('Enter amount to withdraw: '));
                await transactionManager.withdraw(user, amount);
                console.log('Withdrawal successful!');
            } else if (option === '4') {
                const recipient = prompt("Enter recipient's email: ").trim().toLowerCase();
                const amount = parseFloat(prompt('Enter amount to transfer: '));
                await transactionManager.transfer(user, recipient, amount);
                console.log('Transfer successful!');
            } else if (option === '5') {
                const txs = await transactionManager.viewTransactions(user);
                console.log('\nTransactions:');
                txs.forEach(t => console.log(JSON.stringify(t)));
            } else if (option === '6' && user.role === 'admin') {
                const all = await accountManager.listAllAccounts();
                all.forEach(acc => console.log(`${acc.name} - ₦${acc.balance}`));
            } else if (option === '0') {
                console.log('Thanks for banking with SMART BANK!');
                break;
            } else {
                console.log('Invalid option.');
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
}

showMenu();