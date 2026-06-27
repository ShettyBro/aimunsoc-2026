# AiCon 2026 — Official Conference Portal & Admin Dashboard

Welcome to the official repository of **AiCon'26**, the flagship Model United Nations (MUN) conference organized by the **Acharya Institutes' Model United Nations Society (AIMUNSOC)**. This project is a full-stack web application that serves as the public landing page for the conference, facilitates participant registrations (both individual and delegation), and provides a fully featured, secure Admin Dashboard for managing delegates, payments, and communication messages.

---

## 🏗️ Technical Stack

The project is built using a modern, performant, and type-safe architecture:

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for static type checking
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) for utility-first styling + Custom Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions, micro-animations, and scroll-triggered animations
- **Icons**: [Lucide React](https://lucide.dev/) for a clean vector icon set
- **Excel Export**: [SheetJS (xlsx)](https://sheetjs.com/) for client-side generation of multi-sheet registration workbooks
- **HTTP Client**: [Axios](https://axios-http.com/) with request and response interceptors

### Backend & API
- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Serverless Framework**: [Vercel Serverless Functions](https://vercel.com/docs/functions) (configured under `/api` directory)
- **Database ORM**: [Prisma ORM v5](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (hosted on cloud, configured via Prisma schema)

### Security & Authentication
- **Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for secure, salted password hashing
- **Session Tokens**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken) for issuing, signing, and verifying API session keys

---

## 🔒 Authentication System (A-Z)

The application utilizes a secure, stateless JWT-based authentication flow to guard the Admin Dashboard.

```mermaid
sequenceDiagram
    participant Admin as Admin Page (Client)
    participant LS as Local Storage
    participant API as Vercel Serverless API (/api/ad)
    participant DB as PostgreSQL (via Prisma)

    Admin->>API: POST /ad/login { username, password }
    API->>DB: Query Admin (case-insensitive username)
    DB-->>API: Returns password hash
    API->>API: Compare password via bcrypt
    alt Credentials Invalid
        API-->>Admin: 401 Unauthorized
    else Credentials Valid
        API->>API: Sign JWT token (6h expiration)
        API->>DB: Update lastLogin (Async)
        API-->>Admin: 200 OK { token, username, expiresIn }
        Admin->>LS: Store token, username, expiresAt
    end

    Note over Admin, API: Subsequent API Calls
    Admin->>API: GET /ad/registrations (Header: Bearer <token>)
    API->>API: Validate signature, expiration via requireAuth()
    alt Token Valid
        API-->>Admin: 200 OK with registration data
    else Token Expired/Invalid
        API-->>Admin: 401 Unauthorized
        Admin->>LS: Clear session data
        Admin->>Admin: Redirect to /ad-login
    end
```

### 1. Client-Side Management (`src/utils/auth.ts` & `src/utils/api.ts`)
- **Storage**: When an admin successfully logs in, the session token, username, and calculated expiry time (Current Time + 6 hours) are saved in `localStorage` under keys `aimunsoc_admin_token`, `aimunsoc_admin_user`, and `aimunsoc_admin_expires`.
- **Axios Request Interceptor**: Automatically intercepts every outgoing API call to `/api/*` and appends the `Authorization: Bearer <token>` header if a valid token is present in local storage.
- **Axios Response Interceptor**: If any API request returns a `401 Unauthorized` status (indicating token expiration or invalidation), the interceptor automatically clears the session variables from `localStorage`, prompting a client-side route redirection to the login page.
- **Protected Routes**: The `/ad` route is protected by a `<ProtectedRoute>` component in `src/App.tsx`. It runs a synchrony check on mount, verifying token presence and expiration before rendering the Admin panel. If invalid, it replaces the history state to redirect the user to `/ad-login`.

### 2. Server-Side Verification (`lib/auth.js`)
- **Extraction**: The `extractToken` function looks for the `Authorization` header in the incoming request, parses the `Bearer ` prefix, and isolates the JWT.
- **Verification**: The `requireAuth` middleware verifies the parsed token against the server's `JWT_SECRET` key using `jsonwebtoken`.
- **Error Handling**: If verification fails due to expiration (`TokenExpiredError`), the API sends a distinct `expired: true` flag back to the client to notify them that their session has expired rather than simply failed.

### 3. Account Initialization (`api/ad/seed.js`)
- **Seeding Endpoint**: To set up the initial admin without manually writing SQL queries, `/api/ad/seed` reads `ADMIN_USERNAME` and `ADMIN_PASSWORD` from the server environment.
- **One-time execution**: It performs an `admin.count()` database query first. If an admin account already exists, it aborts with a `409 Conflict` status code to prevent unauthorized overrides.
- **Encryption**: It hashes the raw password with a high work factor (`12` rounds of salt) before committing it to the database.

---

## 📈 Application Flow & Navigation Map

```
                     [User Visits Portal]
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                         ▼
   [Public Landing]                        [Admin Gateway]
         │                                         │
 ┌───────┼───────┬───────┐                         ▼
 ▼       ▼       ▼       ▼                   [/ad-login]
Home   About   Board  Gallery                      │
         │                                         ▼
         ▼                                  (Auth Check)
  [/committees]                                    │
         │                                 ┌───────┴───────┐
         ▼                                 ▼ (Fail)        ▼ (Pass)
    [/register]                       Redirect /ad-login    [/ad] (Dashboard)
         │                                                 │
 ┌───────┴──────────────┐                            ┌─────┴─────┬────────────┐
 ▼                      ▼                            ▼           ▼            ▼
[Individual Form]      [Delegation Form]         Dashboard  Registrations  Messages
 - Auto-validation      - Size-based Tier Pricing  Overview   & Filters   Inbox
 - Off-site payment     - Per-head Discounts       & Charts   & Export
 - Transaction Log      - Transaction Log
```

### 1. Public Visitor Flow
1. **Home**: Visual entry point containing the countdown timer matching the configured `VITE_CONFERENCE_DATE`, theme callouts, key features, and highlights.
2. **About**: Details the history of the Acharya Institutes' Model United Nations Society (AIMUNSOC), its mission, and its growth timeline.
3. **Committees**: Features the active committees (e.g., UNSC, UNGA, IP, etc.), agenda items, background guides, and link to the Committee Matrix sheet.
4. **Board**: Showcases members of the Secretariat and the Executive Board with their credentials.
5. **Gallery**: Displays visual highlights from preceding AiCon chapters.
6. **Contact**: Form to submit queries directly. Integrates validation and records submissions in the database under `ContactMessage`.

### 2. Registration Flow & Form Logic
Participants choose between two channels, both requiring off-site transaction IDs for validation:
- **Individual Form**:
  - Requires standard contact information (Name, Age, Email, Phone, Institution, City).
  - Captures up to 3 choices for preferred Committees and Portfolios.
  - Dynamically calculates accommodation charges based on the selected scheme (e.g., 2 nights vs. 3 nights).
  - Stores payment logs and redirects to external payment portals.
  - Saves new institution names in the `College` database table dynamically for future autocompletion options.
- **Delegation Form**:
  - Tailored for large institutional teams led by a single Head Delegate.
  - Pricing is calculated through tier volume pricing (defined in `src/data/pricing.ts`):
    - **12–14 delegates**: ₹1,650 per head
    - **15–19 delegates**: ₹1,600 per head
    - **20–24 delegates**: ₹1,500 per head
    - **25+ delegates**: ₹1,400 per head
  - Multiplies the tier price by the delegate count and adds dynamic accommodation charges.

### 3. Admin Dashboard Flow
Once authorized, the admin accesses three main views:
- **Dashboard View**: High-level statistical summaries (Total Individual Registers, Total Delegations, Total Contacts, Total Revenue generated) with visual status charts.
- **Registrations View**: Complete table displaying individual and delegation forms. Supports live search (filtering by name, institution, or ID) and includes a single-click "Export to Excel" tool mapping registers into structured tabs.
- **Messages View**: List of contact form messages sent by visitors, showing dates, emails, and feedback messages.

---

## 🗄️ Database Schema & Models

The PostgreSQL schema is structured around 5 central tables configured in `prisma/schema.prisma`:

### 1. `IndividualRegistration`
Records individuals participating in the event.
- `id` (String, Primary Key): Unique CUID.
- `registrationId` (String, Unique): Text identifier formatted as `REG-INDV-<timestamp>`.
- `fullName` (String): Normalized to Title Case.
- `email` (String): Normalized to lowercase.
- `phone` (String): Primary contact number.
- `institution` / `city` / `pincode` (String): Educational institution details.
- `committeePreference1`/`2`/`3` (String): Ranked choices of committees.
- `portfolioPreference1`/`2`/`3` (String): Selected country or character preferences.
- `accommodationRequired` (Boolean) & `accommodationScheme` (String).
- `transactionId` (String): Payment confirmation reference.
- `totalAmount` (Int): Paid fee.
- `status` (String, default: "pending"): Validated manually by the board.

### 2. `DelegationRegistration`
Records team registrations.
- `id` (String, Primary Key): Unique CUID.
- `registrationId` (String, Unique): Text identifier formatted as `REG-DELG-<timestamp>`.
- `institution` / `city` / `pincode` (String).
- `headDelegateName` / `headDelegateEmail` / `headDelegatePhone` (String).
- `numberOfDelegates` (String): Size of delegation.
- `accommodationRequired` (Boolean), `accommodationDelegates` (String), & `accommodationScheme` (String).
- `perHeadPrice` (Int): Calculated dynamic tier price.
- `totalAmount` (Int): Final delegation sum.
- `transactionId` (String): Invoice/payment transaction ID.
- `status` (String, default: "pending").

### 3. `ContactMessage`
- `id` (String, Primary Key): Unique CUID.
- `name` / `email` / `message` (String): Query info submitted by users.
- `createdAt` (DateTime): Auto-timestamp.

### 4. `Admin`
Stores authentication credentials for access.
- `id` (String, Primary Key): Unique CUID.
- `username` (String, Unique): Unique username login.
- `passwordHash` (String): Encrypted bcrypt string.
- `createdAt` (DateTime) & `lastLogin` (DateTime, Nullable).

### 5. `College`
Maintains an index of regional colleges for autocompleting user input.
- `id` (String, Primary Key): Unique CUID.
- `name` (String) & `city` (String): Form a unique compound index (`@@unique([name, city])`) to prevent duplicates.
- `pincode` (String, Nullable).
- `source` (String, default: "user"): Identifies whether the college was seeded or added by a user during registration.
- `isVerified` (Boolean, default: false).

---

## 🛠️ Environment Variables Configuration

To run this application locally or deploy it to production (Vercel), create a `.env` file in the root directory:

```env
# Database connection string (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/aimunsoc_db?schema=public"

# Secret key used for signing JWT session tokens (ensure this is strong)
JWT_SECRET="your-super-secret-random-key"

# Initial admin seeding credentials (only required during setup/seeding)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-admin-password"

# Public configuration variables (read by Vite)
VITE_CONFERENCE_DATE="2026-08-28"
VITE_PAYMENT_URL="https://www.acharyaerptech.in/ExternalPayment/179"
```

---

## 🚀 Running the Project Locally

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Database Sync & Seeding
Configure your `DATABASE_URL` in `.env` and initialize the database schemas:
```bash
# Push Prisma schema to the database
npm run db:push

# Generate Prisma client files
npm run db:generate

# Start Prisma Studio to view tables (Optional)
npm run db:studio
```

To seed the initial admin account, run the dev server and make a `POST` request to `http://localhost:5173/api/ad/seed` (or trigger it via code).

### 3. Run Development Server
```bash
npm run dev
```
The client will be running at `http://localhost:5173` and automatically proxies requests starting with `/api` to the serverless functions.
