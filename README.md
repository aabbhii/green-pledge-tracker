# Green Pledge Tracker

A web application for tracking environmental pledges and making a positive impact on the environment.

## Project Overview

The Green Pledge Tracker is a platform where users can:
- Create and join environmental pledges
- Track their progress and impact
- Connect with like-minded individuals
- Share their environmental achievements
- Monitor their carbon footprint reduction

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd pledge-bloom-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```
MONGODB_URI=mongodb://localhost:27017/GreenPledgeTracker
PORT=5000
JWT_SECRET=your-secret-key
```

4. Start the development server
```bash
# Start the frontend
npm run dev

# Start the backend
npm run server
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## Features

- User Authentication
- Pledge Creation and Management
- Activity Tracking
- Community Engagement
- Impact Visualization
- Carbon Footprint Calculator

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
