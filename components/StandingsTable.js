import { useTable, useSortBy } from 'react-table';
import { ImStarEmpty } from 'react-icons/im';
import { RiUser3Line } from 'react-icons/ri';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

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
        width: 20,
        disableSortBy: true,
      },
      {
        Header: 'User',
        accessor: 'username', // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: 'Points',
        accessor: 'points',
        width: 100,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'points',
            desc: true,
          },
        ],
      },
    },
    useSortBy
  );

  return (
    <div className='w-11/12 lg:w-1/2 mx-auto mb-8'>
      <h3 className='text-center mb-4'>Current Standings</h3>
      <table className='text-base border-2 border-prussian w-full' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    className='border-t border-b bg-celadon text-honeydew py-1 font-normal'
                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span className=''>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BsChevronDown className='ml-2 inline-block' />
                        ) : (
                          <BsChevronUp className='ml-2 inline-block' />
                        )
                      ) : (
                        <BsChevronDown className='ml-2 opacity-0 inline-block' />
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className='border-t border-b border-powder text-center py-1 text-prussian'
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
