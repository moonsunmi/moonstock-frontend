import {useMatchedListPage} from '../hooks/useMatchedListPage'
import MatchedRow from './MatchedRow'

export default function MatchedTable({
  rows,
  onRowClick
}: {
  rows: ReturnType<typeof useMatchedListPage>['rows']
  onRowClick: (id: string) => void
}) {
  return (
    <>
      {rows.map(r => (
        <MatchedRow key={r.id} row={r} onClick={onRowClick} />
      ))}
    </>
  )
}
