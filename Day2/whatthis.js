const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store user data
const users = {};

// Current user
let currentUser = null;

// Welcome message
console.log('Welcome to the Simple Banking System!');

// Function to display available options
function displayOptions() {
    const boxWidth = 30;
    const optionText = 'Please select an option:';
  
    const line = '+' + '-'.repeat(boxWidth - 2) + '+';
    const emptyLine = '|' + ' '.repeat(boxWidth - 2) + '|';
    const paddedOptionText = '| ' + optionText + ' '.repeat(boxWidth - optionText.length - 4) + '|';
  
    console.log(line);
    console.log(emptyLine);
    console.log(paddedOptionText);
    console.log(emptyLine);
    
    if (currentUser) {
      console.log('|' + '        1. Deposit'.padEnd(boxWidth - 2) + '|');
      console.log('|' + '        2. Display Balance'.padEnd(boxWidth - 2) + '|');
      console.log('|' + '        3. Withdraw'.padEnd(boxWidth - 2) + '|');
      console.log('|' + '        4. Logout'.padEnd(boxWidth - 2) + '|');
    } else {
      console.log('|' + '        1. New User'.padEnd(boxWidth - 2) + '|');
      console.log('|' + '        2. Login'.padEnd(boxWidth - 2) + '|');
      console.log('|' + '        3. Exit'.padEnd(boxWidth - 2) + '|');
    }
    
    console.log(emptyLine);
    console.log(line);
  }
  

// Function to handle new user creation
function createNewUser() {
  rl.question('Enter a username: ', (username) => {
    rl.question('Enter a password: ', (password) => {
      // Store the user data
      users[username] = {
        password: password,
        balance: 0
      };
      console.log('User created successfully!');
      displayOptions();
      processInput();
    });
  });
}

// Function to handle user login
function loginUser() {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      if (users.hasOwnProperty(username) && users[username].password === password) {
        currentUser = username;
        console.log('Login successful!');
        displayOptions();
      } else {
        console.log('Invalid username or password. Please try again.');
      }
      processInput();
    });
  });
}

// Function to handle deposit
function deposit() {
  rl.question('Enter the amount to deposit: ', (amount) => {
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a valid number.');
    } else {
      users[currentUser].balance += parseFloat(amount);
      console.log(`Deposit of ${amount} successful!`);
      displayOptions();
    }
    processInput();
  });
}

// Function to handle balance display
function displayBalance() {
  console.log(`Your current balance is: ${users[currentUser].balance}`);
  displayOptions();
  processInput();
}

// Function to handle withdrawal
function withdraw() {
  rl.question('Enter the amount to withdraw: ', (amount) => {
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a valid number.');
    } else if (parseFloat(amount) > users[currentUser].balance) {
      console.log('Insufficient balance.');
    } else {
      users[currentUser].balance -= parseFloat(amount);
      console.log(`Withdrawal of ${amount} successful!`);
      displayOptions();
    }
    processInput();
  });
}

// Function to handle user logout
function logout() {
  currentUser = null;
  console.log('Logout successful!');
  displayOptions();
  processInput();
}

// Function to process user input
function processInput() {
    rl.question('Enter your choice: ', (choice) => {
      switch (choice) {
        case '1':
          if (currentUser) {
            deposit();
          } else {
            createNewUser();
          }
          break;
        case '2':
          if (currentUser) {
            displayBalance();
          } else {
            loginUser();
          }
          break;
        case '3':
          if (currentUser) {
            withdraw();
          } else {
            rl.close();
          }
          break;
        case '4':
          logout();
          break;
        default:
          console.log('Invalid choice. Please try again.');
          displayOptions();
          processInput();
          break;
      }
    });
  }
  
  // Start the program
  displayOptions();
  processInput();
  