const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const paymentHandlers = `
  const handleApprovePayment = async (convId: string) => {
    try {
      const res = await fetch(\`/api/conversations/\${convId}/messages\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'Lacagtaada maamulka ayaa xaqiijiyay ✅ Course-kaaga hadda waa laguu furay.',
          sender: 'admin',
          language: 'so'
        })
      });
      if (res.ok) {
        await fetch(\`/api/conversations/\${convId}/status\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'payment_verified' })
        });
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to approve payment:', err);
    }
  };

  const handleRejectPayment = async (convId: string) => {
    try {
      const res = await fetch(\`/api/conversations/\${convId}/messages\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'Caddeynta payment-ka lama xaqiijin karin. Fadlan hubi in aad soo dirtay sawir sax ah ama la xiriir maamulka wixii faahfaahin ah.',
          sender: 'admin',
          language: 'so'
        })
      });
      if (res.ok) {
        await fetch(\`/api/conversations/\${convId}/status\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'open' })
        });
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to reject payment:', err);
    }
  };
`;

code = code.replace(
  `  // Mark conversation resolved`,
  paymentHandlers + `\n  // Mark conversation resolved`
);

const actionButtons = `
                    <div className="flex gap-2">
                      {(selectedConversation.status === 'payment_proof_received' || selectedConversation.status === 'needs_admin') && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprovePayment(selectedConversation.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          >
                            Approve Payment & Grant
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectPayment(selectedConversation.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                          >
                            Reject Payment
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleResolveConversation(selectedConversation.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </div>
`;

code = code.replace(
  `<button
                      type="button"
                      onClick={() => handleResolveConversation(selectedConversation.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                    >
                      Mark Resolved
                    </button>`,
  actionButtons
);

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
