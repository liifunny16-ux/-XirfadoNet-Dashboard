const fs = require('fs');
let code = fs.readFileSync('server/gemini.ts', 'utf8');

code = code.replace(
  `replace(/\\[HANDOFF_OFFERED\\]/g, '')`,
  `replace(/\\[HANDOFF_OFFERED\\]/g, '').replace(/\\[PAYMENT_PROOF_RECEIVED\\]/g, '')`
);

fs.writeFileSync('server/gemini.ts', code);
