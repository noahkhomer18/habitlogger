# Habit Logger

The Habit Logger is a simple yet powerful tool designed to help users build consistency and reach their goals through daily repetition. It allows users to add custom habits, track progress with daily check-ins, and visualize streaks on a 21-day cycle to reinforce discipline. Each habit is color-coded with green for completion and red for missed days, making progress easy to monitor at a glance. Data is stored in the browser's local storage so habits persist across sessions, while features like editing or resetting habits give flexibility as goals evolve. Optional extras such as motivational quotes, streak celebration animations, and a clean dark mode theme make the experience more engaging and rewarding.

## Features

- 📝 Add and track custom daily habits
- ✅ Daily check-ins with visual completion indicators
- 🔥 Streak tracking to build consistency
- 📊 Real-time statistics and progress visualization
- 💾 Local storage persistence across sessions
- ✏️ Edit and delete habits as goals evolve
- 🔄 Reset day functionality for fresh starts
- 📱 Responsive design for all devices
- 🎨 Modern, clean interface with gradient backgrounds
- 📈 Progress bars and completion rate tracking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd habit-logger
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Add Habits**: Click the "Add Habit" button to create a new habit to track
2. **Log Progress**: Mark habits as completed each day
3. **View Statistics**: Check your progress and streaks in the dashboard
4. **Set Goals**: Define weekly or monthly targets for your habits

## Project Structure

```
habit-logger/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── data/          # Data management
├── public/            # Static assets
└── README.md
```

## Technologies Used

- React
- JavaScript/TypeScript
- CSS/SCSS
- Local Storage (for data persistence)
- Chart.js (for progress visualization)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for simple, effective habit tracking
- Built with modern web technologies for optimal user experience
