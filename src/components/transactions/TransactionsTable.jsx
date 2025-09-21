// src/components/transactions/TransactionsTable.jsx
import Transaction from './Transaction';
import {useThemeColors} from '../../contexts/theme';

function TransactionsTable({transactions, onDelete}) {
  const {theme} = useThemeColors();
  if (transactions.length === 0) {
    return (
      <div className='bg-cyan-100 text-cyan-800 p-3 rounded-lg' data-cy='no_transactions_message'>There are no
        transactions yet.</div>
    );
  }

  return (
    <div>
      <table className="table-auto bg-dark w-full">
        <thead>
          <tr>
            <th className="text-start">Date</th>
            <th className="text-start">User</th>
            <th className="text-start">Place</th>
            <th className='text-end'>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} onDelete={onDelete}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
