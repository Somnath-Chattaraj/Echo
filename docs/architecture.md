# Echo Architecture

## 1. Authentication Flow
Echo uses **Better Auth** for handling authentication, integrated with **Prisma** and **PostgreSQL**.

### Components
- **Library**: `better-auth`
- **Adapter**: Prisma Adapter
- **Providers**:
  - **Email/Password**: Standard email login.
  - **Google OAuth**: Social login via Google.

### Flow
1. **Sign Up/In**: Users authenticate via the Next.js app (`/sign-in`, `/sign-up` routes implied).
2. **Session**: Sessions are stored in the database (`Session` model) and managed via secure cookies.
3. **Protection**: API routes use `auth.api.getSession` to verify user identity before serving sensitive data (e.g., fetching project feedback).

---

## 2. Database Schema
The database works on a relational model using PostgreSQL, managed by Prisma.

### Core Models
- **User**: The central entity. Represents a registered customer.
- **Project**: Owned by a User. Represents a website/app where feedback is collected.
  - `projectKey`: A unique UUID used publicly by the widget to identify the project.
- **Feedback**: usage-data collected from Projects.
  - Fields: `content`, `type` (BUG/FEATURE/OTHER), `sentiment`, `pageUrl`.
  - Relations: Belongs to `Project`.
- **Label**: Tags attached to Feedback for organization (e.g., "Critical", "UI").

### Diagram Logic
`User (1) -> (n) Project (1) -> (n) Feedback (1) -> (n) Label`

---

## 3. Widget Design
The feedback widget is a lightweight script designed to be embedded in client applications.

### Embedding
External sites include a script tag pointing to:
`https://<echo-domain>/embed/[projectKey]`

### Internals
- **Script Generation**: The `/embed/[projectKey]` route generates a custom JavaScript file on the fly.
- **Isolation**: It checks for `document.readyState` to ensure safe DOM manipulation.
- **UI Encapuslation**:
  - Uses specific IDs (`fp-widget-container`) and dynamically injected `<style>` tags to minimize CSS bleeding.
  - **Components**:
    - **Trigger Button**: Fixed floating button (bottom-right).
    - **Modal**: Popup form with Category select and Textarea.
- **Data Flow**:
  - User submits form -> `POST /api/feedback`
  - Payload: `{ projectKey, content, type, pageUrl }`

---

## 4. Future Improvements
- **Security**: Implement rate limiting on the public `POST /api/feedback` endpoint to prevent spam.
- **Widget Customization**: Allow users to configure widget color, position, and text from the dashboard, reflected in the generated script.
- **Screenshot Capability**: Add ability for the widget to capture the current screen state (using `html2canvas` or similar).
- **Websockets**: Use real-time events to notify the dashboard when new feedback arrives without refreshing.
- **Analytics**: Aggregate metrics on feedback sentiment and volume over time.
