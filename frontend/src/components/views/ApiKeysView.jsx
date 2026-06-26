import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Terminal, Code2 } from 'lucide-react';
import { useToast } from '../ui/Toast';

export default function ApiKeysView({ user }) {
  const [showKey, setShowKey] = useState(false);
  const { addToast } = useToast();

  const apiKey = user?.apiKey || 'API key not available';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    addToast(`${type} copied to clipboard!`, 'success');
  };

  const curlExample = `curl -X POST http://localhost:5000/api/upload \\
  -H "x-api-key: ${apiKey}" \\
  -F "file=@/path/to/your/image.png"`;

  const fetchExample = `const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  headers: {
    'x-api-key': '${apiKey}'
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Developer API Keys</h2>
        <p className="text-muted-foreground mt-1">Manage your API credentials for server-to-server integration.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Your Secret API Key</h3>
            <p className="text-sm text-muted-foreground">Use this key to authenticate requests from your backend.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <div className="relative flex-grow font-mono">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              readOnly
              className="w-full bg-secondary border border-border rounded-lg pl-4 pr-12 py-3 text-sm text-foreground focus:outline-none"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              title={showKey ? "Hide API Key" : "Show API Key"}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button
            onClick={() => copyToClipboard(apiKey, 'API Key')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-4 py-3 flex items-center gap-2 transition-colors flex-shrink-0"
          >
            <Copy className="h-4 w-4" />
            Copy Key
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive flex items-start gap-3">
          <span className="text-lg leading-none">⚠️</span>
          <p>
            <strong>Keep this key secret!</strong> Do not expose it in client-side code (like React, Vue, or vanilla JS sent to the browser). Only use it for backend or server-to-server communications.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="border-b border-border p-4 bg-secondary/50 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm text-foreground">cURL Example</h3>
            <button 
              onClick={() => copyToClipboard(curlExample, 'cURL snippet')}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Copy className="h-3 w-3" /> Copy
            </button>
          </div>
          <div className="p-4 bg-[#0d1117] flex-grow overflow-x-auto">
            <pre className="text-sm font-mono text-[#c9d1d9] leading-relaxed">
              <code>{curlExample}</code>
            </pre>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="border-b border-border p-4 bg-secondary/50 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm text-foreground">JavaScript (Fetch) Example</h3>
            <button 
              onClick={() => copyToClipboard(fetchExample, 'JavaScript snippet')}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Copy className="h-3 w-3" /> Copy
            </button>
          </div>
          <div className="p-4 bg-[#0d1117] flex-grow overflow-x-auto">
            <pre className="text-sm font-mono text-[#c9d1d9] leading-relaxed">
              <code>{fetchExample}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
