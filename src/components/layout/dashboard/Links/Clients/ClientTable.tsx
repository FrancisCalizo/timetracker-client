import { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import { useClient } from 'src/context/clientContext';
import ViewEditTableButtons from 'src/components/layout/dashboard/ViewEditTableButtons';
import { TableStyles } from 'src/components/layout/dashboard/Links/Timesheets/TimesheetsTable';
import { TableInstanceWithHooks } from 'src/components/layout/dashboard/Links/Timesheets/TimesheetsTable';
import TablePagination from 'src/components/layout/dashboard/TablePagination';
import { useAppContext } from 'src/context/appContext';

function ClientTable() {
  const { clientList } = useClient();
  const { themeColor } = useAppContext()

  const columns: any = useMemo(
    () => [
      {
        Header: 'Actions',
        // @ts-ignore
        Cell: (props: any) => (
          <ViewEditTableButtons rowObj={props.row} type="CLIENT" />
        ),
      },
      { Header: 'Client Name', accessor: 'client' },
      { Header: 'Supervisor', accessor: 'supervisor' },
      { Header: 'Supervisor Email', accessor: 'supervisorEmail' },
      { Header: 'Billing Email', accessor: 'billingEmail' },
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
    { columns, data: clientList, initialState: { pageIndex: 0 } as any },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<any>;

  return (
    <TableStyles themeColor={themeColor}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

export default ClientTable;
