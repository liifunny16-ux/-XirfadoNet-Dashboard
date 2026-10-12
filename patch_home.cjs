const fs = require('fs');
let code = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

code = code.replace(
  `const featuredCourses = courses.slice(0, 6);`,
  `const featuredCourses = courses; // Show all to satisfy user request`
);

fs.writeFileSync('src/components/HomeView.tsx', code);
