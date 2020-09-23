import React, { useEffect, useContext, useState } from 'react';

const SelectBracket = ({ teams, tournament }) => {
  const [bracketGroups, setBracketGroups] = useState([]);

  const groupOrder = [1, 8, 4, 5, 3, 6, 2, 7];

  useEffect(() => {
    const groups = tournament.groups.map((group) => {
      let groupTeams = [];
      groupOrder.forEach((seed) => {
        let team = teams.filter((team) => {
          return team.seed === seed && team.group === group;
        });
        console.log(team[0]);
        groupTeams.push(team[0]);
      });
      console.log(groupTeams);
      return {
        group,
        groupTeams,
      };
    });
    console.log(groups);
    setBracketGroups(groups);
  }, []);
  return (
    <div>
      {bracketGroups.map((group) => (
        <div>
          <h4>{group.group}</h4>
          <ul>
            {group.groupTeams.map((team) => {
              console.log(team);
              return <div className="bg-powder text-prussian p-1 rounded-full pl-2 w-1/5 my-2 border-2 border-prussian">{team.seed} - {team.name}</div>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SelectBracket;
