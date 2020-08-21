import React, { useEffect, useContext, useState } from 'react';
import Layout from '../../components/Layout';
import DatePicker from 'react-datepicker';
const create = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Layout>
      <h2>Create Tournament</h2>
      <form>
        <label className='input-form-label'>Name</label>
        <input className='input-form' />
        <label className='input-form-label'>Tournament Type</label>
        <input className='input-form' />
        <label className='input-form-label'>Number of Entries</label>
        <input className='input-form' />
        <label className='block input-form-label'>Start Date</label>
        <DatePicker
          dateFormat='dd/MM/yyyy'
          selected={date}
          onChange={(date) => setDate(date)}
          className='w-full input-form'
        />
        <button
          className='w-button bg-powder block rounded-lg border-2 border-celadon text-prussian py-1'
          type='submit'>
          Send
        </button>
      </form>
    </Layout>
  );
};

export default create;
