import { useTable } from 'react-table';
import { ImStarEmpty } from 'react-icons/im';
import { RiUser3Line } from 'react-icons/ri';

const StandingsTable = ({ members }) => {
  const data = React.useMemo(
    () =>
      members.map((player) => {
        console.log(player);
        const { id, username, role, points } = player;
        return { username, points, id, role };
      }),
    [members]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        accessor: (member) =>
          member.role === 'OWNER' ? (
            <ImStarEmpty className='inline-block mr-2' />
          ) : (
            <RiUser3Line className='inline-block mr-2' />
          ),
      },
      {
        Header: 'User',
        accessor: 'username', // accessor is the "key" in the data
      },
      {
        Header: 'Points',
        accessor: 'points',
        style: {
          textAlign: 'right',
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table className='w-11/12 lg:w-1/2 mx-auto mb-8' {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className='border' {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          console.log(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className='border' {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StandingsTable;
