import { useMemo, useState, useEffect, useCallback } from 'react'
import { matchSorter } from 'match-sorter'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/useHttp'
import { productDeleted, modalToggle } from '../../actions'
import IndeterminateCheckbox from '../indeterminateCheckbox/IndeterminateCheckbox'

import {
  useTable,
  useFilters,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useDeleteRows,
} from 'react-table'
import DefaultColumnFilter from '../filters/defaultColumnFilter/DefaultColumnFilter'
import './table.scss'

// prettier-ignore
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = (val) => !val

const Table = ({ columns, data }) => {
  const dispatch = useDispatch()
  const { request } = useHttp()

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    page,
    state: { pageIndex, pageSize, selectedRowIds, rowState },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 2 },
      isRowSelectable: (row) => true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  function getTrProps(rowInfo, column) {
    return {
      onClick: (e, handleOriginal) => {
        // handle row click
        if (handleOriginal) {
          handleOriginal()
        }
      },
      style: {
        cursor: 'pointer',
      },
    }
  }

  function rowProps(row) {
    return {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ...getTrProps(row),
    }
  }

  const handleDeleteSelectedRows = () => {
    const selectedRows = selectedFlatRows.map((row) => row.original.id)
    console.log(selectedRows)
    onDelete(selectedRows)
  }

  const onDelete = useCallback(
    (ids) => {
      const deleteRequests = ids.map((id) => {
        return request(`http://localhost:3001/products/${id}`, 'DELETE')
      })

      Promise.all(deleteRequests)
        .then((responses) => console.log(responses, 'Deleted'))
        .then(dispatch(productDeleted(ids)))
        .catch((err) => console.log(err))
      // eslint-disable-next-line
    },
    [request]
  )
  return (
    <div className='table'>
      <div className='btns'>
        <button
          type='button'
          className='btns__delete'
          onClick={() => handleDeleteSelectedRows()}
        >
          Удалить
        </button>
        <button
          type='button'
          className='btns__add'
          onClick={() => dispatch(modalToggle())}
        >
          Добавить
        </button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            /* firstPageRows */ rows.slice(0, 10).map((row, i) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  {...rowProps(row)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <div>
                        {cell.render('Cell')}
                        </div>
                        </td>
                    )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Table
