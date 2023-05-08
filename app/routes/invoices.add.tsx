import { Dialog } from '@reach/dialog';
import styles from '@reach/dialog/styles.css';
import { redirect } from '@remix-run/node';
import { Form, useNavigate } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const action = () => {
  return redirect(`/invoices/`);
};

export default function Add() {
  const navigate = useNavigate();

  function onDismiss() {
    navigate('/invoices');
  }

  return (
    <Dialog isOpen={true} aria-label="Add invoice" onDismiss={onDismiss}>
      <h3>Add invoice</h3>
      <Form method="post" replace style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="company">Company</label>
        <input type="text" name="company" id="company" />

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows={10} />

        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" id="amount" />
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" />
        <div>
          <button type="submit">Add</button>
          <button type="button" onClick={onDismiss}>
            Cancel
          </button>
        </div>
      </Form>
    </Dialog>
  );
}
