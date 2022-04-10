// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowerCaseCharacters;
var upperCaseCharacters;
var numericalCharacters;
var specialCharacters;
var password;
var passwordLength;
var passwordLengthNumber;
var passwordMessage = "How long would you like your password to be? Please enter length below! The length should be between 8 and 128 characters.";
var lengthWarningMessage = "You entered an invalid number, please try entering a valid number. Remember that you should be entering a number between 8 and 128 characters.";
var userMessage = "Would you like your password to contain ";
var userInstruction = "If you would like to use these characters click OK, otherwise click Cancel.";
var buttonPress = 0;
var generatedPasswordArray = [];
var lowerCaseCharacterCodes = sortedArrayCharacterCodes(97, 122);
var upperCaseCharacterCodes = sortedArrayCharacterCodes(65, 90);
var numericalCharacterCodes = sortedArrayCharacterCodes(48, 57);
//This array is going to be a little tricky as not all special characters are placed together,they are separated
//across different sections of ASCII codes. We should be able to use the "concat" method to append multiple arrays
//to each other and sort them using our function.
var specialCharacterCodes = sortedArrayCharacterCodes(33,47).concat(sortedArrayCharacterCodes(58, 64))
.concat(sortedArrayCharacterCodes(91, 96)).concat(sortedArrayCharacterCodes(123, 126));
var finalCharacterCodes;


//Creating function to consumer user selections.

function userSelections() {

  //Prompting user to see what characters they would like to use.
  //Prompting user to see if they want lower case characters include in their password.
  do {
    //Asking user if they would like to user lower case characters, if yes we store their
    //response as a boolean. We use a similar approach for the other user selections.
    var userPrompt = userMessage + "lower case characters. " + userInstruction;
        if (confirm(userPrompt) == true){
          lowerCaseCharacters = true;
        }
          else {
            lowerCaseCharacters = false;
        }
      //Prompting user to see if they want upper case characters included in their password.
      userPrompt = userMessage + "upper case characters. " + userInstruction;
        if (confirm(userPrompt) == true) {
          upperCaseCharacters = true;
        }
          else {
            upperCaseCharacters = false;
          }

      //Prompting user to see if they want to numbers in their password.
      userPrompt = userMessage + "numerical characters. " + userInstruction;
        if (confirm(userPrompt) == true) {
          numericalCharacters = true;
        }
          else {
            numericalCharacters = false;
          }

      //Prompting user to see if they want special characters included in the password.
      userPrompt = userMessage + "special characters. " + userInstruction;
          if (confirm(userPrompt) == true) {
            specialCharacters = true;
          }
            else {
              specialCharacters = false;
            }

      //Adds check to see if user entered no for all of the conditions. If user has not
      //selected any of the options, we loop back to the beginning to ask the user to 
      //make at least one selection.
    }  while (lowerCaseCharacters == false && upperCaseCharacters == false && numericalCharacters == false && specialCharacters == false);

      //Prompting user to enter a number to dictate how long the password array should be.
      passwordLength = prompt(passwordMessage);
      passwordLengthNumber = parseInt(passwordLength);
      //We are using a while loop here to check if the parsed string entered is a number
      //We are also checking the number entered to see if it is bigger than 8 or 128.
      //If any of these conditions fail, the user is prompted to enter the value again.
      //We are also parsing using parseInt, if user enters a float we interpret as an int.
        while (isNaN(passwordLengthNumber) || passwordLengthNumber < 8 || passwordLengthNumber > 128 ){
          passwordLength = prompt(lengthWarningMessage);
          passwordLengthNumber = parseInt(passwordLength)
        }
      //console.log(typeof passwordLengthNumber);
}

//Function to randomly sort the final character codes.
function shuffleFinalArray(finalCharacterCodes) {
  for (var i = finalCharacterCodes.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [finalCharacterCodes[i], finalCharacterCodes[j]] = [finalCharacterCodes[j], finalCharacterCodes[i]];
  }
}

