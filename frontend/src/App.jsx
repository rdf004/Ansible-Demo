import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import NewTxnModal from './components/NewTxnModal.jsx'
import TxnDetail from './components/TxnDetail.jsx'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [healthy, setHealthy] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedTxn, setSelectedTxn] = useState(null)

  const fetchTransactions = () => {
    fetch('/api/transactions')
      .then((r) => r.json())
      .then(setTransactions)
      .catch(() => setTransactions([]))
  }

  const checkHealth = () => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setHealthy(
        d.status === 'healthy'
      ))
      .catch(() => setHealthy(false))
  }

  useEffect(() => {
    fetchTransactions()
    checkHealth()
    const interval = setInterval(
      checkHealth, 15000
    )
    return () => clearInterval(interval)
  }, [])

  const handleCreate = (data) => {
    fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(() => {
        fetchTransactions()
        setShowModal(false)
      })
  }

  const handleRowClick = (txn) => {
    setSelectedTxn(txn)
  }

  return (
    <div className="app">
      <Header
        healthy={healthy}
        onNewTxn={() => setShowModal(true)}
      />
      <main className="main-content">
        <Dashboard
          transactions={transactions}
          onRowClick={handleRowClick}
        />
      </main>
      {showModal && (
        <NewTxnModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
      {selectedTxn && (
        <TxnDetail
          txn={selectedTxn}
          onClose={() => setSelectedTxn(null)}
        />
      )}
    </div>
  )
}

export default App
