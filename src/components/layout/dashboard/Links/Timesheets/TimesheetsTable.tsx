import { useMemo } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useTable,
  useSortBy,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
} from 'react-table';
import {
  faCaretDown,
  faCaretUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import { useTimesheets } from 'src/context/timesheetsContext';
import { formatCurrency } from 'src/utils';
import ViewEditTableButtons from '../../ViewEditTableButtons';
import TablePagination from 'src/components/layout/dashboard/TablePagination';

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

function TimesheetsTable() {
  const { timesheetsList } = useTimesheets();

  const columns: any = useMemo(
    () => [
      {
        Header: 'Actions',
        Cell: (props: any) => (
          <ViewEditTableButtons rowObj={props.row} type="TIMESHEET" />
        ),
      },
      { Header: 'Client', accessor: 'client' },
      {
        Header: 'Consultant',
        accessor: 'firstName',
        Cell: (props: any) =>
          `${props.row.original.firstName} ${props.row.original.lastName}`,
      },
      {
        Header: 'Week Starting',
        accessor: 'weekStarting',
        Cell: (props: any) => {
          const timesheets = props.row.original.timesheets;

          const sorted = timesheets.sort((a: any, b: any) => a.date - b.date);

          return format(sorted[0].date, 'PP');
        },
      },
      {
        Header: 'Week Ending',
        accessor: 'weekEnding',
        Cell: (props: any) => {
          const timesheets = props.row.original.timesheets;

          const sorted = timesheets.sort((a: any, b: any) => a.date - b.date);

          return format(sorted[sorted.length - 1].date, 'PP');
        },
      },
      {
        Header: 'Rate',
        Cell: (props: any) => {
          const timesheets = props.row.original.timesheets;

          // Get array of rates, remove zeros & duplicates, sort asc
          const rates: number[] = Array.from(
            new Set(
              timesheets
                .map((ts: any) => ts.rate)
                .filter((rate: number) => rate)
                .sort()
            )
          );

          if (rates.length > 1) {
            return `${formatCurrency(rates[0])} - ${formatCurrency(
              rates[rates.length - 1]
            )}`;
          }

          if (rates.length === 1) {
            return formatCurrency(rates[0]);
          }

          return 0;
        },
      },
      {
        Header: 'Total Hours',
        Cell: (props: any) => {
          const timesheets = props.row.original.timesheets;

          return timesheets.reduce(
            (acc: any, curr: any) => acc + curr.hours,
            0
          );
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (props: any) => {
          return (
            <span style={{ textTransform: 'capitalize' }}>{props.value}</span>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: timesheetsList, initialState: { pageIndex: 0 } as any },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<any>;

  return (
    <TableStyles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps({
                    ...column.getSortByToggleProps(),
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {column.render('Header')}{' '}
                    <span>
                      {!column.isSorted && column.canSort && (
                        <FontAwesomeIcon
                          icon={faSort}
                          style={{ fontSize: 16, marginLeft: 8 }}
                        />
                      )}

                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            style={{ fontSize: 16, marginLeft: 8 }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCaretUp}
                            style={{ fontSize: 16, marginLeft: 8 }}
                          />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </TableStyles>
  );
}

export default TimesheetsTable;

export const TableStyles = styled.div`
  display: block;
  max-width: 100%;

  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    width: 100%;
    border-spacing: 0;

    thead {
      background: #ff6b6b;
      color: #fff;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tbody {
      tr {
        background: #fff;

        &:hover {
          background: gainsboro;
          transition: background 150ms ease-in-out;
        }
      }

      font-size: 0.9rem;
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 10px solid #f1f2f6;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
