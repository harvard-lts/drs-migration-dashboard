from flask_restx import Resource
from flask import request, current_app, make_response, jsonify, render_template, redirect, url_for
import os, json

# Import proxy file
#from . import geoserver_proxy, rest_proxy

def define_resources(app):
    @app.route('/')
    def status():
        return render_template('status.html')
    @app.route('/piechart/')
    def piechart():
        return redirect(url_for('status'), code=301)
