const fs = require('fs');
let code = fs.readFileSync('server/gemini.ts', 'utf8');

code = code.replace(
  `let isHandoffOffer = wantsAdmin || rawText.includes('[HANDOFF_OFFERED]');`,
  `let isHandoffOffer = wantsAdmin || rawText.includes('[HANDOFF_OFFERED]');
          let isPaymentProof = rawText.includes('[PAYMENT_PROOF_RECEIVED]');`
);

code = code.replace(
  `return {
            reply: cleanReply,
            isHandoffOffer,
            problemCategory: category,
            aiSummary: summary,
            suggestedCourseId,
            suggestedCourse,
          };`,
  `return {
            reply: cleanReply,
            isHandoffOffer,
            isPaymentProof,
            problemCategory: category,
            aiSummary: summary,
            suggestedCourseId,
            suggestedCourse,
          };`
);

fs.writeFileSync('server/gemini.ts', code);
