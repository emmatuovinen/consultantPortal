# Install requirements

git bash: 
`git clone https://github.com/MikaelStenstrand/consultant-app.git`

## Front

Open project folder /front in VS Code.
In VS Code terminal: 
- `npm install`
- `npm start`

Front folder structure:
- components = dumb components
- containers = smart components
- views


## Back
Docker
-Download  https://www.docker.com/get-started
-If Hyper V is not enabled, do it by pushing ok when opening Docker (your computer will restart).

Run application on Docker
-On the commandline go to the root directory and write

`docker-compose up`

- This will load files needed for setting up Docker and MongoDB and starts them.


### New Backend Updates
For new changes to backend, you have to re-build the backend with the following commands

`docker-compose build`

`docker-compose up`

### Swagger

Runs in http://localhost:5000/
-Open through link above
-You are able to test the create, remove, update and delete methods of the application in Swagger.
-Some mock data has been created in swagger. This data can be used to see what the application looks like in real life. The mock data     can be retrieved by using the second POST-method under the MockData section in swagger.



You are ready to be awesome!

