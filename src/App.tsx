import React, { useEffect, useState } from 'react';
import { ConfigDisplay } from './components/ConfigDisplay';
import { loadConfig, AppConfig } from './config';
import { Rocket, Code, Database, Shield } from 'lucide-react';

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeConfig = async () => {
      try {
        const loadedConfig = await loadConfig();
        setConfig(loadedConfig);
      } catch (error) {
        console.error('Failed to initialize config:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Failed to load application configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Rocket className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">{config.appName}</h1>
          </div>
          <p className="text-xl text-gray-600">
            Production-ready React SPA with Docker runtime configuration
          </p>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              config.environment === 'production' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {config.environment}
            </span>
          </div>
        </div>

        {/* Configuration Display */}
        <ConfigDisplay config={config} />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Code className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Runtime Configuration</h3>
            <p className="text-gray-600 text-sm">
              Environment variables injected at container startup using envsubst templating
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Database className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Docker Ready</h3>
            <p className="text-gray-600 text-sm">
              Multi-stage Docker build with nginx serving optimized for production deployment
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Production Features</h3>
            <p className="text-gray-600 text-sm">
              Security headers, gzip compression, client-side routing, and health checks
            </p>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🔗 API Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">API Endpoint</label>
              <p className="text-gray-900 break-all font-mono text-sm bg-gray-50 p-2 rounded">
                {config.apiUrl}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Version</label>
              <p className="text-gray-900">{config.version}</p>
            </div>
          </div>
        </div>

        {/* Feature Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Feature Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(config.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="capitalize font-medium">{feature.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm text-gray-500">{enabled ? 'Enabled' : 'Disabled'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Docker Commands</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Build the image:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                docker build -t react-runtime-config-app .
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Run with custom environment:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                docker run -p 8080:80 \<br />
                &nbsp;&nbsp;-e API_URL="https://api.example.com" \<br />
                &nbsp;&nbsp;-e APP_NAME="My Production App" \<br />
                &nbsp;&nbsp;-e NODE_ENV="production" \<br />
                &nbsp;&nbsp;react-runtime-config-app
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Verify configuration:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                curl http://localhost:8080/assets/runtime-config.json
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with React + TypeScript + Vite + Docker + nginx</p>
          <p className="text-sm mt-1">Build Time: {config.buildTime}</p>
        </div>
      </div>
    </div>
  );
}

export default App;