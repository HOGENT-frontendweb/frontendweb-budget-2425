// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getAll, save, getById } from '../../api';
import useSWRMutation from 'swr/mutation';
import TransactionForm from '../../components/transactions/TransactionForm.jsx';
import AsyncData from '../../components/AsyncData';
import Container from 'react-bootstrap/Container';

export default function AddOrEditTransaction() {
  const { id } = useParams();

  const {
    data: transaction,
    error: transactionError,
    isLoading: transactionLoading,
  } = useSWR(id ? `transactions/${id}` : null, getById);

  const { trigger: saveTransaction, error: saveError } = useSWRMutation(
    'transactions',
    save,
  );

  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR('places', getAll);

  return (
    <>
      <Container className="py-4" style={{ maxWidth: 500 }}>
        <h1 className="mb-4">{id ? 'Edit' : 'Add'} transaction</h1>
        <AsyncData
          error={transactionError || placesError || saveError}
          loading={transactionLoading || placesLoading}
        >
          <TransactionForm
            places={places}
            transaction={transaction}
            saveTransaction={saveTransaction}
          />
        </AsyncData>
      </Container>
    </>
  );
}
