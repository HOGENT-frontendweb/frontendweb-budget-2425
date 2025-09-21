// src/pages/transactions/TransactionList.jsx
import {useState, useMemo, useCallback} from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {getAll, deleteById} from '../../api';
import {Link} from 'react-router-dom';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useSWR('transactions', getAll);

  const {trigger: deleteTransaction, error: deleteError} = useSWRMutation(
    'transactions',
    deleteById,
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions],
  );

  const handleDeleteTransaction = useCallback(async (id) => {
    await deleteTransaction(id);
    alert('Transaction is removed');
  }, [deleteTransaction]);

  return (
    <>
      <h1 className="text-4xl mb-2">Transactions</h1>
      <div className='flex mb-3 w-1/2'>
        <input
          type='search'
          id='search'
          className='rounded grow-1 bg-white p-1 text-black'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-cy='transactions_search_input'
        />
        <button
          type='button'
          className='py-2 px-2.5 rounded-md text-blue-600 border border-blue-600'
          onClick={() => setSearch(text)}
          data-cy='transactions_search_btn'
        >
          Search
        </button>
        <Link to='/transactions/add' className='py-2 px-2.5 rounded-md bg-blue-600 text-white'>
          Add transaction
        </Link>
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error || deleteError}>
          <TransactionsTable transactions={filteredTransactions} onDelete={handleDeleteTransaction}/>
        </AsyncData>
      </div>
    </>
  );
}
