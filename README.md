# Event Registration
A QR based registration system for college level competitions!

This app is developed using React Native and Firebase

### To use this app in your college,  
1. Change the SignIn method. Currently it is SignIn Anonymously which is not secure.
2. Change the `google-services.json` file in android/app to link to your firestore database.
3. All restrictions for specific features (like onlt admins can use Scan option) are disabled. Make the changes at required places.
4. While registering, change the value to `user.displayName` where displayName being the name of the user logged in. 
5. Uncomment code to set `isAdmin` when user is logged in with the email of one of the admins 
