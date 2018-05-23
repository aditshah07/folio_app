## Library patron empowerment in the FOLIO project

To Run the Application on Mac:
1. You need node(npm) installed.
2. Run (npm install) in the my-app directory. It will install all the dependencies of the project.
3. Run command (npm start) it will host the server then it will ask for option to run on ios or android. 
4. You end a emulator on the system to run the application.
5. For ios you can get xcode and android you can get android studio.
6. Once the emulator is running then it will install the packages on the emulator.
7. Then it will direct you to login page.
8. To login in the system use username: diku_admin and password: admin

To Run the test:
1. Run command (npm test) in the my-app directory.
2. To run only the test file run command (npm test App.test.js) in the my-app directory.

In Folio mobile App, we used MVC design pattern, routing the pages is controller, screens are the views and Folio is the Model. 

For our React-Native JavaScript code, we follow ESLint code style.

To emulate the app, enter *npm start* in Terminal.

To test the app, enter *npm test* in Terminal.

The code we writed is listed below:

* App.js  -- The entrance of App, contains the main navigater.
* App.test.js -- Test cases
* package.json -- Package information

* navigation/ -- Folder contains navigators
 * navigation/RootNavigation.js -- Go to login screen, notification api for further development
 * navigation/MainTabNavigator.js -- Three tabs, switches Homepage, Profilepage and Settingspage

* screens/ -- Screens Folder
 * screens/data/ 
  * screens/data/url.json -- Folio url
  * screens/data/loan.json -- Some sample loan info for display on ProfileScreen
  * screens/data/resources.json -- Contains subject items with initilal value.
  * screens/data/languages.json -- Contains language items with initilal value.

 * screens/image/ -- image folder

 * screens/lib/
  * screens/lib/LoginButton.js -- LoginButton component

 * screens/LoginScreen.js -- LoginScreen Component
 * screens/HomeScreen.js -- HomeScreen Component contains New Books and News
 * screens/ProfileScreen.js -- ProfileScreen contains user information. 
 * screens/SettingsScreen.js -- Settings page for user perference
 * screens/BookScreen.js -- Book details page

