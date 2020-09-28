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
    setBracketGroups(groups);
    setLoading(false);
  };

  useEffect(() => {
    selectTeams();
  }, [teams]);

  if (loading) return <p>Loading</p>;

  return (
    <div className='overflow-y-scroll mt-4'>
      {bracketGroups.length &&
        bracketGroups.map((group, idx) => {
          return (
            <div className=''>
              <div className={`flex flex-row p-2 ${idx % 2 !== 0 ? 'bg-celadon' : 'bg-powder'}`}>
                <h4 className='group-title bg-honeydew px-6 py-1 text-prussian rounded-md text-sm border-2 border-prussian'>
                  {group.group}
                </h4>
                <ul className='w-full flex flex-col justify-around py-2'>
                  {group.groupTeams.map((team) => {
                    return (
                      <button className='bg-prussian text-honeydew p-1 rounded-full pl-4 my-2 border-2 border-honeydew text-left text-sm hover:bg-prussianDark hover:shadow-lg shadow-honeydew'>
                        {team ? `${team.seed} - ${team.name}` : null}
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
