from flask_restx import Resource, Api
from flask import request, current_app, make_response, jsonify, render_template
import os, json

# Import proxy file
#from . import geoserver_proxy, rest_proxy

def define_resources(app):
    api = Api(app, version='1.0', title='DRS Migration Dashboard', description='Dashboard to see migration progress for DRS.')
    dashboard = api.namespace('/', description="Dashboard to see migration progress for DRS.")

    # Heartbeat/health check route
    @dashboard.route('/version', endpoint="version", methods=['GET'])
    class Version(Resource):
        def get(self):
            version = os.environ.get('APP_VERSION', "NOT FOUND")
            return {"version": version}
    @app.route('/piechart/')
    def piechart():
        return render_template('piechart.html')