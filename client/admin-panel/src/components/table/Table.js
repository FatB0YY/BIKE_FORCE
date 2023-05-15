import { useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'
import { useDispatch } from 'react-redux'
import {
  valueDeleted,
  modalToggle,
  setValidMessage,
  setUserRoleForValid,
  setUserRoleId,
} from '../../actions'
import IndeterminateCheckbox from '../indeterminateCheckbox/IndeterminateCheckbox'
import CategoryService from '../../services/CategoryService'
import RolesService from '../../services/RolesService'
import {
  useTable,
  useFilters,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from 'react-table'
import DefaultColumnFilter from '../filters/defaultColumnFilter/DefaultColumnFilter'
import './table.scss'

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = (val) => !val

const Table = ({ columns, data, styles, pages }) => {
  const dispatch = useDispatch()

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
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      isRowSelectable: (row) => true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
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
        color: !rowInfo.original.isActive ? 'red' : 'black',
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

  const handleDeleteSelectedRows = (e) => {
    e.preventDefault()
    const selectedRows = selectedFlatRows.map((row) => row.original.id)
    onDelete(selectedRows, pages)
  }

  const onDelete = (ids, page) => {
    const deleteRequests = ids.map((id) => {
      return CategoryService.putValue(page, id)
    })

    Promise.all(deleteRequests)
      .then((res) => res.forEach((item) => dispatch(valueDeleted(ids, page))))
      .catch((err) => console.log(err))
  }

  const handleUsersSelectedRows = async (e) => {
    e.preventDefault()
    const selectedRows = selectedFlatRows.map((row) => row.original.id)
    if (selectedRows.length === 1) {
      dispatch(setValidMessage(''))
      const res = await RolesService.getUserRoles(selectedRows)
      dispatch(setUserRoleForValid(res[0].value))
      dispatch(setUserRoleId(+selectedRows.join('')))
    } else if (selectedRows.length > 1) {
      dispatch(setValidMessage('Надо выбрать 1 пользователя!'))
    } else {
      dispatch(setValidMessage('Не выбраны строки!'))
    }
  }

  return (
    <div className='table'>
      <div className='btns'>
        {pages === 'users' ? null : (
          <button
            type='button'
            className='btns__delete'
            onClick={(e) => handleDeleteSelectedRows(e)}
          >
            Удалить
          </button>
        )}

        {pages === 'users' ? (
          <button
            type='button'
            className='btns__add'
            onClick={(e) => {
              dispatch(modalToggle())
              handleUsersSelectedRows(e)
            }}
          >
            Добавить
          </button>
        ) : (
          <button
            type='button'
            className='btns__add'
            onClick={() => dispatch(modalToggle())}
          >
            Добавить
          </button>
        )}
      </div>
      <table
        {...getTableProps()}
        style={styles?.table}
      >
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
          {rows.slice(0, data.lenght).map((row, i) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                {...rowProps(row)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      <div>{cell.render('Cell')}</div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
