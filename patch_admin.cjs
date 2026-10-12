const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

code = code.replace(
  `const [convFilter, setConvFilter] = useState<'all' | 'needs_admin' | 'resolved'>('all');`,
  `const [convFilter, setConvFilter] = useState<'all' | 'needs_admin' | 'payment_proof_received' | 'resolved'>('all');`
);

code = code.replace(
  `if (convFilter === 'needs_admin') return c.status === 'needs_admin';`,
  `if (convFilter === 'needs_admin') return c.status === 'needs_admin';
    if (convFilter === 'payment_proof_received') return c.status === 'payment_proof_received';`
);

code = code.replace(
  `<button
                    type="button"
                    onClick={() => setConvFilter('needs_admin')}
                    className={\`py-1 rounded text-center cursor-pointer \${
                      convFilter === 'needs_admin'`,
  `<button
                    type="button"
                    onClick={() => setConvFilter('payment_proof_received')}
                    className={\`py-1 rounded text-center text-xs cursor-pointer \${
                      convFilter === 'payment_proof_received'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }\`}
                  >
                    Payments
                  </button>
                  <button
                    type="button"
                    onClick={() => setConvFilter('needs_admin')}
                    className={\`py-1 rounded text-center text-xs cursor-pointer \${
                      convFilter === 'needs_admin'`
);

code = code.replace(
  `{conv.status === 'needs_admin' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            Needs Admin
                          </span>`,
  `{conv.status === 'payment_proof_received' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            Payment Proof
                          </span>
                        ) : conv.status === 'needs_admin' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            Needs Admin
                          </span>`
);

code = code.replace(
  `onClick={() => handleUpdateConvStatus('resolved')}`,
  `onClick={() => handleUpdateConvStatus('payment_verified')}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5 inline mr-1" /> Approve Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateConvStatus('resolved')}`
);

fs.writeFileSync('src/components/AdminDashboard.tsx', code);
