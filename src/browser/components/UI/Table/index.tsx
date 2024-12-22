type Column<T> = {
  key: keyof T | string
  header: string
  className: string
  render?: (row: T) => React.ReactNode
}

type TransactionTableProps<T> = {
  data: T[]
  columns: Column<T>[]
}

const Table = <T extends {id: string | number}>({
  data,
  columns
}: TransactionTableProps<T>) => {
  // 우선 트랜잭션 => 나중에 더 일반적으로?
  return (
    <table>
      <TableHeader columns={columns} />
      <tbody>
        {data.map(row => {
          return <TableRow row={row} columns={columns} />
        })}
      </tbody>
    </table>
  )
}

type TableHeaderProps<T> = {
  columns: Column<T>[]
}

export const TableHeader = <T,>({columns}: TableHeaderProps<T>) => {
  return (
    <thead className="w-full">
      <tr className="w-full">
        {columns.map(column => {
          return (
            <th key={String(column.key)} className={column.className}>
              {column.header}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

type TableRowProps<T> = {
  row: T
  columns: Column<T>[]
}

export const TableRow = <T extends {id: string | number}>({
  row,
  columns
}: TableRowProps<T>) => {
  return (
    <tr key={row.id}>
      {columns.map(column => {
        return (
          <TableCell
            key={`${row.id}-${String(column.key)}`}
            value={row[String(column.key)]}
            render={column.render ? () => column.render(row) : undefined}
            className={column.className}
          />
        )
      })}
    </tr>
  )
}

type TableCellProps<T> = {
  value: T
  className: string
  render?: (value: T) => React.ReactNode
}

const TableCell = <T,>({value, render, className}: TableCellProps<T>) => {
  //   console.log(render(value))
  return <td className={className}>{render ? render(value) : String(value)}</td>
}
export default Table
