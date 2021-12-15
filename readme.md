# DISCUSS
https://discuss-aa.herokuapp.com/

Discuss is a place to find and create your community and meet others that share your interests. 
It was inspired by Discord and built using React.js and Python

### Libraries and technologies
Discuss uses:

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Socket.IO](https://socket.io/) for live messaging
* [Werkzeug](https://werkzeug.palletsprojects.com/en/2.0.x/) for password hashing

Login Page:
![Login Page](https://imgur.com/1W0E5GS.png)

Discover View:
![Discover Page](https://imgur.com/cq5bqzJ.png)

Channel Page:
![Channel Page](https://res.cloudinary.com/dt8q1ngxj/image/upload/v1638724470/Discuss/discussMessage_ryo6kf.png)

### Features
* Create servers and channels
* Join and leave servers
* Messaging within channels
* Explore different servers

## Getting started

1. Clone this repository (only this branch)
2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
