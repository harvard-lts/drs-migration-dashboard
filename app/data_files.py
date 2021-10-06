from flask import current_app
import os, json

class DataFiles():
    def get_migration_data(self):
        current_app.logger.info('Loading migration data from json file.')
        filename = os.path.join(current_app.static_folder, 'files', 'drs_migration.json')
        with open(filename) as migration_file:
            migration_data = json.load(migration_file)
        current_app.logger.info('Successfully loaded migration data.')
        return json.dumps(migration_data)