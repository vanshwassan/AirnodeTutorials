import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import logging
from datetime import datetime
import time

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

@app.route('/getFoo')
def foo():
    return jsonify({'foo': 'bar'})