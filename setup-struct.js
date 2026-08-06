const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/Navbar',
  'frontend/Hero',
  'frontend/Vehicles',
  'frontend/Features',
  'frontend/TestRide',
  'frontend/About',
  'frontend/Footer'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Create placeholder files
const files = [
  ['frontend/Navbar/Navbar.tsx', 'export default function Navbar() { return <nav>Navbar</nav>; }'],
  ['frontend/Hero/Hero.tsx', 'export default function Hero() { return <section>Hero</section>; }'],
  ['frontend/Vehicles/Vehicles.tsx', 'export default function Vehicles() { return <section>Vehicles</section>; }'],
  ['frontend/Features/Features.tsx', 'export default function Features() { return <section>Features</section>; }'],
  ['frontend/TestRide/TestRide.tsx', 'export default function TestRide() { return <section>TestRide</section>; }'],
  ['frontend/About/About.tsx', 'export default function About() { return <section>About</section>; }'],
  ['frontend/Footer/Footer.tsx', 'export default function Footer() { return <footer>Footer</footer>; }']
];

files.forEach(([file, content]) => {
  fs.writeFileSync(path.join(__dirname, file), content);
});

console.log('Structure created successfully.');
