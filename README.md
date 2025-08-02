# Smart Bank CLI

**Smart Bank CLI** is a Node.js-based Command-Line Interface app that simulates basic banking operations — from account creation to secure login, fund transfers, deposits, withdrawals, and balance checks — using a modular file structure and local JSON file storage.


## Folder Structure

smart-bank-cli/
├── .vscode/ # Editor configs (optional)
├── data/ # Stores persistent user data in users.json
├── managers/ # Business logic (e.g., bankManager.js)
├── node_modules/ # Installed dependencies
│ ├── bcryptjs/
│ ├── prompt-sync/
│ └── ... # Other packages
├── utils/ # Helper functions (e.g., file.js for read/write JSON)
├── index.js # Main CLI entry point
├── package.json # Project dependencies and metadata
└── README.md # Project documentation



## Features

- ✅ Create user bank accounts
- ✅ Login securely using email & password
- ✅ Deposit and withdraw funds
- ✅ Transfer money between accounts
- ✅ View account balance
- ✅ Passwords are hashed (bcryptjs)
- ✅ Data stored in a local JSON file


## Built With

- [Node.js](https://nodejs.org/)
- [prompt-sync](https://www.npmjs.com/package/prompt-sync)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [uuid](https://www.npmjs.com/package/uuid)
- JavaScript (ES6)
- File System Module (fs)


## Installation & Usage

1. Clone the Repo
```bash
git clone https://github.com/your-username/smart-bank-cli.git
cd smart-bank-cli
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
node index.js
You’ll be presented with a CLI menu to create an account, log in, or perform transactions.

Sample CLI Interaction
pgsql
Copy
Edit
💳 Welcome to Smart Bank CLI 💳
1. Create Account
2. Login
3. Exit

Select option: 1

Enter your full name: Shehu Baje
Enter email: shehubaje@gmail.com
Enter password: ******
Account created successfully! Your Account Number is: SB10292399
Security
Passwords are hashed using bcryptjs

No plaintext passwords are stored

Each user is uniquely identified with uuid

Future Improvements
Track and display transaction history

Add admin role and access control

Integrate with Express API backend

Validate account balances before transfers

Add date/time logs for each transaction

Author
Baje Shehu Umar
Backend Developer | Ex-Banker | Risk & Compliance Specialist
shehuumarbaje@gmail.com

License
This project is open source and available under the MIT License.

