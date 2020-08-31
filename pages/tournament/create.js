import React, { useContext, useEffect, useState } from 'react';
import { playerNumbers, tournamentTypes } from '../../utilities/constants';

import DatePicker from 'react-datepicker';
import Layout from '../../components/Layout';
import Select from 'react-select';
import { FirebaseActionContext } from '../../utilities/context/FirebaseActionContext';

const create = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState(null);
  const [players, setPlayers] = useState(null);
  const [date, setDate] = useState(new Date());

  const { createTournament } = useContext(FirebaseActionContext);

  const customSelectStyles = {
    container: (provided, state) => ({
      ...provided,
      border: '2px solid #457b9d',
      borderRadius: '0.5rem',
    }),
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      borderRadius: '0.5rem',
    }),
  };

  return (
    <Layout>
      <div className='w-1/3 flex flex-col justify-center items-center mx-auto'>
        <h2 className='text-celadon text-3xl font-title mb-8'>Create Tournament</h2>
        <form className='w-full'>
          <label className='input-form-label'>Tournament Name</label>
          <input
            className='input-form'
            id='tournament name'
            value={tournamentName}
            onChange={(e) => {
              setTournamentName(e.target.value);
            }}
            required
          />
          <label className='input-form-label'>Tournament Type</label>
          <Select
            required
            options={tournamentTypes}
            className='w-full block border-2 border-celadon text-prussian mb-4 rounded-lg'
            styles={customSelectStyles}
            value={tournamentType}
            onChange={(value) => setTournamentType(value)}
          />
          <label className='input-form-label'>Number of Players</label>
          <Select
            required
            options={playerNumbers}
            className='w-full block border-2 border-celadon text-prussian mb-4 rounded-lg'
            styles={customSelectStyles}
            value={players}
            onChange={(value) => setPlayers(value)}
          />
          <label className='input-form-label block'>Start Date</label>
          <DatePicker
            required
            dateFormat='dd/MM/yyyy'
            selected={date}
            onChange={(date) => setDate(date)}
            className='w-full input-form block'
          />
          <button
            className='w-button bg-powder block rounded-lg border-2 border-celadon text-prussian py-1 mx-auto'
            type='submit'>
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default create;
