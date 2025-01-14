# TimeTrack
TimeTrack is a platform designed to improve productivity by providing a simple and
intuitive method for students to track tasks. With busy schedules, many students struggle with
managing their daily and weekly tasks, which leads to stress and forgotten tasks. TimeTrack
offers tools like tracking assignments that correlate to different classes on a calendar-style UI.
This aims to help students organize their tasks and monitor their progress effectively.

---
## Features
- Personalized Calendar: Set and view tasks, classes, and events in a weekly calendar format. Tasks/Classes can be easily rearranged, deleted, or updated.
- Course Management: Add courses for the current semester, and the time each course occurs in the day.
- Tasks Management: Users have the option to easily create, delete and rearrange tasks as needed.
- Time Blocks: Allocate blocks of time to focus on specific tasks.

## Architecture
![Architecture](https://github.com/CS222-UIUC/main-project-timetrack/blob/main/frontend/public/diagram.png?raw=true)

TimeTrack is built using a modular and scalable architecture that ensures smooth integration of components.

**Frontend**
- Role: Provides a user-friendly interface for task and event management.
- Technology: React.js, styled with CSS and integrated with the FullCalendar component.
- Testing: Unit tests using Jest and React Testing Library.

**Backend**
- Role: Manages user data, processes requests, and serves data to the frontend.
- Technology: Node.js with Express.js.
- Testing: Backend operations are tested with Mocha and Chai.

**Database**
- Role: Stores user information, such as courses, tasks, and events.
- Technology: MongoDB (NoSQL).
- Testing: Database queries are tested using Mongoose.

**API Integration**
- FullCalendar: Synchronizes calendar events across the frontend and backend.

## Installation

Follow these steps to set up and run TimeTrack:
1. Clone the Repository:
    ```
    git clone https://github.com/CS222-UIUC/main-project-timetrack.git
    cd main-project-timetrack
    ```

2. Install Dependencies:

    For the frontend:
    ```
    cd frontend
    npm install
    ```
    For the backend:
    ```
    cd backend
    npm install
    ```

4. Set Up Environment Variables:

    Create a .env file in the backend directory.
    Add the following variables:
    ```
    MONGO_URI= mongodb://localhost:27017/timetrack
    ```
    For production, replace it with:
    ```
    MONGO_URI= mongodb+srv://frome4:Diamantito2@cluster0.xatug.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0
    ```

6. Start the Application:

    Run the backend:
    ```
    cd backend
    node main.js
    ```
    Run the frontend:
    ```
    cd frontend
    npm start
    ```

7. Access the Application:

   Open your browser and navigate to ```http://localhost:3000```.

## Potential Updates
- Mobile support
- Improved security
- UI upgrades
