class Account {
    constructor(holder, number, balance = 0) {
        this.holder = holder;
        this.number = number;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return `Depósito de R$${amount.toFixed(2)} realizado com sucesso!`;
        }
        return 'Valor inválido para depósito.';
    }

    withdraw(amount) {
        if (amount <= 0) {
            return 'Valor inválido para saque.';
        }
        if (amount > this.balance) {
            return 'Saldo insuficiente para saque.';
        }
        this.balance -= amount;
        return `Saque de R$${amount.toFixed(2)} realizado com sucesso!`;
    }

    getBalance() {
        return `Saldo da conta: R$${this.balance.toFixed(2)}`;
    }
}

class BankSystem {
    constructor() {
        this.accounts = new Map();
        this.nextAccountNumber = 1;
    }

    createAccount(holder, initialBalance) {
        const account = new Account(holder, this.nextAccountNumber++, initialBalance);
        this.accounts.set(account.number, account);
        return `Conta criada com sucesso! Número da conta: ${account.number}`;
    }

    deposit(accountNumber, amount) {
        const account = this.accounts.get(accountNumber);
        if (account) {
            return account.deposit(amount);
        }
        return 'Conta não encontrada.';
    }

    withdraw(accountNumber, amount) {
        const account = this.accounts.get(accountNumber);
        if (account) {
            return account.withdraw(amount);
        }
        return 'Conta não encontrada.';
    }

    getBalance(accountNumber) {
        const account = this.accounts.get(accountNumber);
        if (account) {
            return account.getBalance();
        }
        return 'Conta não encontrada.';
    }
}

const bankSystem = new BankSystem();

function displayResult(message) {
    document.getElementById('result').innerText = message;
}

document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const holder = document.getElementById('accountHolder').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    const result = bankSystem.createAccount(holder, initialBalance);
    displayResult(result);
    this.reset();
});

document.getElementById('operationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const operationType = document.getElementById('operationType').value;

    let result;
    if (operationType === 'deposit') {
        result = bankSystem.deposit(accountNumber, amount);
    } else {
        result = bankSystem.withdraw(accountNumber, amount);
    }

    displayResult(result);
    this.reset();
});

document.getElementById('balanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const accountNumber = parseInt(document.getElementById('accountNumberBalance').value);
    const result = bankSystem.getBalance(accountNumber);

    displayResult(result);
    this.reset();
});
