---

## 🚀 Make Your Data Work in Production with Vercel Serverless Functions

### 📁 Folder Structure

Create the following structure

```
/api/jobs
  ├── index.js     → handles /api/jobs
  └── [id].js      → handles /api/jobs/{id}
```

---

### ⚙️ Update `vite.config.js`

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

🧹 Remove any proxy configuration — it’s not needed anymore.

---

### 📦 `/api/jobs/index.js`

```js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default async function handler(req, res) { 
  const method = req.method; 

  let body = {}; 
  if (method === 'POST') { 
    try {
      const chunks = []; 
      for await (const chunk of req) chunks.push(chunk); 
      body = JSON.parse(Buffer.concat(chunks).toString()); 
    } catch(err) { 
      return res.status(400).json({ message: 'Invalid JSON body' }); 
    } 
  } 

  if (method === 'GET') { 
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
    return res.status(200).json(data.jobs); 
  } 

  if (method === 'POST') { 
    const newJob = body; 
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 

    newJob.id = Date.now(); 
    data.jobs.push(newJob); 

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
    return res.status(201).json(newJob); 
  } 

  res.setHeader('Allow', ['GET', 'POST']); 
  res.status(405).end(`Method ${method} not allowed`);
}
```

---

### 📦 `/api/jobs/[id].js`

```js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default async function handler(req, res) { 
  const { id } = req.query; 
  const method = req.method; 

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
  const jobs = data.jobs || []; 

  let body = {}; 
  if (method === 'PUT') { 
    try { 
      const chunks = []; 
      for await (const chunk of req) chunks.push(chunk); 
      body = JSON.parse(Buffer.concat(chunks).toString()); 
    } catch(err) { 
      return res.status(400).json({ message: 'Invalid JSON body' }); 
    } 
  } 

  const jobIndex = jobs.findIndex((job) => job.id == id); 

  if (method === 'GET') { 
    const job = jobs.find((job) => job.id == id); 
    if (!job) return res.status(404).json({ message: 'Job not found' }); 
    return res.status(200).json(job); 
  } 

  if (method === 'PUT') { 
    if (jobIndex === -1) return res.status(404).json({ message: 'Job not found' }); 
    jobs[jobIndex] = { ...jobs[jobIndex], ...body }; 
    fs.writeFileSync(filePath, JSON.stringify({ jobs }, null, 2)); 
    return res.status(200).json(jobs[jobIndex]); 
  } 

  if (method === 'DELETE') { 
    if (jobIndex === -1) return res.status(404).json({ message: 'Job not found' }); 
    const deleted = jobs.splice(jobIndex, 1); 
    fs.writeFileSync(filePath, JSON.stringify({ jobs }, null, 2));
    return res.status(200).json(deleted[0]);
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} not allowed`);
}
```

---

### ☁️ Deployment

To make this work

1. Deploy your project on **Vercel** (not Netlify).
2. Vercel automatically treats everything in the `/api` folder as **Serverless Functions**.
3. Each file inside `/api` becomes an accessible endpoint

   * `/api/jobs`
   * `/api/jobs/{id}`

📚 Documentation: [https://vercel.com/docs/functions](https://vercel.com/docs/functions)

---

### ⭐ Support the Project

If this helped you, drop a ⭐ on
👉 [https://github.com/boboPrem1/vue-job-listing](https://github.com/boboPrem1/vue-job-listing)

---
