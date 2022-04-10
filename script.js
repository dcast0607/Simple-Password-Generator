// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowerCaseCharacters;
var upperCaseCharacters;
var numericalCharacters;
var specialCharacters;
var passwordLength;
var passwordLengthNumber;
var passwordMessage = "How long would you like your password to be? Please enter length below! The length should be between 8 and 128 characters.";
var lengthWarningMessage = "You entered an invalid number, please try entering a valid number. Remember that you should be entering a number between 8 and 128 characters.";
var userMessage = "Would you like your password to contain ";
var userInstruction = "If you would like to use these characters click OK, otherwise click Cancel."
var generatedPasswordArray = [];
var lowerCaseCharacterCodes = sortedArrayCharacterCodes(97, 122);
console.log(lowerCaseCharacterCodes);
var upperCaseCharacterCodes = sortedArrayCharacterCodes(65, 90);
console.log(upperCaseCharacterCodes);
var numericalCharacterCodes = sortedArrayCharacterCodes(48, 57);
console.log(numericalCharacterCodes);
//This array is going to be a little tricky as not all special characters are placed together,they are separated
//across different sections of ASCII codes. We should be able to use the "concat" method to append multiple arrays
//to each other and sort them using our function.
var specialCharacterCodes = sortedArrayCharacterCodes(33,47).concat(sortedArrayCharacterCodes(58, 64))
.concat(sortedArrayCharacterCodes(91, 96)).concat(sortedArrayCharacterCodes(123, 126));
console.log(specialCharacterCodes);



//Creating function to consumer user selections.

function userSelections() {

  //Prompting user to see what characters they would like to use.
  //Prompting user to see if they want lower case characters include in their password.
  do {
    var userPrompt = userMessage + "lower case characters. " + userInstruction;
        if (confirm(userPrompt) == true){
          lowerCaseCharacters = true;
        }
          else {
            lowerCaseCharacters = false;
        }
      console.log(lowerCaseCharacters);
      //Prompting user to see if they want upper case characters included in their password.
      userPrompt = userMessage + "upper case characters. " + userInstruction;
        if (confirm(userPrompt) == true) {
          upperCaseCharacters = true;
        }
          else {
            upperCaseCharacters = false;
          }
        console.log(upperCaseCharacters);

      //Prompting user to see if they want to numbers in their password.
      userPrompt = userMessage + "numerical characters. " + userInstruction;
        if (confirm(userPrompt) == true) {
          numericalCharacters = true;
        }
          else {
            numericalCharacters = false;
          }
        console.log(numericalCharacters);

      //Prompting user to see if they want special characters included in the password.
      userPrompt = userMessage + "special characters. " + userInstruction;
          if (confirm(userPrompt) == true) {
            specialCharacters = true;
          }
            else {
              specialCharacters = false;
            }
          console.log(specialCharacters);

      //Adds check to see if user entered no for all of the conditions.
    }  while (lowerCaseCharacters == false && upperCaseCharacters == false && numericalCharacters == false && specialCharacters == false);

      //Prompting user to enter a number to dictate how long the password array should be.
      passwordLength = prompt(passwordMessage);
      passwordLengthNumber = parseInt(passwordLength);
      //We are using a while loop here to check if the parsed string entered is a number
      //We are also checking the number entered to see if it is bigger than 8 or 128.
      //If any of these conditions fail, the user is prompted to enter the value again.
        while (isNaN(passwordLengthNumber) || passwordLengthNumber < 8 || passwordLengthNumber > 128 ){
          passwordLength = prompt(lengthWarningMessage);
          passwordLengthNumber = parseInt(passwordLength)
        }
      console.log(typeof passwordLengthNumber);
}


//Creating a function to create a "generated password array". We are using a for loop 
//to create an array that has a length defined by "passwordLengthNumber". For example,
//if the user enters 8, the for loop will run 8 times and create an array with length 
//8 [0-7].
function generatePassword() {
  //Checking password length value.
  console.log(passwordLengthNumber);
  //Creating empty array.

  //This variable will be used to create a final array with all of our character codes
  //based on the user's selection.
  var finalCharacterCodes = [];
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
          console.log(finalCharacterCodes);
        }
        if (numericalCharacters == true){
          finalCharacterCodes = finalCharacterCodes.concat(numericalCharacterCodes);
          console.log(finalCharacterCodes);
        }
        if (specialCharacters == true ){
          finalCharacterCodes = finalCharacterCodes.concat(specialCharacterCodes);
          console.log(finalCharacterCodes);
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

//Now that we have a "finalCharacterCodes" array, we can go through and pick character
//codes from the available set of character codes to randomly generate a password one array'
//element at a time.

for (var i = 0; passwordLengthNumber > i; i++){
  var individualCharacterCode = finalCharacterCodes[Math.floor(Math.random() * passwordLengthNumber)];
  individualCharacterCode = String.fromCharCode(individualCharacterCode);
  generatedPasswordArray.push(individualCharacterCode);
  console.log(generatedPasswordArray[individualCharacterCode]);
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




// Write password to the #password input
function writePassword() {
//Calling the userSelection function that is used to consume user's input.
userSelections();

//Testing to see if user input is available even though we called it in a different function.
//I think we can call them as they are global variables.
console.log(lowerCaseCharacters);
console.log(upperCaseCharacters);
console.log(numericalCharacters);
console.log(specialCharacters);
console.log(passwordLengthNumber);
//Logging to see if we can print strings from ASCII character codes.
String.fromCharCode(60);
//Logging to console to see if it worked. 
console.log(specialCharacterCodes);

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



