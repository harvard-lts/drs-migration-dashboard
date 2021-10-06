from flask_restx import Resource
from flask import request, current_app, make_response, jsonify, render_template, redirect, send_from_directory, url_for
import os, json

# Import data files
from . import data_files

def define_resources(app):
    @app.route('/')
    def status():
        data_service = data_files.DataFiles()
        migration_data = data_service.get_migration_data()
        return render_template('status.html', migration_data = migration_data)
    @app.route('/download-failed-files/')
    def download_failed_files():
        folder = os.path.join(current_app.static_folder, 'files')
        file = 'failed_file.json'
        return send_from_directory(folder, file, as_attachment=True) 
    @app.route('/piechart/')
    def piechart():
        return redirect(url_for('status'), code=301)
