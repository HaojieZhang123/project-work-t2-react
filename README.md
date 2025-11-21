# E-Commerce Beauty Store

> A modern, fully responsive e-commerce frontend application inspired by industry leaders like Douglas and Sephora. Built with the latest React ecosystem technologies.

## Project Overview

This project is a sophisticated Single Page Application (SPA) designed to provide a seamless shopping experience for beauty products. It features a dynamic product catalog, a fully functional shopping cart with persistence, a wishlist system, and a streamlined checkout flow.

The application connects to a backend API to fetch real-time product data, including "Best Sellers" and "Latest Products," ensuring the content is always fresh and engaging.

## Key Features

- **Dynamic Homepage:** Features an interactive hero banner slider and curated product sections (Best Sellers, Latest Products) powered by Swiper.js.
- **Advanced Search:** Dedicated search page with filtering capabilities to help users find exactly what they need.
- **Product Details:** Comprehensive product pages (`/product/:slug`) displaying detailed information, images, and add-to-cart functionality.
- **Smart Shopping Cart:**
  - Global state management using **Context API**.
  - **Persistent storage** using `localStorage` so users don't lose their items on refresh.
  - Sidebar cart for quick access and a dedicated full-page cart view.
  - Mobile-optimized cart overlay.
- **Wishlist:** Functionality to save favorite items for later.
- **Checkout Simulation:** A multi-step checkout process (`Cart` -> `Checkout` -> `Summary` -> `Final`).
- **Fully Responsive:** Mobile-first design approach using **Bootstrap 5** and custom CSS, ensuring a perfect experience on all devices.

## Tech Stack

This project leverages a modern and robust technology stack to ensure performance, scalability, and developer experience:

### Core

- **[React 19](https://react.dev/):** The latest version of the library for building user interfaces, utilizing modern hooks and concurrent features.
- **[Vite](https://vite.dev/):** Next-generation frontend tooling for lightning-fast development and optimized production builds.

### Routing & State

- **[React Router DOM 7](https://reactrouter.com/):** The standard for routing in React, handling dynamic routes (`/product/:slug`) and navigation.
- **React Context API:** Used for global state management (`CartContext`, `WishlistContext`) to handle application-wide data without prop drilling.

### Styling & UI

- **[Bootstrap 5](https://getbootstrap.com/):** Utilized for the responsive grid system and utility classes.
- **[Swiper.js](https://swiperjs.com/):** The most modern mobile touch slider for the hero banner and product carousels.
- **Custom CSS:** Tailored styles for a unique, premium look and feel (`index.css`).

### Data & Utilities

- **[Axios](https://axios-http.com/):** Promise-based HTTP client for making API requests to the backend.
- **ESLint:** For code quality and consistency.

## Architecture & Design Patterns

The project follows a clean, modular component-based architecture:

- **`src/components/`**: Reusable UI components (e.g., `Header`, `Footer`, `Slider`, `Cards`).
- **`src/pages/`**: Top-level page components corresponding to routes (e.g., `Homepage`, `DetailsPage`, `Cart`).
- **`src/context/`**: Context providers for managing global state.
  - **`CartContext`**: Manages cart items, quantities, and persistence.
  - **`WishlistContext`**: Manages user favorites.
- **`src/layout/`**: Layout wrappers (e.g., `DefaultLayout`) to ensure consistent structure (Header/Footer) across pages.
- **Custom Hooks:** Utilizes hooks like `useCart` and `useLocation` for logic encapsulation and cleaner components.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd project-work-t2-react
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # Global state (Cart, Wishlist)
├── layout/           # Layout components (Header, Footer)
├── pages/            # Page components (Routes)
├── App.jsx           # Main application component with Routing
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Future Improvements

- **User Authentication:** Implement full user login/signup with JWT.
- **Payment Gateway:** Integrate Stripe or PayPal for real transactions.
- **Backend Integration:** Connect to a production-ready backend (currently configured for localhost).
- **Unit Testing:** Add tests using Vitest and React Testing Library.
