const fs = require('fs');

function patchFile(filename) {
  let code = fs.readFileSync(filename, 'utf8');
  code = code.replace(
    /className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/g,
    "className=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300\"\n                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1e3a8a/ffffff?text=' + encodeURIComponent(course.title); }}"
  );
  code = code.replace(
    /className="w-full h-full object-cover"/g,
    "className=\"w-full h-full object-cover\"\n                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/1e3a8a/ffffff?text=' + encodeURIComponent(course.title); }}"
  );
  fs.writeFileSync(filename, code);
}

patchFile('src/components/CoursesView.tsx');
patchFile('src/components/HomeView.tsx');
patchFile('src/components/CourseModal.tsx');
