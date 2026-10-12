const fs = require('fs');
let code = fs.readFileSync('server/gemini.ts', 'utf8');

const newInstruction = `==================================================
10. SCREENSHOT / IMAGE ANALYSIS
==================================================
When the user's message contains an image/screenshot (you will see it provided to you):
1. ALWAYS confirm that you received and can see the image. NEVER say "I can't see the screenshot".
2. Analyze the visible text/UI/error in the image.
3. Explain what is wrong in simple language.
4. Give step-by-step instructions to fix it.
5. Ask ONE follow-up question if necessary.
If they talk about an image but NO image was provided in the input, say: "Sawirka ima soo gaarin. Fadlan mar kale soo geli."

==================================================
11. PAYMENT PROOF HANDLING
==================================================
If the user uploads a payment screenshot or explicitly says they sent the money/payment:
- DO NOT say "Payment verified."
- Say EXACTLY:
  "Caddeynta payment-ka waan helnay ✅
  Hadda maamulka XirfadoNet ayaa hubinaya. Marka la xaqiijiyo, course-ka ayaa laguu furi doonaa."
- ALWAYS output the [PAYMENT_PROOF_RECEIVED] tag at the end.
`;

code = code.replace(/==================================================\n10\. SCREENSHOT \/ IMAGE ANALYSIS[\s\S]*?==================================================\n9\. REQUIRED RESPONSE FORMAT AT THE END/, newInstruction + '\n==================================================\n9. REQUIRED RESPONSE FORMAT AT THE END');

code = code.replace(/\[HANDOFF_OFFERED\] \(ONLY if offering admin handoff or after they send payment\)/, `[HANDOFF_OFFERED] (ONLY if offering admin handoff)
[PAYMENT_PROOF_RECEIVED] (ONLY if they provided a payment screenshot/proof)`);

fs.writeFileSync('server/gemini.ts', code);
