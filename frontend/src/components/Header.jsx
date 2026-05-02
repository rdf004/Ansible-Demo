import './Header.css'

function Header({ healthy, onNewTxn }) {
  const statusClass =
    healthy === null
      ? 'status-unknown'
      : healthy
        ? 'status-healthy'
        : 'status-unhealthy'

  const statusText =
    healthy === null
      ? 'Checking...'
      : healthy
        ? 'System Healthy'
        : 'System Down'

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">
              ◆
            </span>
            TradeOps
          </h1>
          <span className="tagline">
            Transaction Management
          </span>
        </div>
        <div className="header-right">
          <div
            className={
              `health-badge ${statusClass}`
            }
          >
            <span className="health-dot" />
            {statusText}
          </div>
          <button
            className="btn-new-txn"
            onClick={onNewTxn}
          >
            + New Trade
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
