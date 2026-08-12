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

## Production admin backend

The current admin UI stores edits in the current browser for safe prototyping. For a shared, password-protected admin and inquiry pipeline, connect Supabase:

1. Create a project at Supabase.
2. Run `supabase/schema.sql` in its SQL Editor.
3. Create the first admin user at **Authentication** > **Users** > **Add user**, using a business-controlled email and a strong unique password.
4. Run the commented profile `insert` at the bottom of `supabase/schema.sql`, replacing the email with the admin's email. This grants the user the `admin` role.
5. Copy `supabase/config.js.example` to `supabase/config.js`, enter the project URL and **publishable** API key, then connect that configuration to the frontend app. Never put a Supabase service-role key in the browser or Git.

The SQL uses Row Level Security: visitors can submit leads/read published content, while only an authenticated admin can read inquiries or edit content.
