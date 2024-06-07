# The Liaison

**The Liaison** is a community-powered platform where you can find opinions about anything. This project is built using the latest features of React, Next.js, OpenAI, Supabase, Upstash, and other cutting-edge technologies. The platform comprises three main modules:

1. **Social Polling**: Currently in development and close to completion.
2. **Gifting Concierge**: In the planning phase.
3. **Store**: A marketplace module.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Bun](https://bun.sh/) (Ensure you have the version specified in `package.json`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/soyricardodev/theliaison.git
   cd theliaison
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Run the development server:**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

- `src/`: Contains the source code for the project.
- `public/`: Contains public assets like images and icons.
- `app/`: Next.js pages.
- `components/`: Reusable React components.
- `components/ui/`: Shadcn components.
- `components/magicui/`: Magic UI components.
- `lib/`: Utility functions.
- `styles/`: Global and component-specific styles.
- `types/`: TypeScript types.
- `supabase/`: Supabase configurations and scripts.

## Scripts

- `bun run build`: Builds the project for production.
- `bun run dev`: Runs the project in development mode.
- `bun run lint`: Lints the codebase.
- `bun run lint:fix`: Lints and formats the codebase.
- `bun run cz`: Commit using commitizen for consistent commit messages.
- `bun run supabase:start`: Starts Supabase local development environment.
- (Other scripts as defined in `package.json`)

## Contributing

To contribute, please follow these steps:

1. **Fork the repository.**

2. **Clone your fork and create a new branch:**

   ```bash
   git clone https://github.com/your-username/theliaison.git
   cd theliaison
   git checkout -b feature/YourFeature
   ```

3. **Install dependencies using Bun:**

   ```bash
   bun install
   ```

4. **Make your changes.**

5. **Commit your changes following the commit message conventions:**

   - You can use `cz` command to make standardized commit messages:

     ```bash
     bun run cz
     ```

6. **Push to your fork and submit a pull request.**

   ```bash
   git push origin feature/YourFeature
   ```

### Coding Conventions

- The project uses [Biome](https://biomejs.dev/) for linting and formatting.
- To lint the codebase, run:

  ```bash
  bun run lint
  ```

- To lint and fix formatting issues, run:

  ```bash
  bun run lint:fix
  ```

## License

Distributed under the MIT License. See `LICENSE` for more information.
