# Bit För Bit

Bit För Bit is a React-based web application that allows users to manage their puzzle collection online. Users can add, edit, view, and delete puzzles in their collection. It also supports user authentication, including signup and login functionalities.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your system.
- npm or yarn as your package manager.
- Access to a MongoDB instance for database services.
- A modern web browser that supports JavaScript and React applications.

## Installation

To install "Bit För Bit", follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourgithub/bit-for-bit.git
   cd bit-for-bit
   ```

2. **Install dependencies**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and update it with your specific settings:

   ```plaintext
   REACT_APP_API_URL=http://your-server/api
   ```

## Running the Application

To run the application, execute the following command:
```bash
npm run build
```
This builds the application for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

To run "Bit För Bit", execute the following command:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Features

- **User Authentication**: Sign up for an account, log in, and log out functionalities.
- **Manage Puzzles**: Add new puzzles to your collection, edit existing details, or remove them.
- **View Puzzle Details**: Click on any puzzle to view detailed information about it.

## Components Overview

Here's a brief overview of the main components:

- **`StartPage.js`**: The landing page where users can log in or navigate to the signup page.
- **`CreateUser.js`**: Allows new users to create an account.
- **`LogOut.js`**: Handles user logout functionality.
- **`AddPuzzle.js`, `EditPuzzle.js`**: Components for adding and editing puzzles.
- **`SinglePuzzle.js`**: Displays detailed information about a single puzzle.
- **`MyPuzzles.js`**: Lists all puzzles in the user's collection.
- **`Navigation.js`**: Provides navigation links and logout button.
- **`PuzzleForm.js`**: Reusable form used for both adding and editing puzzle details.

## Contributing to Bit För Bit
The boiler plate code in this project is from the application "PixFlixr" that was developed by Anja Willsund during the course 1DV613 Software Development Project.\
Contributions to the "Bit För Bit" project are welcome. If you have suggestions or improvements, please fork the repository and submit a pull request.

The credit for the icons used in the application goes to the following people:\
Log out icon - Pixel perfect at [Flaticon](https://www.flaticon.com/free-icon/logout_1828427?term=logout&page=1&position=2&origin=tag&related_id=1828427)\
Filter icon - Freepik at [Flaticon](https://www.flaticon.com/free-icon/logout_1828427?term=logout&page=1&position=2&origin=tag&related_id=1828427)\
Default puzzle image - Mel Poole at [Unsplash](https://unsplash.com/photos/white-and-black-hearts-illustration-eo5Hrzyb4D0)


## License
Distributed under the MIT License. See `LICENSE` for more information.

Please adjust the repository URL and any other specific details according to your project's actual setup. If you have specific sections or details you'd like to add or modify, let me know! If you want more information about this project and how it was developed, please visit the project's [Wiki](https://github.com/aw22hs/bit-for-bit/wiki).
