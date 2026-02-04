# Echo

**Feedback as a Service.**
Collect, manage, and analyze user feedback effortlessly with a powerful dashboard and an embeddable widget.

<img width="1407" height="804" alt="image" src="https://github.com/user-attachments/assets/939f39ad-5db3-48f5-be60-af9c6e402005" />


## 🚀 Features

- **Embeddable Widget**: reliable, lightweight script to collect feedback from any website.
- **Admin Dashboard**: Centralized hub to view, filter, and manage feedback.
- **Sentiment Analysis**: AI-powered analysis to categorize feedback as Positive, Neutral, or Negative.
- **Project Management**: Create multiple projects and generate unique keys for each.
- **Authentication**: Secure login and signup powered by Better Auth.
- **Dark Mode**: Sleek, modern user interface.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Auth**: [Better Auth](https://github.com/better-auth/better-auth)
- **Styling**: Tailwind CSS & Shadcn UI
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- pnpm (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/echo.git
   cd echo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/echo"
   BETTER_AUTH_SECRET="your-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Migration**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔌 Usage

### Embedding the Widget
Add this script to your website's `<head>` or `<body>`:

```html
<script src="https://echo.yourdomain.com/embed/YOUR_PROJECT_KEY"></script>
```

Replace `YOUR_PROJECT_KEY` with the key found in your project settings.

## 📄 API Documentation
See [docs/api.md](docs/api.md) for detailed API specifications.
See [docs/architecture.md](docs/architecture.md) for system architecture.

## 📜 License
This project is licensed under the MIT License.
