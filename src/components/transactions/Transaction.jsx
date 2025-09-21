import {IoTrashOutline, IoPencilOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {memo} from 'react';

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

const TransactionMemoized = memo(function Transaction({id, date, amount, user, place, onDelete}) {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr data-cy='transaction'>
      <td data-cy='transaction_date'>{dateFormat.format(new Date(date))}</td>
      <td data-cy='transaction_user'>{user.name}</td>
      <td data-cy='transaction_place'>{place.name}</td>
      <td data-cy='transaction_amount' className='text-end'>{amountFormat.format(amount)}</td>
      <td className="flex">
        {onDelete ?
          <>
            <Link to={`/transactions/edit/${id}`}
              className='inline-block py-2 px-2.5 rounded-md bg-white text-blue-600 hover:bg-gray-300'
              data-cy='transaction_edit_btn'>
              <IoPencilOutline/>
            </Link>
            <button className='py-2 px-2.5 rounded-md bg-blue-600' onClick={handleDelete}
              data-cy='transaction_remove_btn'>
              <IoTrashOutline/>
            </button>
          </> : ''
        }
      </td>
    </tr>
  );
});

export default TransactionMemoized;