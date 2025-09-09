# Vercel Quiz Starter


1. Create a Google Cloud Service Account, enable Google Sheets API.
- Give the service account `Editor` (or at least Sheets read access) to the spreadsheet.
- Download the JSON credentials.
- Copy `client_email` -> `GOOGLE_CLIENT_EMAIL`
- Copy `private_key` -> `GOOGLE_PRIVATE_KEY` (escape line breaks as \n when adding to Vercel env)


2. Create a Google Spreadsheet with tabs named as quiz codes. Use your Excel layout per tab.
- Add a `SETTINGS` sheet for teacher email, subject, and timer options.


3. Fill `.env` (or set Vercel Environment Variables) using `.env.example`.


4. Push to GitHub and import to Vercel. Set Environment Variables in the Vercel dashboard.


5. Deploy. The API route `/api/quiz?code=QUIZCODE` will fetch the sheet tab values.