//Creating a function to create a "generated password array". We are using a for loop 
//to create an array that has a length defined by "passwordLengthNumber". For example,
//if the user enters 8, the for loop will run 8 times and create an array with length 
//8 [0-7].
function generatePassword() {
  //Checking password length value.
  //console.log(passwordLengthNumber);
  //Creating empty array.

  //This variable will be used to create a final array with all of our character codes
  //based on the user's selection.
  finalCharacterCodes = [];
  //We need to provide a base array to our final array, using if else statements to
  //get an idea of our base selection.
  if (lowerCaseCharacters == true) {
        finalCharacterCodes = lowerCaseCharacterCodes;
        //Need to create nested if statements to see if we need to add other character arrays
        //This is checking to see if the user selected yes to including the upper case 
        //characters in their password, if they did, we will use "concat" to append the 
        //upper case characters array into our current "finalCharacterCodes" array. We will be
        //using a similar approach with the other if else statements.
        if (upperCaseCharacters == true){
          finalCharacterCodes = finalCharacterCodes.concat(upperCaseCharacterCodes);
        }
        if (numericalCharacters == true){
          finalCharacterCodes = finalCharacterCodes.concat(numericalCharacterCodes);
        }
        if (specialCharacters == true ){
          finalCharacterCodes = finalCharacterCodes.concat(specialCharacterCodes);
        }
  }
    else if (upperCaseCharacters == true) {
        finalCharacterCodes = upperCaseCharacterCodes;
        //Don't need to check for previous "lowerCaseCharacter" selection as first loop
        //is taking care of that. Same logic applies to other "else if" statements.
        if (numericalCharacters == true){
          finalCharacterCodes = finalCharacterCodes.concat(numericalCharacterCodes);
        }
        if (specialCharacters == true) {
          finalCharacterCodes = finalCharacterCodes.concat(specialCharacterCodes);
        }
    }
    else if (numericalCharacters == true) {
        finalCharacterCodes = numericalCharacterCodes;
        if (specialCharacters == true) {
          finalCharacterCodes = finalCharacterCodes.concat(specialCharacterCodes);
        }
    }
    else if (specialCharacters == true){
        finalCharacterCodes = specialCharacterCodes;
    }

    //Performing a final sorting of the array that is created by the user selections.
    //I am going to randomize the order or the elements in the final array as it is currently
    //biased when it comes to the initial array elements when small numbers are picked.
    //Password will still be a little more biased towards letters as there are 52 of those (lower
    //and upper case) but this should help a bit.
    shuffleFinalArray(finalCharacterCodes);

//Now that we have a "finalCharacterCodes" array, we can go through and pick character
//codes from the available set of character codes to randomly generate a password one array'
//element at a time.

//Janky solution to fix issue of array length not matching up with available array options. Creates 160
//array options if user picks lowest available option that includes 10 array elements.

if (passwordLengthNumber > finalCharacterCodes.length){
  finalCharacterCodes = 
  finalCharacterCodes.concat(finalCharacterCodes).concat(finalCharacterCodes).concat(finalCharacterCodes).concat(finalCharacterCodes);
}
console.log(finalCharacterCodes);

for (var i = 0; passwordLengthNumber > i; i++){
  var individualCharacterCode = 
  finalCharacterCodes[Math.floor(Math.random() * passwordLengthNumber)];
  console.log(individualCharacterCode);

  individualCharacterCode = 
  String.fromCharCode(individualCharacterCode);

  generatedPasswordArray.push(individualCharacterCode);
}
return generatedPasswordArray.join('');
}


//This function will be used to generate an array with the character codes for each of
//the selections that the user has made. We are also going to be sorting the array from,
//the smallest value to the highest value which means we need to pass a "low" argument 
//and a "high" argument.
function sortedArrayCharacterCodes(low, high) {
  var array = [];
  for (var i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

//Resetting password so that user can generate a new one. Using timeout
//function to clear previous password after 5 seconds.
function resetPassword(){
  function resetPasswordPrompt(){
    alert("Clearing your password for security purposes.")
    document.querySelector("#password").value = "Generate New Password";
    password = " ";
    generatedPasswordArray = [];
  }
  setTimeout(resetPasswordPrompt, 5000);
}
  

// Write password function. Called when user clicks on "Generate Password" button.
function writePassword() {
 
//Calling the userSelection function that is used to consume user's input. Based off
//the user selections, we will pass an array with the possible password options.
  userSelections();

  //Creating a variable "password" that will be used to stored our generated password.
  //We are also calling the "generatePassword" function to get create the password.
  password = generatePassword();
  //Creating a "passwordText" variable to pull the element that will be used to store/display
  //our password to the user.
  var passwordText = document.querySelector("#password");
  //The value stored in "password" is displayed on the element that we previously pulled using
  //the query selector.
  passwordText.value = password;

  resetPassword();

}

//Add event listener to generate button. When the user clicks on this button
//we call the "writePassword" function which is our main function that will 
//take the user selections and generate a random password for the user.

generateBtn.addEventListener("click", writePassword);