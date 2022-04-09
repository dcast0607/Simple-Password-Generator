// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowerCaseCharacters = "lower case characters. ";
var upperCaseCharacters = "upper case characters. ";
var numericalCharacters = "numerical characters. ";
var specialCharacters = "special characters. ";
var passwordLength;
var passwordLengthNumber;
var passwordMessage = "How long would you like your password to be? Please enter length below! The length should be between 8 and 128 characters.";
var lengthWarningMessage = "You entered an invalid number, please try entering a valid number. Remember that you should be entering a number between 8 and 128 characters.";
var userMessage = "Would you like your password to contain ";
var userInstruction = "If you would like to use these characters click OK, otherwise click Cancel."



//Creating function to consumer user selections.

function userSelections() {

  //Prompting user to see what characters they would like to use.
  //Prompting user to see if they want lower case characters include in their password.
  var userPrompt = userMessage + lowerCaseCharacters + userInstruction;
      if (confirm(userPrompt) == true){
        lowerCaseCharacters = true;
      }
        else {
          lowerCaseCharacters = false;
      }
    console.log(lowerCaseCharacters);
    //Prompting user to see if they want upper case characters included in their password.
    userPrompt = userMessage + upperCaseCharacters + userInstruction;
      if (confirm(userPrompt) == true) {
        upperCaseCharacters = true;
      }
        else {
          upperCaseCharacters = false;
        }
      console.log(upperCaseCharacters);

    //Prompting user to see if they want to numbers in their password.
    userPrompt = userMessage + numericalCharacters + userInstruction;
      if (confirm(userPrompt) == true) {
        numericalCharacters = true;
      }
        else {
          numericalCharacters = false;
        }
      console.log(numericalCharacters);

    //Prompting user to see if they want special characters included in the password.
    userPrompt = userMessage + specialCharacters + userInstruction;
        if (confirm(userPrompt) == true) {
          specialCharacters = true;
        }
          else {
            specialCharacters = false;
          }
        console.log(specialCharacters);
    

    //Prompting user to enter a number to dictate 
    passwordLength = prompt(passwordMessage);
    passwordLengthNumber = parseInt(passwordLength);
      while (isNaN(passwordLengthNumber) || passwordLengthNumber < 8 || passwordLengthNumber > 128 ){
        passwordLength = prompt(lengthWarningMessage);
        passwordLengthNumber = parseInt(passwordLength)
      }
    console.log(typeof passwordLengthNumber);
}

// Write password to the #password input
function writePassword() {
userSelections();
console.log(lowerCaseCharacters);
console.log(upperCaseCharacters);
console.log(numericalCharacters);
console.log(specialCharacters);
console.log(passwordLengthNumber);

    
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



/*
Game Plan: Revision 1
Base code has been built out so we need to find a way to prompt the user
to select what type of password they would like.

We should present the user with 4 prompts:

Prompt 1: Would you like your password to include lower case characters?
Prompt 2: Would you like your password to include upper case characters?
Prompt 3: Would you like your password to include numbers?
Prompt 4: Would you like your password to include special characters?
Prompt 5: How long would you like the password to be?

We can use these prompts to ask the user if they would like to include these 
characters in their password, if the user presses "Ok" on the prompt, then we 
can use the characters, if the user presses "cancel" then we do not use the
characters. 

Answer to password will be used to generate array length.
*/