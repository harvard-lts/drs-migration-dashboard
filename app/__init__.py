import os, click
from flask import Flask, current_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.wrappers import Response

# Import custom modules from the local project
# Import API resources
from . import resources

# App factory
def create_app():
  # Create and configure the app
  app = Flask(__name__, instance_relative_config=True)
  app.wsgi_app = DispatcherMiddleware(
      Response('Not Found', status=404),
      {'/migrationstatus': app.wsgi_app}
  )

  # App config
  app.config.from_mapping(
      ROOT_ROUTE = '/'
  )

  # App logger
  app.logger.setLevel(os.environ.get('APP_LOG_LEVEL', 'INFO'))

  # Resources
  resources.define_resources(app)

  return app
