const fs = require('fs');
let code = fs.readFileSync('src/components/CoursesView.tsx', 'utf8');

code = code.replace(
  `<span className="text-xl font-extrabold text-blue-700">
                          \${course.price}
                        </span>`,
  `{course.price > 0 ? (
                          <span className="text-xl font-extrabold text-blue-700">
                            \${course.price}
                          </span>
                        ) : (
                          <span className="text-base font-extrabold text-emerald-600">
                            {currentLanguage === 'so' ? 'Hadda diyaar ah' : 'Available'}
                          </span>
                        )}`
);

fs.writeFileSync('src/components/CoursesView.tsx', code);

let homeCode = fs.readFileSync('src/components/HomeView.tsx', 'utf8');
homeCode = homeCode.replace(
  `<span className="text-xl font-black text-blue-700">
                        \${course.price}
                      </span>`,
  `{course.price > 0 ? (
                        <span className="text-xl font-black text-blue-700">
                          \${course.price}
                        </span>
                      ) : (
                        <span className="text-sm font-extrabold text-emerald-600 mt-1">
                          {currentLanguage === 'so' ? 'Hadda diyaar ah' : 'Available'}
                        </span>
                      )}`
);
fs.writeFileSync('src/components/HomeView.tsx', homeCode);

let modalCode = fs.readFileSync('src/components/CourseModal.tsx', 'utf8');
modalCode = modalCode.replace(
  `<span className="text-3xl font-black text-blue-700">
                    \${course.price}
                  </span>`,
  `{course.price > 0 ? (
                    <span className="text-3xl font-black text-blue-700">
                      \${course.price}
                    </span>
                  ) : (
                    <span className="text-xl font-extrabold text-emerald-600 mt-2">
                      {currentLanguage === 'so' ? 'Hadda diyaar ah' : 'Available Now'}
                    </span>
                  )}`
);
fs.writeFileSync('src/components/CourseModal.tsx', modalCode);

