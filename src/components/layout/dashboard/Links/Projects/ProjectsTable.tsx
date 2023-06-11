import { useMemo } from 'react';
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

import { useProjects } from 'src/context/projectsContext';
import ViewEditTableButtons from '../../ViewEditTableButtons';
import TablePagination from 'src/components/layout/dashboard/TablePagination';
import { useAppContext } from 'src/context/appContext';

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

interface StyledProps {
  themeColor: string;
}

function ProjectsTable() {
  const { projectsList } = useProjects();
  
  const { themeColor } = useAppContext()

  const columns: any = useMemo(
    () => [
      {
        Header: 'Actions',
        // @ts-ignore
        Cell: (props: any) => (
          <ViewEditTableButtons rowObj={props.row} type="PROJECT" />
        ),
      },
      { Header: 'Client', accessor: 'client' },
      { Header: 'Timesheets', accessor: 'timesheets' },
      // TODO: This would show for the Admin View
      // {
      //   Header: 'Consultant',
      //   accessor: 'firstName',
      //   // @ts-ignore
      //   Cell: (props: any) =>
      //     `${props.row.original.firstName} ${props.row.original.lastName}`,
      // },
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
    { columns, data: projectsList, initialState: { pageIndex: 0 } as any },
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

export default ProjectsTable;

export const TableStyles = styled.div<StyledProps>`
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
      background: ${(props) => props.theme.colors[props.themeColor]};
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
