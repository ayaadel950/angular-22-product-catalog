# Angular 22 Product Catalog & Orders

A simple, clean implementation of **Angular Task 5** using Angular 22, standalone components, lazy routes, Signals, typed Reactive Forms and the Fake Store API.

## Run the application

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## What was implemented

### Product catalogue
- `/products` loads products and categories from `https://fakestoreapi.com`.
- Products appear as reusable cards showing image, title, category, rating and price.
- A category dropdown filters the already-loaded products.
- `selectedCategory` is an Angular Signal and `filteredProducts` is computed from it.
- Loading, empty and friendly API-error states are included.

### Reusable product card
- `ProductCardComponent` receives a strongly typed `Product` through `@Input`.
- It emits the selected product through `@Output` when **Add to cart** is clicked.
- The parent owns the cart action, keeping the card reusable.

### Product details
- `/products/:id` reads the ID from the route and requests that product.
- It shows the complete description, rating, category, image and price.
- Invalid IDs and failed requests show a friendly fallback instead of breaking the page.

### Cart
- `CartService` owns the cart state using a private writable Signal and public read-only state.
- It supports add, remove, quantity changes and clear.
- Item count and total are derived with `computed`, so duplicated state is avoided.
- `/cart` displays all items and links to checkout.

### Checkout
- `/checkout` uses a typed Reactive Form with name, email, address and quantity.
- Required, email, minimum-length and minimum-value validation are included.
- Validation messages are shown after a field is touched.
- A successful mocked order clears the cart.

### Mock authentication
- `/login` and `/register` use typed Reactive Forms.
- `User` is a dedicated TypeScript interface.
- `AuthService` uses a Signal for the current user. This is intentionally in-memory because the task allows mocked authentication.
- `authGuard` protects `/checkout` and redirects unauthenticated users to `/login` while preserving the return URL.

## Clean-code and Angular practices

- **Standalone components:** no unnecessary NgModules.
- **Feature-based folders:** `core`, `shared`, `features` and `models` make responsibilities clear.
- **Lazy-loaded routes:** every page is loaded with `loadComponent`.
- **Dependency injection with `inject()`:** keeps constructors empty and dependencies visible.
- **Strict typing:** no `any` is declared in TypeScript code; API models and form controls are typed.
- **Signals for state:** cart, authentication, loading, errors and category selection use Signals.
- **Computed state:** cart totals and filtered products are calculated rather than manually synchronised.
- **Reactive Forms:** used because the task explicitly requires them for checkout, login and registration.
- **Modern templates:** `@if` and `@for` are used, with stable tracking keys.
- **Separation of concerns:** HTTP access is in `ProductService`, business state is in services, and components focus on UI behaviour.
- **Accessible basics:** labels, button types, image alt text and useful link labels are supplied.
- **Test-friendly IDs:** form controls and submit buttons have stable IDs.

## Project structure

```text
src/app/
├── core/
│   ├── guards/auth.guard.ts
│   └── services/
│       ├── auth.service.ts
│       ├── cart.service.ts
│       └── product.service.ts
├── features/
│   ├── auth/login and register
│   ├── cart
│   ├── checkout
│   └── products/product-list and product-details
├── models/
│   ├── product.model.ts
│   └── user.model.ts
├── shared/components/
│   ├── loading-spinner
│   └── product-card
├── app.config.ts
├── app.routes.ts
└── app.component.*
```

## Important simplifications

- Authentication and checkout submission are mocked and reset after a browser refresh.
- Cart data is also in memory to keep the exercise focused. Local storage can be added later behind the same `CartService` API.
- The quantity in checkout is kept because it is explicitly required by the task, although the cart already has per-product quantities.
- The project uses plain SCSS and no component library, so it is easy to understand and extend.

## Suggested verification

1. Open Products and check loading and cards.
2. Filter by category.
3. Open one product through its image.
4. Add products, change quantities and remove an item.
5. Open Checkout while logged out and confirm redirect to Login.
6. Log in with any valid-looking email and a password of at least six characters.
7. Submit invalid checkout values and check messages, then submit valid values.
