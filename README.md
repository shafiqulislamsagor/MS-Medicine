# Project Title

## [MS Medicine <---- Go to site](https://sm-medicine.web.app/)

## Overview

MS Medicine is an ecommerce platform tailored for buying and selling medicines, featuring robust role-based access, secure authentication, and responsive design.

## Features

- **Role-based Access:** Supports Admin, Seller, and User roles with distinct permissions for managing products, payments, and user roles.

- **Firebase Authentication:** Integrates Google login and custom account creation with role selection, ensuring secure access and user management.

- **E-commerce Functionality:** Users can browse, purchase medicines, and pay securely via Stripe. Purchase details are downloadable as PDFs.

## Running the Project

```bash
// Install dependencies
npm install

// Create .env.local file and set up Firebase keys
VITE_apiKey=hidden
VITE_authDomain=hidden
VITE_projectId=hidden
VITE_storageBucket=hidden
VITE_messagingSenderId=hidden
VITE_appId=hidden

VITE_SERVER_URL=https://server-iota-rose.vercel.app

VITE_imgbb_key=hidden

VITE_STRIPE_KEY=hidden

// Run the project
npm run dev
```



## npm Package Using


- [Swiper slider](https://swiperjs.com/)
- [Lottie](https://www.npmjs.com/package/lottie-react)
- [React toastify](https://www.npmjs.com/package/react-toastify)
- [React helmet](https://www.npmjs.com/package/react-helmet-async)
- [React icons](https://react-icons.github.io/react-icons/)
