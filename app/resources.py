from flask_restx import Resource
from flask import request, current_app, make_response, jsonify, render_template, redirect, url_for
import os, json

# Import data files
from . import data_files

def define_resources(app):
    @app.route('/')
    def status():
        data_service = data_files.DataFiles()
        migration_data = data_service.get_migration_data()
        failed_list = data_service.get_failed_list()
        return render_template('status.html', migration_data = migration_data, failed_list = failed_list )
    @app.route('/piechart/')
    def piechart():
        return redirect(url_for('status'), code=301)
