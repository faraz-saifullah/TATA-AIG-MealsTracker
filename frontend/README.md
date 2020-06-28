Vocabulary Test Application Frontend

Pre-requesits to start using this Application
	- Node JS (ehich can be installed from here: https://nodejs.org/en/download/)
	- npm 
	- mongodb (which can be installed from here: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04 )

First clone the repository and move to the directory.

	cd Vocabulary-Test

Install all the dependencies.

	npm install

Now to start the application

	npm start

Now you need to start the mongo database

	sudo service mongod start

To start using the Application you need to clone the Vocabulary-Test-Backend repository also and move to that directory

	cd Vocabulary-Test-Backend

Now install all the dependencies.

	npm install

Now you have to start the Node server

	npm start

This will start the server at localhost:3000 and will automatically populate some dymmy data into the database if the database is empty.

You can also explicitly populate the database by doing

	npm run seed-db


Now you can start using the Application by visiting localhost:3001 from the browser.
You can manage the Vocabulary List by Clicking on 'Manage The List' and after there you have the options to add to or delete from the current  Vocabulary List.
After that you can take the test by clicking on 'Take The Test' and you can attempt the next question or go to the previous question.
After you are done solving you can click on Finish which will end the test and Load the Result of the test for you.
