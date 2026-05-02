import { useState } from 'react'
import './Modal.css'

const DEFAULTS = {
  counterparty: '',
  asset: '',
  direction: 'buy',
  quantity: '',
  price: '',
  status: 'pending',
}

function NewTxnModal({ onClose, onCreate }) {
  const [form, setForm] = useState(DEFAULTS)

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    })
  }

  const valid =
    form.counterparty &&
    form.asset &&
    form.quantity > 0 &&
    form.price > 0

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>New Trade</h2>
          <button
            className="modal-close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Counterparty</label>
              <input
                type="text"
                value={form.counterparty}
                onChange={(e) =>
                  update(
                    'counterparty',
                    e.target.value
                  )
                }
                placeholder="e.g. Goldman Sachs"
              />
            </div>
            <div className="form-group">
              <label>Asset</label>
              <input
                type="text"
                value={form.asset}
                onChange={(e) =>
                  update(
                    'asset',
                    e.target.value
                  )
                }
                placeholder="e.g. AAPL"
              />
            </div>
            <div className="form-group">
              <label>Direction</label>
              <select
                value={form.direction}
                onChange={(e) =>
                  update(
                    'direction',
                    e.target.value
                  )
                }
              >
                <option value="buy">
                  Buy
                </option>
                <option value="sell">
                  Sell
                </option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  update(
                    'status',
                    e.target.value
                  )
                }
              >
                <option value="pending">
                  Pending
                </option>
                <option value="filled">
                  Filled
                </option>
                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.quantity}
                onChange={(e) =>
                  update(
                    'quantity',
                    e.target.value
                  )
                }
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  update(
                    'price',
                    e.target.value
                  )
                }
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={!valid}
            >
              Submit Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTxnModal
