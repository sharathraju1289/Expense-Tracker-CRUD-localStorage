import { state, transactionList } from './state.js';
import { formatCurrency } from './analytics.js';

export function displayTransactions() {
    if (state.transactions.length === 0) {
        transactionList.innerHTML = '<div class="empty-state"><p>No transactions yet. Add one to get started!</p></div>';
        return;
    }

    const sortedTransactions = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    transactionList.innerHTML = sortedTransactions.map(transaction => {
        const formattedAmount = formatCurrency(transaction.amount);
        const formattedDate = new Date(transaction.date).toLocaleDateString('en-IN');
        const typeClass = transaction.type === 'income' ? 'income' : 'expense';
        const amountClass = transaction.type === 'income' ? 'income' : 'expense';

        return `
            <div class="transaction-item ${typeClass}">
                <div class="transaction-details">
                    <div class="transaction-description">${transaction.description}</div>
                    <div class="transaction-date">${formattedDate}</div>
                </div>
                <div class="transaction-amount ${amountClass}">
                    ${transaction.type === 'income' ? '+' : '-'}${formattedAmount}
                </div>
                <div class="transaction-actions">
                    <button class="btn btn-edit" onclick="editTransaction(${transaction.id})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteTransaction(${transaction.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}
