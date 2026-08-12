# Raynexis Solutions

Static marketing site and content-manager prototype for Raynexis Solutions.

## Run locally

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`.

## Deploy to Netlify

1. Push this folder to GitHub.
2. In Netlify, choose **Add new project** > **Import an existing project** > GitHub.
3. Select the repository. Netlify reads `netlify.toml`; leave the build command blank and publish directory as `.`.
4. Deploy, then open **Forms** and enable form detection. Redeploy once so Netlify detects `contact-lead`.
5. Set your custom domain in **Domain management** and update the canonicals in the HTML from `raynexis.co.ke` if your final domain differs.

## Production admin backend: Railway

The `backend/` folder is a Node/Express API with PostgreSQL storage, password hashing, JWT login protection, public inquiry submission, and a shared content manager.

1. In Railway, create a project and add a **PostgreSQL** service.
2. Add a second service from this GitHub repository. In that service's **Settings > Source**, set **Root Directory** to `backend`.
3. Add these service variables (replace the values in capitals):

```text
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=USE-A-UNIQUE-SECRET-AT-LEAST-32-CHARACTERS-LONG
FRONTEND_ORIGIN=https://YOUR-NETLIFY-SITE.netlify.app
ADMIN_EMAIL=admin@raynexis.co.ke
SEED_ADMIN_PASSWORD=USE-A-STRONG-UNIQUE-TEMPORARY-PASSWORD
NODE_ENV=production
```

4. Railway automatically runs `npm start` from `backend/package.json`. Deploy the service, then copy its public domain from **Settings > Networking**.
5. Replace the blank value in `api-config.js` with that API domain, for example `https://raynexis-api-production.up.railway.app`, commit, push, and let Netlify redeploy.
6. Sign in at `admin-login.html` with `ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`. After the first successful login, remove `SEED_ADMIN_PASSWORD` from Railway Variables and redeploy; the password is already stored as a hash in PostgreSQL.

Keep `DATABASE_URL`, `JWT_SECRET`, and all passwords in Railway Variables only — never in GitHub or `api-config.js`.
