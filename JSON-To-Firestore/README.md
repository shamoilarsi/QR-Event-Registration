## Configure Firestore
### Firestore Schema
1. Go to Firebase console and add your app as a WebApp. On completing this, paste the values of the config json in `uploadEventDetails.js`.
2. Run `yarn install` in `JSON-To-Firestore` directory. 
3. To add events, you can add them to the `JSON-To-Firestore/firestore.json` file.
4. After finalising the events, Run `node uploadEventDetails.js` to upload the changes.
5. Also make sure to make the appropriate changes in the `constants/firestore.js` file.
