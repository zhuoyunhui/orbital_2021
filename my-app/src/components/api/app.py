from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS, cross_origin
from backtest import backtesting

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/ticker', methods=['POST'])
@cross_origin()
def ticker():
    data = request.get_json()
    return redirect(url_for('backtest', ticker=data['stock'], day=data['day'], month=data['month'], year=data['year']), code=307)

# This posts the backtesting(ticker) result to /bacltest?ticker=ticker


@ app.route('/backtest', methods=['POST', 'GET'])
def backtest():
    response = jsonify(message="Simple server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    ticker = request.args.get("ticker")
    day = request.args.get('day')
    month = request.args.get('month')
    year = request.args.get('year')
    result = backtesting(ticker, day, month, year)
    return jsonify(result)


if __name__ == "__main__":
    app.run()
