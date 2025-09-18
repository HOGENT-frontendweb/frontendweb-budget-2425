import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import Button from 'react-bootstrap/Button';

// kan ook met react-intl (https://formatjs.io/docs/getting-started/installation/)
const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const TransactionMemoized = memo(function Transaction({ id, date, amount, user, place, onDelete }) {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr data-cy='transaction'>
      <td data-cy='transaction_date'>{dateFormat.format(new Date(date))}</td>
      <td data-cy='transaction_user'>{user.name}</td>
      <td data-cy='transaction_place'>{place.name}</td>
      <td data-cy='transaction_amount' className='text-end'>{amountFormat.format(amount)}</td>
      <td className='text-center'>
        {onDelete ?
          <>
            <Link to={`/transactions/edit/${id}`} className='btn btn-light' data-cy='transaction_edit_btn'>
              <IoPencilOutline />
            </Link>
            <Button variant="primary" onClick={handleDelete} data-cy="transaction_remove_btn">
              <IoTrashOutline />
            </Button>
          </> : ''
        }
      </td>
    </tr>
  );
});

export default TransactionMemoized;