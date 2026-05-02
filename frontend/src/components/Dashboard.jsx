import './Dashboard.css'

function formatPrice(p) {
  return Number(p).toLocaleString(
    'en-US',
    { minimumFractionDigits: 2 }
  )
}

function formatQty(q) {
  return Number(q).toLocaleString('en-US')
}

function formatTime(ts) {
  const d = new Date(ts)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status }) {
  return (
    <span
      className={`status-badge s-${status}`}
    >
      {status}
    </span>
  )
}

function DirectionBadge({ direction }) {
  return (
    <span
      className={
        `dir-badge d-${direction}`
      }
    >
      {direction.toUpperCase()}
    </span>
  )
}

function Dashboard({
  transactions,
  onRowClick,
}) {
  const summary = {
    total: transactions.length,
    filled: transactions.filter(
      (t) => t.status === 'filled'
    ).length,
    pending: transactions.filter(
      (t) => t.status === 'pending'
    ).length,
    cancelled: transactions.filter(
      (t) => t.status === 'cancelled'
    ).length,
  }

  return (
    <div className="dashboard">
      <div className="summary-row">
        <div className="summary-card">
          <span className="summary-label">
            Total Trades
          </span>
          <span className="summary-value">
            {summary.total}
          </span>
        </div>
        <div className="summary-card filled">
          <span className="summary-label">
            Filled
          </span>
          <span className="summary-value">
            {summary.filled}
          </span>
        </div>
        <div className="summary-card pending">
          <span className="summary-label">
            Pending
          </span>
          <span className="summary-value">
            {summary.pending}
          </span>
        </div>
        <div className="summary-card cancelled">
          <span className="summary-label">
            Cancelled
          </span>
          <span className="summary-value">
            {summary.cancelled}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="txn-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Asset</th>
              <th>Direction</th>
              <th>Counterparty</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Notional</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                onClick={
                  () => onRowClick(txn)
                }
                className="txn-row"
              >
                <td className="td-time">
                  {formatTime(txn.timestamp)}
                </td>
                <td className="td-asset">
                  {txn.asset}
                </td>
                <td>
                  <DirectionBadge
                    direction={
                      txn.direction
                    }
                  />
                </td>
                <td>
                  {txn.counterparty}
                </td>
                <td className="td-num">
                  {formatQty(txn.quantity)}
                </td>
                <td className="td-num">
                  ${formatPrice(txn.price)}
                </td>
                <td className="td-num">
                  ${formatPrice(
                    txn.quantity * txn.price
                  )}
                </td>
                <td>
                  <StatusBadge
                    status={txn.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="empty-state">
            No transactions found
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
