
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, request
from datetime import datetime

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

message = "Waiting for data"

@app.route('/')
def show_temp():
    return message

@app.route('/temp', methods=['POST', 'GET'])
def set_temp():
    global message
    req_json = request.get_json()
    if "message" in req_json:
        message = str(datetime.now()) + " UTC<br>" + req_json["message"]
    return message, 200