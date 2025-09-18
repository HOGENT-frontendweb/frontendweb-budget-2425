// src/pages/transactions/TransactionList.jsx

import { useState, useMemo, useCallback } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useSWR('transactions', getAll);

  const { trigger: deleteTransaction, error: deleteError } = useSWRMutation(
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
      <h1 className="mb-4">Transactions</h1>
      <Form className="mb-3 w-50">
        <Row className="g-2 align-items-center">
          <Col xs="auto" className="flex-grow-1">
            <InputGroup>
              <Form.Control
                type="search"
                id="search"
                placeholder="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-cy="transactions_search_input"
              />
              <Button
                variant="outline-primary"
                type="button"
                onClick={() => setSearch(text)}
                data-cy="transactions_search_btn"
              >
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/transactions/add" variant="primary">
              Add transaction
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="mt-4">
        <AsyncData loading={isLoading} error={error || deleteError}>
          <TransactionsTable transactions={filteredTransactions} onDelete={handleDeleteTransaction} />
        </AsyncData>
      </Row>
    </>
  );
}
