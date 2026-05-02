import './Modal.css'

function formatPrice(p) {
  return Number(p).toLocaleString(
    'en-US',
    { minimumFractionDigits: 2 }
  )
}

function TxnDetail({ txn, onClose }) {
  const notional = txn.quantity * txn.price

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Trade Detail</h2>
          <button
            className="modal-close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">
              ID
            </span>
            <span className="detail-value id">
              {txn.id}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Timestamp
            </span>
            <span className="detail-value">
              {new Date(
                txn.timestamp
              ).toLocaleString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Counterparty
            </span>
            <span className="detail-value">
              {txn.counterparty}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Asset
            </span>
            <span className="detail-value">
              {txn.asset}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Direction
            </span>
            <span
              className={
                `detail-value dir ` +
                `d-${txn.direction}`
              }
            >
              {txn.direction.toUpperCase()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Status
            </span>
            <span
              className={
                `detail-value ` +
                `s-${txn.status}`
              }
            >
              {txn.status}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Quantity
            </span>
            <span className="detail-value">
              {Number(
                txn.quantity
              ).toLocaleString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              Price
            </span>
            <span className="detail-value">
              ${formatPrice(txn.price)}
            </span>
          </div>
          <div className="detail-item full">
            <span className="detail-label">
              Notional Value
            </span>
            <span
              className={
                "detail-value notional"
              }
            >
              ${formatPrice(notional)}
            </span>
          </div>
        </div>
        <div className="form-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TxnDetail
