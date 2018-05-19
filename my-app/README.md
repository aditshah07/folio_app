## Library patron empowerment in the FOLIO project

In Folio mobile App, we used MVC design pattern, routing the pages is controller, screens are the views and Folio is the Model. 

For our React-Native JavaScript code, we follow ESLint code style.

To emulate the app, enter 'npm start' in Terminal.
To test the app, enter 'npm test' in Terminal.

The code we writed is listed below:

* App.js  -- The entrance of App, contains the main navigater.
* App.test.js -- Test cases
* package.json -- Package information

* navigation/ -- Folder contains navigators
 ** RootNavigation.js -- Go to login screen, notification api for further development
 ** MainTabNavigator.js -- Three tabs, switches Homepage, Profilepage and Settingspage

* screens/ -- Screens Folder
 ** data/ 
  *** url.json -- Folio url
  *** loan.json -- Some sample loan info for display on ProfileScreen
  *** resources.json -- Contains subject items with initilal value.
  *** languages.json -- Contains language items with initilal value.

 ** image/ -- image folder

 ** lib/
  *** LoginButton.js -- LoginButton component

 ** LoginScreen.js -- LoginScreen Component
 ** HomeScreen.js -- HomeScreen Component contains New Books and News
 ** ProfileScreen.js -- ProfileScreen contains user information. 
 ** SettingsScreen.js -- Settings page for user perference
 ** BookScreen.js -- Book details page

