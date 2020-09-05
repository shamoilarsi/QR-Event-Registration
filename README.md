## Event Registration

A QR based registration system for events and competitions!

### Demo

- You can find a live demo [here](https://linkedIn.com/in/shamoilarsi)
- You can also download the app to test [here](https://drive.google.com/file/d/1Yul7poaKJm7T3Z9q-jDp2DRR8NmTn2A1/view?usp=sharing)

### Introduction
Hey, I've been a part of many college events, workshops and seminars. While they have been amazing, their registration process has always been on pen and paper. This makes it difficult to keep track of the number of registrations and the data of those who have registered. 
On top of that, this sheet can get lost or torn. 

To solve this issue and make the whole process of registrations easier, I've developed an Android app to manage registrations using QR codes.


### Tech Stack used

- React Native
- Firebase

### Steps to configure the app

- #### Clone the repository

  - Clone this repo to your local machine using `https://github.com/shamoilarsi/Event-Registration.git`
  - `cd` into the cloned directory.

- #### Install dependencies and run

  1. Make sure you have `node` and `yarn` installed.
  2. Run `yarn install` to install all dependencies.
  3. Follow [this](https://www.tutorialspoint.com/react_native/react_native_environment_setup.htm) tutorial to setup React Native environment.
  4. Run `yarn start` to start the metro bundler, in a dedicated terminal.
  5. Run `yarn android` to run the Android application (remember to start a simulator or connect an Android phone).

- #### Configure App

  1. Add the `google-services.json` file in android/app to link to your Firestore. [Learn more](https://rnfirebase.io/#2-android-setup)
  2. Currently sign-in method is anonymous. Consider using Google Auth for sign-in. [Learn more](https://rnfirebase.io/auth/social-auth#google)
  
  
- #### Firestore Schema

  1. Go to Firebase console and add your app as a WebApp. On completing this, paste the values of the config json in `uploadEventDetails.js`.
  2. Run `yarn install` in `JSON-To-Firestore` directory.
  3. To add events, you can add them to the `JSON-To-Firestore/firestore.json` file.
  4. After finalising the events, Run `node uploadEventDetails.js` to upload the changes.
  5. Also make sure to make the appropriate changes in the `constants/firestore.js` file.

### To-Do

- Notify registrant with the unique QR code and the registration id via email or SMS.
- A better and consistent UI/UX.
- Add a screen to view report.
- Option to call the coordinators of events directly.
- Add payment methods so registrants can directly register themselves.

### Contribute

Feel free to raise an issue or create a PR. Looking forward for contributions.
