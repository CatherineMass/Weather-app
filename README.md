# Weather-app

Weather app using NodeJS, TypeScript, React and SMHI free API.

Installation:
1. Clone the code.
2. Open the folder in a code editor.
3. Run npm init in the terminal to install all the dependencies.
4. Create a .env file in both the frontend and the backend.
5. In backend/.env: add BACKEND_PORT="XXXX" _ replace XXXX with your backend port (3007 for example).
6. In backend/.env: add FRONTEND_PORT="3000" 
7. In frontend/.env: add REACT_APP_SERVER_URL="http://localhost:XXXX/api/v1" => replace XXXX with your backend port (3007 for example).
8. In the terminal:
      cd backend (to go into the backend folder)
      npm run dev (to start the backend server)
      cd ../frontend (to go into the frontend folder)
      npm start (to start the app in the browser)
