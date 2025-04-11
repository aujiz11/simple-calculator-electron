# Simple Calculator with Electron

A beautiful, minimalist calculator desktop application built with Electron and JavaScript.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculations
- Custom transparent UI with minimal design
- Custom window controls (macOS-inspired)
- Keyboard support for quick calculations

## Disclaimer

This project was created for educational purposes only:

1. **Learning Project**: This calculator was developed as a learning exercise to understand Electron and desktop application development with web technologies.

2. **Non-Commercial Use**: This project is intended for educational and personal use only, not for commercial distribution or use.

3. **Potential Issues**: As a learning project, there may be bugs or limitations in the functionality. Feel free to contribute improvements!

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- npm (comes with Node.js)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/aujiz11/simple-calculator-electron.git
   cd simple-calculator-electron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Building for Production

Build for your current platform:
```bash
npm run build
```

## Yech Stack

- [Electron](https://www.electronjs.org/) - Cross-platform desktop app framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- HTML/CSS - For UI structure and styling
- JavaScript - For application logic

## Project Structure

```
simple-calculator-electron/
├── src/
│   ├── main.js            # Main process (Electron app entry point)
│   ├── preload.js         # Preload script
│   ├── renderer/
│   │   ├── index.html     # Main UI structure
│   │   ├── styles.css     # UI styling
│   │   └── renderer.js    # Calculator logic
├── assets/
│   └── calculator-icon.png # App icon
├── electron-builder.json # Build configuration
├── package.json          # Project config and dependencies
└── README.md             # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Author: [aujiz11](https://github.com/aujiz11)  
Email: letuank2018@gmail.com

---

*This project was created for educational purposes to learn Electron and desktop application development.*
