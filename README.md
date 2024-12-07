# TrackR

TrackR is a task management application built with React, TypeScript, and Zustand. It allows users to manage their tasks using a Pomodoro timer, categorize tasks, and switch between light and dark themes.

## Features

- Add, update, and delete tasks
- Categorize tasks as "To Do", "In Progress", or "Completed"
- Pomodoro timer for tasks
- Light and dark mode toggle
- Drag and drop tasks between categories
- User authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/TrackR.git
   cd TrackR
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for linting errors
- `npm run preview`: Preview the production build

## Project Structure

```
TrackR/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── AddTaskForm.tsx
│   │   ├── Login.tsx
│   │   ├── PomodoroTimer.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── ThemeToggle.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── store/
│   │   ├── taskStore.ts
│   │   ├── themeStore.ts
│   ├── types/
│   │   ├── task.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── storage.ts
│   ├── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.