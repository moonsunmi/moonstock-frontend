const Header = () => {
  const cols = ['매수일', '금액', '매도일', '금액', '개수', '총 수익', '수익률']
  return (
    <div className="grid grid-cols-8 px-4 py-2 text-sm font-medium text-right text-gray-700 bg-primary-100">
      {cols.map(c => (
        <div key={c}>{c}</div>
      ))}
    </div>
  )
}
export default Header
