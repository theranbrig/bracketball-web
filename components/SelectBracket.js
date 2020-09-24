import React, { useContext, useEffect, useState } from 'react';

import Bracket from '../public/icons/bracket-quarter.svg';

const SelectBracket = ({ teams, tournament }) => {
  const [loading, setLoading] = useState(true);
  const [bracketGroups, setBracketGroups] = useState([]);

  const groupOrder = [1, 8, 4, 5, 3, 6, 2, 7];

  const selectTeams = async () => {
    setLoading(true);
    const groups = await tournament.groups.map((group) => {
      let groupTeams = [];
      groupOrder.forEach((seed) => {
        const team = teams.filter((team) => {
          return team.seed === seed && team.group === group;
        });
        groupTeams.push(team[0]);
      });
      return {
        group,
        groupTeams,
      };
    });
    console.log(groups);
    setBracketGroups(groups);
    setLoading(false);
  };

  useEffect(() => {
    selectTeams();
  }, []);

  if (loading) return <p>Loading</p>;
  return (
    <div className='overflow-y-scroll'>
      {bracketGroups.length &&
        bracketGroups.map((group, idx) => {
          return (
            <div className=''>
              <div className={`flex flex-row p-2 ${idx % 2 !== 0 ? 'bg-celadon' : 'bg-prussian'}`}>
                <h4>{group.group}</h4>
                <ul className='w-full flex flex-col justify-between'>
                  {group.groupTeams.map((team) => {
                    return (
                      <button className='bg-powder text-prussian p-1 rounded-full pl-4 my-2  border-2 border-honeydew text-left hover:bg-powderDark'>
                        {team.seed} - {team.name}
                      </button>
                    );
                  })}
                </ul>
                <img
                  src={Bracket}
                  className={`w-2/3 ${idx % 2 !== 0 ? 'rotated-bracket fill-honeydew' : ''}`}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SelectBracket;
