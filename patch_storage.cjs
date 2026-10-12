const fs = require('fs');
let code = fs.readFileSync('server/storage.ts', 'utf8');

code = code.replace(
  `needs_admin_conversations: this.conversations.filter((c) => c.status === 'needs_admin').length,`,
  `needs_admin_conversations: this.conversations.filter((c) => c.status === 'needs_admin' || c.status === 'payment_proof_received').length,`
);

fs.writeFileSync('server/storage.ts', code);
