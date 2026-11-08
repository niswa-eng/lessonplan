import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import geminiHandler from './api/gemini.ts';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Unified Gemini API endpoint (matches Vercel serverless function /api/gemini)
app.all('/api/gemini', async (req, res) => {
  return geminiHandler(req as any, res as any);
});

// Backward-compatible endpoints
app.post('/api/generate-lesson-plan', async (req, res) => {
  req.body = { ...req.body, action: 'generate-lesson-plan' };
  return geminiHandler(req as any, res as any);
});

app.post('/api/regenerate-section', async (req, res) => {
  req.body = { ...req.body, action: 'regenerate-section' };
  return geminiHandler(req as any, res as any);
});

// Vite dev middleware or static serving
async function setupServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Cambridge Lesson Plan Server running on port ${PORT}`);
  });
}

setupServer();
