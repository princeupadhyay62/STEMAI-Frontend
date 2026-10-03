import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {BookOpen,Brain,FlaskConical,BarChart3,MessageCircle,Menu,X,ArrowRight,CheckCircle,ChevronRight,RotateCcw} from "lucide-react";
import "./style.css";

const subjects=[
 {name:"Physics",icon:"⚛️",color:"cyan",progress:72,topics:["Newton's Laws","Wave Interference","Projectile Motion","Pendulums"]},
 {name:"Mathematics",icon:"∑",color:"violet",progress:58,topics:["Quadratic Functions","Derivatives","Vectors","Probability"]},
 {name:"Chemistry",icon:"🧪",color:"pink",progress:46,topics:["Atoms","Chemical Bonding","Acids & Bases","Reactions"]},
 {name:"Electronics",icon:"⚡",color:"green",progress:41,topics:["Ohm's Law","Circuits","Logic Gates","Diodes"]}
];

const questions=[
 {q:"A wave has frequency 5 Hz and wavelength 2 m. What is its speed?",a:["2.5 m/s","10 m/s","7 m/s","20 m/s"],correct:1},
 {q:"Constructive interference occurs when...",a:["A crest meets a trough","Two crests meet","Waves stop","Frequency becomes zero"],correct:1},
 {q:"According to Ohm's law, V equals...",a:["IR","I/R","R/I","I+R"],correct:0},
 {q:"The derivative of x² is...",a:["x","2x","x²","2"],correct:1}
];

