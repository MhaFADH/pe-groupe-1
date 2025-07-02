# Client App Structure

This document explains the structure and key concepts of the `client/app` directory.

## Directory Structure

- **`(mobile)/`**: This folder contains the root for mobile-specific routes and components.
- **`(web)/`**: This folder contains the root for web-specific routes and components.
- **`_layout.tsx`**: This file serves as the shared root layout for both mobile and web. It provides a common structure and logic for the app.

## Environment Variables

Environment variables are managed using the `.env` file. These variables are loaded in `app.config.ts` firstly and then in `utils/env.ts` that returns a getConfig function.

### Adding Environment Variables

- To make an environment variable accessible in the app, prefix it with `EXPO_PUBLIC_`.
- Example:

  ```env
  EXPO_PUBLIC_API_URL=https://api.example.com
  ```

## Managing the `.env` File with `dotenv-vault`

It is recommanded to install it on your computer, either globally or with `brew install dotenv-org/brew/dotenv-vault`

The `.env` file is managed using `dotenv-vault`. To pull or push the `.env` file, follow these steps:

1. Navigate to the root of the monorepo:

   ```bash
   cd pe-groupe-1/
   ```

2. Run the following commands:
   - **Pull the `.env` file**:

     ```bash
     npx dotenv-vault pull
     ```

   - **Push the `.env` file !!! the .env must be pushed only after pr approval in order to not confuse other developers**:

     ```bash
     npx dotenv-vault push
     ```

3. After pulling or pushing the `.env` file, navigate back to the `client` app directory to continue development.

## Development Notes

We are using the Expo Dev Client for this project. This means you **cannot use the Expo Go app** on your phone to run the app. Instead, you will need to use a simulator (iOS or Android) or a physical device with the Expo Dev Client installed.

This decision was made due to the inclusion of some native packages that are not supported by the classic Expo Go app.

---

This structure ensures a clean separation of concerns and simplifies the management of environment variables across the project.
