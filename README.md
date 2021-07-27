# Game of Thrones / A Song of Ice and Fire Characters Mobile App
A Single Page Application project built with React Native to view the characters from George R. R. Martin's Game of Thrones/A Song of Ice and Fire science fiction series.

## Description
The application fetches data from the [anapioficeandfire.com](anapioficeandfire.com) API server. Each request returns 10 characters per request. The characters are then displayed on a single page on the app. Users can navigate to different pages using first, previous, next, and last page navigation buttons. Character data is saved and new character data is fetched only when requested. Navigating back to a page where the character data exists already will not make an additional call to the API.

## Stretch Features
- A loading spinner when the app is awaiting a response from the API server.
- A dark/light mode toggle to change the theme of the app.
- Additional character information can be found by tapping on a character's card to reveal additional information. Basic character information is displayed by default. 
- A "Go To Page" button for users to jump to a specific page. Jumping to a page out of range will prompt the user with an error. At the time of development, the last page is page 214.


## Starting the App Locally

1. Clone the app onto your local machine.
2. Navigate to the directory.
3. Install the dependencies with `npm install`
4. Start the local server with `npm start`
5. A new Metro window will open up in your default browser. The address will be similar to `localhost:19002`

## Opening the App
1. If you have Android Studio installed on your machine already, you can press `a` in the terminal to open up an Android emulator.
2. If you do not have Android Studio installed or would like to open the app on a mobile device instead, scan the QR code found in the Metro window (step 5 above) to open the app on your device. You may be prompted to download the Expo Go app on the Google Play Store/Apple Store if you do not already have it.
3. Click the prompt to open the app in Expo Go.
4. Enjoy.

## Future Development
- Move component styling into separate files

## Screenshots

Landing
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/Landing.png?raw=true" width="295" height="640">
<br>
<br>

Dark Mode
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/DarkMode.png?raw=true" width="295" height="640">
<br>
<br>

Expanded Character View
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/Expanded.png?raw=true" width="295" height="640">
<br>
<br>

Navigation Buttons and Keyboard View
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/GoTo.png?raw=true" width="295" height="640">
<br>
<br>

Loading Spinner
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/Loading.png?raw=true" width="295" height="640">
<br>
<br>

Error Message
<br>
<img src="https://github.com/gwan93/GoT-Characters/blob/main/docs/Error.png?raw=true" width="295" height="640">
<br>
<br>
