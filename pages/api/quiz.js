import { google } from 'googleapis';


export default async function handler(req, res){
const { code } = req.query;
if(!code) return res.status(400).send('Missing quiz code');


try{
const auth = new google.auth.JWT({
email: process.env.GOOGLE_CLIENT_EMAIL,
key: process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});


const sheets = google.sheets({version:'v4', auth});
const range = `${code}!A1:Z999`;
const response = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range });
res.status(200).json(response.data);
}catch(err){
console.error(err);
res.status(500).send('Error reading sheet: ' + (err.message || err));
}
}