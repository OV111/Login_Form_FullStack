# 🔐 Login Form (React + Node)

A simple login form built using React and JSX, featuring field validation, error messaging, disabled button states, and persistent data storage via localStorage.

## Features
 - 🛂 All input fields are validated 
 - ❗ Displays error messages under each invalid input
 - 🔒 Submit button is disabled until all fields are valid
 - 💾 localStorage is used to persist user input even on refresh
 - 📂 Data is stored in a JSON file for easy access(then will be hashed)

 * 🧪 Validation Logic
    - Email: Must be a valid email format
    - Password: Minimum 6 characters
    - Fields show errors after blur or invalid submission
    - Form can't be submitted until all fields are valid
## Technologies Used
- React.js
- Node.js
- CSS for styling
- JSON for DB
- Vite for development server
- npm for package management



### 🛠️ Installation

- git clone https://github.com/OV111/Login_Form_JSX.git
- cd login-form-react
- npm install
- npm run dev

![Login Form Preview](src/assets/Screenshot.png)

### 📂 File Structure
```
src/
├── components/                                 
│   ├── LoginForm.jsx
│   ├── InputField.jsx  
│   └── ErrorMessage.jsx
├── App.jsx
├── index.jsx
├── styles.css
└── assets/
    └── Screenshot.png
```

### 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.