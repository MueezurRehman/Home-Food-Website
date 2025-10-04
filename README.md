# HomeFoodWebApp

A modern food ordering web application built with React, Vite, Redux Toolkit, Firestore, and Tailwind CSS. This project allows users to browse a menu, add items to a cart, sign up/sign in, and place orders with real-time updates and admin-friendly data structure.

## Features

- **Smooth Section Navigation:** Navbar scrolls to sections on the home page.
- **Authentication:** Sign up and sign in with Firestore, including validation and persistent login.
- **Cart & Order System:** Add items to cart, themed order form, autofill user info, and place orders.
- **Real-time Menu:** Menu items are fetched from Firestore and update in real time.
- **Menu Availability:** Menu items appear on the website only after they are marked available from the HomeFood mobile application.
- **Dynamic Images:** Food images are loaded dynamically.
- **Admin-Friendly Orders:** Each order is stored with all relevant fields for easy management.
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-friendly look.

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm or yarn
- Firebase project (for Firestore)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MueezurRehman/Home-Food-Website.git
   cd HomeFoodWeb
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore Database.
   - Copy your Firebase config and add it to a `.env` file (see below).

4. Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```
The production-ready files will be in the `dist/` folder.

### Deployment
- Upload the contents of the `dist/` folder to your web host (e.g., Namecheap public_html).
- Make sure your environment variables are set correctly for production.

## Project Structure
```
HomeFoodWeb/
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable React components
│   ├── data/             # Static data (if any)
│   ├── pages/            # Page components (Home, Menu, Cart, etc.)
│   ├── redux/            # Redux store and slices
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static public files
├── .env                  # Environment variables (not committed)
├── .gitignore            # Files/folders to ignore in git
├── package.json          # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS config
├── vite.config.js        # Vite config
└── README.md             # This file
```

## Firestore Collections
- **Users**: Stores user info with email as document ID.
- **menuItems**: Stores menu items with fields like name, price, cost, available, etc. Only items marked available from the HomeFood mobile application will appear on the website.
- **orders**: Each order contains item, quantity, meal, name, phone, price, status, hostel, cost, margin, createdAt (timestamp).

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---
**Developed with ❤️ for HomeFood foodies!**


