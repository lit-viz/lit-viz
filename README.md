# lit-viz

Literature visualization.

# Flask Back End
Located in the `api` folder. To launch the backend, run the following commands:
```
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```
Optionally, once the requirements have already been installed, simply run:
```
npm run start-api
```
which is configured to launch the flask application.

# React Front End
Boostrapped with [Create React App](https://github.com/facebook/create-react-app).

Commands:
- `npm start` to start the development server
- `npm test` to run tests
- `npm run build` to build the app for production
- `npm run eject` to eject from Create React App