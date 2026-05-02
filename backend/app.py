from flask import Flask, jsonify, request
from datetime import datetime
import uuid

app = Flask(__name__)

TRANSACTIONS = [
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T09:15:00Z",
        "counterparty": "Goldman Sachs",
        "asset": "AAPL",
        "direction": "buy",
        "quantity": 1500,
        "price": 198.45,
        "status": "filled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T09:32:00Z",
        "counterparty": "Morgan Stanley",
        "asset": "TSLA",
        "direction": "sell",
        "quantity": 800,
        "price": 245.10,
        "status": "filled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T10:05:00Z",
        "counterparty": "JP Morgan",
        "asset": "MSFT",
        "direction": "buy",
        "quantity": 2000,
        "price": 430.20,
        "status": "pending"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T10:22:00Z",
        "counterparty": "Citadel Securities",
        "asset": "NVDA",
        "direction": "buy",
        "quantity": 500,
        "price": 875.30,
        "status": "filled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T11:00:00Z",
        "counterparty": "Barclays Capital",
        "asset": "AMZN",
        "direction": "sell",
        "quantity": 300,
        "price": 188.75,
        "status": "cancelled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T11:45:00Z",
        "counterparty": "UBS Group",
        "asset": "GOOG",
        "direction": "buy",
        "quantity": 1200,
        "price": 172.60,
        "status": "pending"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T12:10:00Z",
        "counterparty": "Deutsche Bank",
        "asset": "META",
        "direction": "sell",
        "quantity": 900,
        "price": 510.40,
        "status": "filled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T13:30:00Z",
        "counterparty": "BNP Paribas",
        "asset": "JPM",
        "direction": "buy",
        "quantity": 1100,
        "price": 205.85,
        "status": "pending"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T14:00:00Z",
        "counterparty": "Credit Suisse",
        "asset": "BTC-USD",
        "direction": "sell",
        "quantity": 15,
        "price": 62450.00,
        "status": "filled"
    },
    {
        "id": str(uuid.uuid4()),
        "timestamp": "2026-05-02T14:45:00Z",
        "counterparty": "HSBC Holdings",
        "asset": "ETH-USD",
        "direction": "buy",
        "quantity": 200,
        "price": 3280.50,
        "status": "pending"
    }
]


@app.route("/api/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/api/transactions", methods=["GET"])
def get_transactions():
    return jsonify(TRANSACTIONS)


@app.route(
    "/api/transactions/<transaction_id>",
    methods=["GET"]
)
def get_transaction(transaction_id):
    txn = next(
        (
            t for t in TRANSACTIONS
            if t["id"] == transaction_id
        ),
        None
    )
    if txn is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(txn)


@app.route("/api/transactions", methods=["POST"])
def create_transaction():
    data = request.get_json()
    required = [
        "counterparty",
        "asset",
        "direction",
        "quantity",
        "price",
        "status"
    ]
    for field in required:
        if field not in data:
            return jsonify(
                {"error": f"Missing field: {field}"}
            ), 400

    if data["direction"] not in ("buy", "sell"):
        return jsonify(
            {"error": "direction must be buy or sell"}
        ), 400

    valid_statuses = (
        "pending", "filled", "cancelled"
    )
    if data["status"] not in valid_statuses:
        return jsonify(
            {
                "error":
                "status must be "
                "pending, filled, or cancelled"
            }
        ), 400

    txn = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat()
        + "Z",
        "counterparty": data["counterparty"],
        "asset": data["asset"],
        "direction": data["direction"],
        "quantity": data["quantity"],
        "price": data["price"],
        "status": data["status"]
    }
    TRANSACTIONS.append(txn)
    return jsonify(txn), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
