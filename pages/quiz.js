import { useEffect, useState } from 'react';
if(headerIdx === -1) headerIdx = 0;
const header = rows[headerIdx];
const correctCol = header.findIndex(c => /correct/i.test((c||'').toString()));
const qCol = header.findIndex(c => /question/i.test((c||'').toString()));


let total = 0, got = 0;
for(let i = headerIdx+1; i < rows.length; i++){
const row = rows[i];
if(!row || !row[qCol]) continue;
const score = Number(row[header.findIndex(c=>/score/i.test((c||'').toString()))] || 1);
total += score;
const correct = (row[correctCol] || '').toString().trim();
const ans = (answers[i] || '').toString().trim();
if(correct && ans && correct.toLowerCase() === ans.toLowerCase()) got += score;
}


// send results to server to append to teacher sheet or email
await fetch('/api/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user, quizCode: sessionStorage.getItem('quizCode')||'', total, got, answers }) });


alert(`You scored ${got} / ${total}`);
}


return (
<div style={{fontFamily:'Arial, sans-serif', padding:20}}>
<h2>Quiz</h2>
<p>Student: {user && user.name} — {user && user.accountId}</p>


<div>
{rows.map((r,i) => {
if(i === 0) return null; // skip top
if(!r || !r[0]) return null;
return (
<div key={i} style={{padding:10, borderBottom:'1px solid #eee'}}>
<div><b>{r[0]}</b></div>
<div>
{/* render choice fields if present */}
{(r.slice(1,6).filter(Boolean)).map((c,j)=> (
<label key={j} style={{display:'block'}}>
<input type="radio" name={`q${i}`} value={c} onChange={(e)=>handleAns(i,e.target.value)} /> {c}
</label>
))}
{/* fallback text input */}
{(r.length <= 2) && (
<input placeholder="Answer" onChange={(e)=>handleAns(i,e.target.value)} />
)}
</div>
</div>
);
})}
</div>


<button onClick={submit} style={{marginTop:20}}>Submit</button>
</div>
);
}