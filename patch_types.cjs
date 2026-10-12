const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  `  | 'admin_active';`,
  `  | 'admin_active'
  | 'payment_proof_received'
  | 'payment_verified';`
);

fs.writeFileSync('src/types.ts', code);
let serverCode = fs.readFileSync('server/server.ts', 'utf8'); // Wait, it's server.ts
