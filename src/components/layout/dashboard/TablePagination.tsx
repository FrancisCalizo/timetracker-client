import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faForwardStep,
  faBackwardStep,
  faCaretRight,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';

function TablePagination(props: any) {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
  } = props;

  return (
    <PaginationContainer>
      <div className="button-container">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FontAwesomeIcon className="arrows" icon={faBackwardStep} />
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FontAwesomeIcon className="arrows bigger" icon={faCaretLeft} />
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <FontAwesomeIcon className="arrows bigger" icon={faCaretRight} />
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <FontAwesomeIcon className="arrows" icon={faForwardStep} />
        </button>{' '}
      </div>
      <div className="page">
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </div>
      <span>
        Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '50px', textAlign: 'center' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </PaginationContainer>
  );
}

export default TablePagination;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;

  .button-container {
    display: flex;
    align-items: center;
  }

  .page {
    margin: 0 1.5rem;
  }

  button {
    background: transparent;
    border: none;
  }

  .arrows {
    color: rgba(0, 0, 0, 0.7);
    font-size: 1.5rem;
  }

  .bigger {
    font-size: 2rem;
  }

  input[type='number'] {
    padding: 0.25rem 0.5rem;
  }

  select {
    margin-left: 1rem;
    padding: 0.25rem 0.5rem;
  }
`;
