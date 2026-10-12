const fs = require('fs');
let code = fs.readFileSync('src/components/CustomerChat.tsx', 'utf8');

const updatedTrigger = `                  {/* Embedded Handoff Trigger */}
                  {msg.is_handoff_offer && activeConversation?.status !== 'needs_admin' && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-xs"
                      >
                        <span>📤 {currentLanguage === 'so' ? 'Soo Dir Caddeynta Payment-ka' : 'Upload Payment Proof'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRequestHandoff}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                      >
                        <span>📞 {currentLanguage === 'so' ? 'La Xiriir Maamulka' : 'Talk to Admin'}</span>
                      </button>
                    </div>
                  )}
`;

code = code.replace(
  /\{\/\* Embedded Handoff Trigger \*\/\}(.|\n)*?\n\s+\)\}/,
  updatedTrigger
);

fs.writeFileSync('src/components/CustomerChat.tsx', code);
