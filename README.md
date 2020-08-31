## Event Registration

A QR based registration system for events and competitions!

### User Journey

You can find a live demo [here](https://linkedIn.com/in/shamoilarsi)

### Tech Stack and Packages used

- React Native (Tested on Android only)
- Firebase
- [react-native-qrcode-scanner](https://www.npmjs.com/package/react-native-qrcode-scanner) - To scan QR codes.
- [react-native-qrcode-svg](https://www.npmjs.com/package/react-native-qrcode-svg) - To generate QR codes.
- [react-native-fs](https://www.npmjs.com/package/react-native-fs) - To export the report of registered students.
- [react-native-responsive-fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize) - For consistent font size across devices.
- [Formik](https://formik.org/) - To handle form for registrations.

### Steps to configure the app

#### Clone the repository

- Clone this repo to your local machine using `https://github.com/shamoilarsi/Event-Registration.git`
- `cd` into the cloned directory.

#### Install dependencies and run

1. Make sure you have `node` and `yarn` installed.
2. Run `yarn install` to install all dependencies.
3. Follow [this](https://www.tutorialspoint.com/react_native/react_native_environment_setup.htm) tutorial to setup React Native environment.
4. Run `yarn start` to start the metro bundler, in a dedicated terminal.
5. Run `yarn android` to run the Android application (remember to start a simulator or connect an Android phone).

#### Configure App

1. Currently sign-in method is anonymous. Consider using Google Auth for sign-in. [Learn more](https://rnfirebase.io/auth/social-auth#google)
2. Add the `google-services.json` file in android/app to link to your Firestore. [Learn more](https://rnfirebase.io/#2-android-setup)

#### Firestore Schema

You can find the structure of the Firestore in `other/FirestoreExample.txt` file.

### To-Do

- A better and consistent UI/UX.
- Notify registrant with the unique QR code and the registration id via email or SMS.
- Add a screen to view report.
- Find a better method of exporting the report.
- Option to call the coordinators of events directly.
- Add payment methods so registrants can directly register themselves.

### Contribute

Feel free to raise an issue or create a PR. Looking forward for contributions.
