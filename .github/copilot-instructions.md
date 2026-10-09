# Project Notes

- This repository is an npm-workspaces monorepo with `apps/api`, `apps/wedding-invitation`, and `apps/admin`.
- The API uses Node.js, Express, Mongoose, and MongoDB. Read local configuration from the root `.env` file.
- Both frontend applications use React and Vite. Keep their UI responsive and in Vietnamese.
- In each frontend, keep HTTP calls in `src/api`, data normalization in `src/models`, data access in `src/repositories`, app state/business logic in `src/app`, and presentational components in `src/ui`. UI components receive data and callbacks through props and do not call APIs or own business logic.
- Run all local services with `npm run dev`; read setup and environment instructions in `README.md`.
- Do not commit secrets, `.env` files, or generated `node_modules` and `dist` folders.
- The wedding names, date, and venue are sample content and should be replaced for a real invitation.
