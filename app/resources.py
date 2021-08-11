from flask_restx import Resource
from flask import request, current_app, make_response, jsonify, render_template
import os, json

# Import proxy file
#from . import geoserver_proxy, rest_proxy

def define_resources(app):
    @app.route('/')
    def piechart():
        return render_template('status.html')