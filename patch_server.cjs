const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  `status: aiResult.isHandoffOffer ? 'needs_admin' : 'open',`,
  `status: aiResult.isPaymentProof ? 'payment_proof_received' : (aiResult.isHandoffOffer ? 'needs_admin' : 'open'),`
);

code = code.replace(
  `status: aiResult.isHandoffOffer ? 'needs_admin' : 'in_progress',`,
  `status: aiResult.isPaymentProof ? 'payment_proof_received' : (aiResult.isHandoffOffer ? 'needs_admin' : 'in_progress'),`
);

fs.writeFileSync('server.ts', code);