function App(){
 const [page,setPage]=useState("home"),[menu,setMenu]=useState(false),[chat,setChat]=useState([{from:"ai",text:"Hi! I'm your STEM AI Tutor. Ask me anything about Science, Maths, Physics or Electronics."}]),[msg,setMsg]=useState(""),[qi,setQi]=useState(0),[selected,setSelected]=useState(null),[score,setScore]=useState(0),[quizDone,setQuizDone]=useState(false),[dark,setDark]=useState(true);
 const nav=(p)=>{setPage(p);setMenu(false)};
 const send=()=>{if(!msg.trim())return;let m=msg.trim();setChat(c=>[...c,{from:"user",text:m},{from:"ai",text:`Great question! Here's a simple explanation of "${m}": start with the basic concept, identify the given values, then apply the correct formula step by step. Your backend AI can replace this demo response later.`}]);setMsg("")};
 const answer=(i)=>{if(selected!==null)return;setSelected(i);if(i===questions[qi].correct)setScore(s=>s+1)};
 const next=()=>{if(qi===questions.length-1)setQuizDone(true);else{setQi(q=>q+1);setSelected(null)}};
 return <div className={dark?"app dark":"app"}>
  <header><button className="brand" onClick={()=>nav("home")}><span>✦</span> STEMAI</button><nav>
   {["dashboard","subjects","tutor","quiz","lab","progress"].map(x=><button className={page===x?"active":""} onClick={()=>nav(x)} key={x}>{x[0].toUpperCase()+x.slice(1)}</button>)}
  </nav><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
  {menu&&<div className="mobileNav">{["dashboard","subjects","tutor","quiz","lab","progress"].map(x=><button onClick={()=>nav(x)} key={x}>{x}</button>)}</div>}
  <main>
  {page==="home"&&<section className="hero"><div className="badge">AI-POWERED STEM LEARNING</div><h1>Ask. Build.<br/><span>Master STEM.</span></h1><p>Learn science, mathematics and engineering with an interactive AI tutor, experiments, quizzes and personalized progress.</p><div className="actions"><button className="primary" onClick={()=>nav("dashboard")}>Start Learning <ArrowRight/></button><button className="secondary" onClick={()=>nav("tutor")}>Ask AI Tutor</button></div><div className="cards">{[["🤖","AI Tutor","Get concepts explained in your level."],["🧪","Virtual Lab","Experiment with interactive simulations."],["📈","Progress","Track XP, streaks and mastery."]].map(c=><div className="feature"><b>{c[0]} {c[1]}</b><p>{c[2]}</p></div>)}</div></section>}
  {page==="dashboard"&&<><Title t="Good morning, Learner 👋" s="Keep your STEM streak going."/><div className="stats">{[["🔥","12","Day streak"],["⚡","1,840","XP earned"],["🎯","68%","Mastery"],["⏱️","128m","This week"]].map(s=><div className="stat"><i>{s[0]}</i><strong>{s[1]}</strong><small>{s[2]}</small></div>)}</div><div className="section"><h2>Continue learning</h2><div className="subjectGrid">{subjects.map(s=><Subject s={s} onClick={()=>nav("subjects")}/>)}</div></div></>}
  {page==="subjects"&&<><Title t="Explore STEM" s="Choose a subject and start learning."/><div className="subjectGrid">{subjects.map(s=><Subject s={s}/>)}</div></>}
  {page==="tutor"&&<><Title t="AI Tutor" s="Your personal STEM study companion."/><div className="chat">{chat.map(m=><div className={m.from==="user"?"bubble user":"bubble"}>{m.text}</div>)}<div className="quick">{["Explain derivatives simply","Help with Ohm's law","Why do waves interfere?"].map(x=><button onClick={()=>{setMsg(x)}}>{x}</button>)}</div><div className="composer"><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything about STEM..."/><button onClick={send}>Send</button></div></div></>}
  {page==="quiz"&&<><Title t="Quick Practice" s="Test your understanding."/><div className="quiz">{quizDone?<><div className="result">🎉</div><h2>Quiz complete!</h2><p>You scored <b>{score}/{questions.length}</b></p><button className="primary" onClick={()=>{setQi(0);setScore(0);setSelected(null);setQuizDone(false)}}><RotateCcw/> Try again</button></>:<><div className="qtop"><span>Question {qi+1}/{questions.length}</span><b>{score} correct</b></div><h2>{questions[qi].q}</h2>{questions[qi].a.map((a,i)=><button className={"option "+(selected!==null?(i===questions[qi].correct?"correct":i===selected?"wrong":""):"")} onClick={()=>answer(i)}>{a}</button>)}{selected!==null&&<button className="primary next" onClick={next}>{qi===questions.length-1?"Finish":"Next"} <ChevronRight/></button>}</>}</div></>}
  {page==="lab"&&<><Title t="Virtual Lab" s="Experiment with a pendulum."/><div className="lab"><div className="pendulum"><div className="line"></div><div className="bob"></div></div><div className="controls"><label>Length <b>1.5 m</b><input type="range" min="0.5" max="3" step=".1" defaultValue="1.5"/></label><label>Gravity <b>9.8 m/s²</b><input type="range" min="1" max="15" step=".1" defaultValue="9.8"/></label><div className="formula">T = 2π√(L/g)</div></div></div></>}
  {page==="progress"&&<><Title t="Your Progress" s="See how your STEM journey is going."/><div className="progressCard"><div className="big">68%</div><div><h2>Overall mastery</h2><p>You're building consistent knowledge across STEM.</p></div></div><h2>Subject mastery</h2>{subjects.map(s=><div className="barRow"><span>{s.icon} {s.name}</span><div><i style={{width:s.progress+"%"}}></i></div><b>{s.progress}%</b></div>)}</>}
  </main><footer>STEMAI • Interactive STEM Education</footer>
 </div>
}
function Title({t,s}){return <div className="title"><h1>{t}</h1><p>{s}</p></div>}
function Subject({s,onClick}){return <button className="subject" onClick={onClick}><span className={"icon "+s.color}>{s.icon}</span><h3>{s.name}</h3><p>{s.topics.length} learning topics</p><div className="bar"><i style={{width:s.progress+"%"}}></i></div><small>{s.progress}% complete</small></button>}
createRoot(document.getElementById("root")).render(<App/>);
