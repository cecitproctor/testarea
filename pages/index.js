import { useState } from 'react';


export default function Home() {
const [form, setForm] = useState({ accountId: '', name: '', email: '', quizCode: '', day: 'MW', time: '7:30 AM' });
const times = ["7:30 AM","9:00 AM","10:30 AM","12:00 PM","1:30 PM","3:00 PM","4:30 PM","6:00 PM","7:30 PM","9:00 PM"];


function handleChange(e){
setForm({ ...form, [e.target.name]: e.target.value });
}


async function startQuiz(e){
e.preventDefault();
// Fetch quiz from server (server will read Google Sheets)
const res = await fetch(`/api/quiz?code=${encodeURIComponent(form.quizCode)}`);
if(!res.ok){
const txt = await res.text();
alert('Error fetching quiz: ' + txt);
return;
}
const data = await res.json();
// store user info and quiz in sessionStorage then redirect to /quiz
sessionStorage.setItem('quizUser', JSON.stringify(form));
sessionStorage.setItem('quizData', JSON.stringify(data));
window.location.href = '/quiz';
}


return (
<div style={{fontFamily:'Arial, sans-serif', padding:20, maxWidth:700, margin:'0 auto'}}>
<h1>Quiz Login / Start</h1>
<form onSubmit={startQuiz} style={{display:'grid', gap:10}}>
<input name="accountId" placeholder="Account ID" value={form.accountId} onChange={handleChange} required />
<input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
<input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
<input name="quizCode" placeholder="Quiz Code (Sheet name)" value={form.quizCode} onChange={handleChange} required />


<label>
Day Schedule
<select name="day" value={form.day} onChange={handleChange}>
<option>MW</option>
<option>TTh</option>
<option>FS</option>
</select>
</label>


<label>
Time Schedule
<select name="time" value={form.time} onChange={handleChange}>
{times.map(t => <option key={t}>{t}</option>)}
</select>
</label>


<button type="submit">Start</button>
</form>


<p style={{marginTop:20, color:'#555'}}>This will fetch the sheet named <b>Quiz Code</b> and redirect to the quiz page.</p>
</div>
);
}