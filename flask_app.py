
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request, jsonify, render_template
from datetime import datetime
from tinydb import TinyDB
from tinydb.storages import MemoryStorage

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
db = TinyDB(storage=MemoryStorage)

message = "Waiting for data"

@app.route('/')
def show_temp():
    return message

@app.route("/chart")
def chart():
    return render_template("chart.html")

@app.route("/data")
def data():
    return jsonify(data=db.all())

@app.route('/temp', methods=['POST', 'GET'])
def set_temp():
    global message
    req_json = request.get_json()
    if "message" in req_json:
        message = str(datetime.now()) + " UTC<br>" + req_json["message"]
    return message, 200

@app.route("/api", methods=["POST"])
def store_data():
    db.insert(request.get_json())
    return "Thank you", 200