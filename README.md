# drs-migration-dashboard
A tool to report and visualize the status of data migration for the Harvard Library Digital Repository Service

## Technology Stack
##### Language
Python

##### Framework
Flask

##### Development Operations
Docker Compose

## Local Development Environment Setup Instructions

### 1: Clone the repository to a local directory
git clone git@github.com:harvard-lts/drs-migration-dashboard.git

### 2: Create app config

##### Create config file for environment variables
- Make a copy of the config example file `./env-example.txt`
- Rename the file to `.env`
- Replace placeholder values as necessary

*Note: The config file .env is specifically excluded in .gitignore and .dockerignore, since it contains credentials it should NOT ever be committed to any repository.*

### 3: Start

##### START

This command builds all images and runs all containers specified in the docker-compose-local.yml configuration.

```
docker-compose -f docker-compose-local.yml up --build --force-recreate
```

### 4: Install Packages (optional)
This step is only required if additional python packages must be installed during development. Update the requirements.txt inside the container to install new python packages.

##### Run docker exec to execute a shell in the container by name

Open a shell using the exec command to access the hgl-downloader container.

```
docker exec -it hgl-downloader bash
```

##### Install a new pip package

Once inside the mps-asset-validation container, run the pip install command to install a new package and update the requirements text file.

```
pip install packagename && pip freeze > requirements.txt
```

### 5: Stop

##### STOP AND REMOVE

This command stops and removes all containers specified in the docker-compose-local.yml configuration. This command can be used in place of the 'stop' and 'rm' commands.

```
docker-compose -f docker-compose-local.yml down
```