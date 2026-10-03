// One finite continuation of the already-authorized October 3 publication batch.
import {readFileSync,writeFileSync,openSync,closeSync,unlinkSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
const batch='thechoicervoicer-20261003';
const broker='http://127.0.0.1:17891';
const statePath=resolve(root,'docs/seo/continuation-state-2026-10-03.json');
const read=p=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const payload=read('docs/seo/indexnow-payload-2026-10-03.json');
const expected=read('docs/content/practice-pages-2026-10-03.json').flatMap(p=>[false,true].map(zh=>`https://thechoicervoicer.me/${zh?'zh/':''}${p.slug}/`));
if(JSON.stringify(payload.urlList)!==JSON.stringify(expected)||new Set(expected).size!==30)throw Error('Immutable canonical set mismatch');
let state;
try{state=read('docs/seo/continuation-state-2026-10-03.json');}catch{state={taskDate:'2026-10-03',status:'waiting-ga4',canonicalSet:expected,actions:{},receipts:[],startedAt:new Date().toISOString()};}
if(JSON.stringify(state.canonicalSet)!==JSON.stringify(expected))throw Error('Continuation fingerprint mismatch');
const save=()=>{writeFileSync(statePath,JSON.stringify(state,null,2)+'\n');if(['completed','blocked','failed'].includes(state.status)){const p=resolve(root,'docs/inner-page-release-ledger-2026-10-03.md');const original=readFileSync(p,'utf8').split('\n<!-- finite-continuation -->')[0];writeFileSync(p,original+'\n<!-- finite-continuation -->\n## 一次性接续结果\n\n状态：'+state.status+'；记录时间：'+new Date().toISOString()+'；当前分数：'+(state.score||95)+'。以上表格保留首次发布检查的历史状态；最新逐 URL 请求、收录与评分以 GSC 全表、评分 CSV 与 continuation-state-2026-10-03.json 为准。\n原因：'+(state.error||JSON.stringify(state.gscStopped)||'见独立渠道回执')+'\n');}};
const delay=()=>new Promise(r=>setTimeout(r,30_000));
const deadline=Date.parse(state.startedAt)+12*60*60*1000;
const date=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const tomorrow=()=>{const d=new Date(date()+'T00:00:00+08:00');d.setUTCDate(d.getUTCDate()+1);return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);};
async function get(path){const r=await fetch(broker+path,{signal:AbortSignal.timeout(10_000)});return r.status===204?null:r.ok?await r.json():Promise.reject(Error('Broker HTTP '+r.status));}
function execution(result){return result?.execution||result||{};}
function ga4Matches(result){
 if(!result||result.project?.siteUrl!=='https://thechoicervoicer.me/'||result.project?.ga4MeasurementId!=='G-4SMXSDGLW2'||result.project?.ga4PropertyId!=='551708268')return [];
 const e=execution(result),matches=new Set();
 for(const step of e.steps||[]){
  const proof=step.evidence||step;
  if(!/analytics\.google\.com\/analytics\/web\/#\/a400013765p551708268\/(?:reports\/)?realtime\/overview/.test(proof.actualUrl||step.actualUrl||''))continue;
  for(const item of proof.matched||[]){if(expected.includes(item.url))matches.add(item.url);}
 }
 return [...matches];
}
async function waitTerminal(id){
 while(Date.now()<deadline){const result=await get('/results?batchId='+encodeURIComponent(id));if(result)return result;await delay();}
 throw Error('Finite continuation deadline reached; no receipt invented');
}
function csvRows(path){return execFileSync('python3',['-c','import csv,json,sys; print(json.dumps(list(csv.DictReader(open(sys.argv[1])))))',resolve(root,path)],{encoding:'utf8'}).trim();}
function updateCsv(action,proof={}){
 const code=`import csv,json,sys,datetime\nfrom pathlib import Path\nroot=Path(sys.argv[1]);action=sys.argv[2];proof=json.loads(sys.argv[3]);today=sys.argv[4];retry=sys.argv[5]\ndef load(p):\n rows=list(csv.DictReader((root/p).open()));return rows,list(rows[0])\ndef store(p,rows,fields):\n with (root/p).open('w',newline='') as f:\n  w=csv.DictWriter(f,fields,lineterminator='\\n');w.writeheader();w.writerows(rows)\nif action=='ga4':\n p='docs/seo/seo-scorecards-2026-10-03.csv';rows,fields=load(p)\n for r in rows:\n  if r['check_id']=='19':r.update(status='Pass',points='5',evidence=proof['evidence'])\n store(p,rows,fields)\n p='docs/keyword-pool.csv';rows,fields=load(p)\n for r in rows:\n  if r['batch_date']=='2026-10-03' and r['slot']:r.update(page_status='已上线',content_score='40/40',failed_checks='',ga4_status='Realtime verified; '+proof['evidence'])\n store(p,rows,fields)\nelif action=='platforms':\n p='docs/keyword-pool.csv';rows,fields=load(p)\n for r in rows:\n  if r['batch_date']=='2026-10-03' and r['slot']:r.update(indexnow_status=proof['indexnow'],bing_status=proof['bing'])\n store(p,rows,fields)\nelse:\n p='docs/seo/GSC_INNER_PAGE_STATUS.csv';rows,fields=load(p)\n for r in rows:\n  if r['canonical']==proof['url']:\n   r.update(last_gsc_attempt_date=proof['at'],recorded_attempt_count=str(int(r.get('recorded_attempt_count') or 0)+1),last_result_or_error=proof['detail'],last_reconciled_date=today,evidence_source=proof['evidence'])\n   if proof['status']=='indexed':r.update(gsc_request_status='already-indexed',google_index_status='indexed',google_evidence_date=proof['at'],next_retry_date='')\n   elif proof['status']=='requested':r.update(gsc_request_status='request-confirmed',request_confirmed_date=proof['at'],next_retry_date='')\n   else:r.update(gsc_request_status='needs-recheck',next_retry_date=retry)\n store(p,rows,fields)\n p='docs/seo/GSC_URL_INSPECTION_LEDGER.csv';ledger,lf=load(p);r=dict.fromkeys(lf,'');r.update(inspection_date=proof['at'],canonical=proof['url'],status=proof['status'],detail=proof['detail'],request_action='already-indexed' if proof['status']=='indexed' else 'request-confirmed' if proof['status']=='requested' else 'not-requested');ledger.append(r);store(p,ledger,lf)\n p='docs/seo/GSC_URL_SUBMISSION_BACKLOG.csv';backlog,bf=load(p)\n if proof['status'] in ('indexed','requested'):backlog=[r for r in backlog if r['canonical']!=proof['url']]\n else:\n  for r in backlog:\n   if r['canonical']==proof['url']:r.update(evidence_status='needs-recheck',last_gsc_attempt_date=proof['at'],recorded_attempt_count=str(int(r.get('recorded_attempt_count') or 0)+1),last_result_or_error=proof['detail'],next_retry_date=retry)\n store(p,backlog,bf)\n p='docs/keyword-pool.csv';pool,pf=load(p)\n for r in pool:\n  if 'https://thechoicervoicer.me'+r['planned_url']==proof['url']:\n   r['gsc_status']='request-confirmed' if proof['status']=='requested' else 'already-indexed' if proof['status']=='indexed' else 'needs-recheck'\n   if proof['status']=='indexed':r['google_status']='indexed'\n store(p,pool,pf)\n`;
 execFileSync('python3',['-c',code,root,action,JSON.stringify(proof),date(),tomorrow()],{encoding:'utf8'});
}
async function enqueue(id,mode,urls){
 const {buildExternalClosureCommand,commandFingerprint}=await import('/Users/a1-6/Documents/收录助手1.0/scripts/external-closure-contract.mjs');
 const project={projectName:'thechoicervoicer.me',projectId:'thechoicervoicer-me',siteUrl:'https://thechoicervoicer.me/',gscProperty:'sc-domain:thechoicervoicer.me',bingSiteUrl:'https://thechoicervoicer.me/',sitemapUrl:'https://thechoicervoicer.me/sitemap.xml',indexNowKey:payload.key,ga4PropertyId:'551708268',ga4StreamId:'15504292780',ga4MeasurementId:'G-4SMXSDGLW2',urls};
 const command=buildExternalClosureCommand({batchId:id,mode,scenario:'daily-pages',project,ga4Identity:'thechoicervoicer.me / p551708268 / G-4SMXSDGLW2',ga4Url:'https://analytics.google.com/analytics/web/#/a400013765p551708268/realtime/overview'});
 // Consume the recovery allowance for this one-at-a-time coordinator: session gates stop here.
 // This policy field never serves as a GSC actual-attempt count; CSV counts only real URL outcomes.
 command.retryPolicy={attempt:1,maxAttempts:1,reason:'No automatic retry: coordinator must persist the first exact outcome and stop at a session gate.'};command.fingerprint=commandFingerprint(command);
 const response=await fetch(broker+'/commands',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(command),signal:AbortSignal.timeout(10_000)});
 if(!response.ok)throw Error('Enqueue HTTP '+response.status);state.actions[id]={mode,urls,enqueuedAt:new Date().toISOString(),result:await response.json()};save();
}
async function recordResult(id){
 const result=await waitTerminal(id);const filename=`docs/seo/continuation-${id}.json`;writeFileSync(resolve(root,filename),JSON.stringify(result,null,2)+'\n');state.actions[id].status=result.status;state.actions[id].evidence=filename;save();return {result,filename};
}
async function main(){
 save();if(process.argv.includes('--check')){console.log('PASS: exact 30 canonical URLs; no external actions in --check');return;}
 if(['completed','blocked','failed'].includes(state.status)){console.log('Existing terminal continuation:',state.status);return;}
 if(!state.ga4Evidence){
  const ids=[`${batch}-15-ga4-verify-v1`,...[1,2,3].map(n=>`${batch}-15-ga4-verify-v1.retry-${n}`)];
  const union=new Set();let matchedResult;const proofs=new Map();
  while(Date.now()<deadline){
   const jobs=(await get('/jobs')).jobs;let allTerminal=jobs.some(j=>j.batchId===ids[0]);
   for(const id of ids){const job=jobs.find(j=>j.batchId===id);if(!job)continue;if(['queued','running'].includes(job.status)){allTerminal=false;continue;}
    const result=await get('/results?batchId='+encodeURIComponent(id));for(const url of ga4Matches(result))union.add(url);if(ga4Matches(result).length)proofs.set(id,result);if(union.size===30)matchedResult=result;
   }
   state.backendMatchedUrls=[...union];save();
   if(matchedResult){const filename='docs/seo/continuation-ga4-evidence-2026-10-03.json';writeFileSync(resolve(root,filename),JSON.stringify({matchedUrls:[...union],results:[...proofs.values()]},null,2)+'\n');state.ga4Evidence=filename;break;}
   if(allTerminal)throw Error('GA4 terminal retries lack all 30 matched URLs; indexing remains gated');
   await delay();
  }
  if(!state.ga4Evidence)throw Error('GA4 queue did not provide complete evidence within 12 hours');
  // A later site update requires a new audit; never transfer this score to changed HTML.
  const proxy=process.env.HTTPS_PROXY;const artifact=resolve(root,'artifacts/release-20261003-v2');
  for(const url of expected){const path=new URL(url).pathname.slice(1)+'index.html';const actual=execFileSync('curl',['--fail','--silent','--show-error','--max-time','30',...(proxy?['--proxy',proxy]:[]),url]);const local=readFileSync(resolve(artifact,path));if(createHash('sha256').update(actual).digest('hex')!==createHash('sha256').update(local).digest('hex'))throw Error('Production HTML changed: '+url);}
  updateCsv('ga4',{evidence:state.ga4Evidence});state.score=100;state.status='indexing';save();
 }
 if(!state.indexnow){
  try{
  const keyBody=execFileSync('curl',['--fail','--silent','--show-error','--max-time','30',...(process.env.HTTPS_PROXY?['--proxy',process.env.HTTPS_PROXY]:[]),payload.keyLocation],{encoding:'utf8'}).trim();
  if(keyBody!==payload.key)throw Error('Live public IndexNow key mismatch');
  const raw=execFileSync('curl',['--silent','--show-error','--max-time','30',...(process.env.HTTPS_PROXY?['--proxy',process.env.HTTPS_PROXY]:[]),'-X','POST','-H','Content-Type: application/json','--data-binary','@'+resolve(root,'docs/seo/indexnow-payload-2026-10-03.json'),'-w','\n%{http_code}','https://api.indexnow.org/indexnow'],{encoding:'utf8'});
  const lines=raw.trimEnd().split('\n');state.indexnow={http:Number(lines.pop()),body:lines.join('\n'),at:new Date().toISOString()};save();
  }catch(error){state.indexnow={http:0,error:error.message,at:new Date().toISOString()};save();}
 }
 // Platform failures remain independent. No new execution lane is started.
 for(const [suffix,mode] of [['sitemap-gsc','gsc-sitemap-recheck'],['sitemap-bing','bing-sitemap-recheck']]){
  const id=`${batch}-after100-${suffix}-v1`;if(!state.actions[id])await enqueue(id,mode,expected);
  if(!state.actions[id].status)await recordResult(id);
 }
 if(![200,202].includes(state.indexnow.http)){const id=`${batch}-after100-bing-urls-v1`;if(!state.actions[id])await enqueue(id,'bing-url-recheck',expected);if(!state.actions[id].status)await recordResult(id);}
 updateCsv('platforms',{indexnow:[200,202].includes(state.indexnow.http)?'accepted HTTP '+state.indexnow.http:'failed; see continuation-state',bing:'Independent sitemap / URL results saved in continuation-state'});
 for(let i=0;i<expected.length;i++){
  if(state.gscStopped)break;const url=expected[i];const id=`${batch}-after100-gsc-${String(i+1).padStart(2,'0')}-v1`;
  if(!state.actions[id])await enqueue(id,'gsc-url-recheck',[url]);
  if(state.actions[id].recorded)continue;
  const {result,filename}=await recordResult(id);const e=execution(result);const outcomes=(e.urlResults||[]).filter(r=>r.system==='gsc'&&r.url===url);const r=outcomes.at(-1);
  if(r){const status=r.ok&&['indexed','requested'].includes(r.status)?r.status:r.status||'unknown';updateCsv('gsc',{url,status,at:r.at||result.receivedAt,detail:(r.detail||e.error||'No explicit request receipt')+'; batch '+id,evidence:filename});state.actions[id].recorded=true;save();}
  if(!r||!r.ok||!['indexed','requested'].includes(r.status)){state.gscStopped={url,batchId:id,reason:r?.detail||e.error||'No exact per-URL terminal receipt'};save();break;}
 }
 const sitemapIds=['sitemap-gsc','sitemap-bing'].map(s=>`${batch}-after100-${s}-v1`);
 const sitemapOK=sitemapIds.every(id=>{const r=read(state.actions[id].evidence);return (execution(r).steps||[]).some(s=>/sitemap/i.test(s.name||'')&&s.status==='success');});
 state.status=state.gscStopped||![200,202].includes(state.indexnow.http)||!sitemapOK?'blocked':'completed';state.finishedAt=new Date().toISOString();save();
}
if(!process.argv.includes('--check')){
 const lockPath=resolve(root,'artifacts/continuation-20261003.lock');
 try{const fd=openSync(lockPath,'wx');writeFileSync(fd,String(process.pid));closeSync(fd);}
 catch(error){if(error.code!=='EEXIST')throw error;const pid=Number(readFileSync(lockPath,'utf8'));try{process.kill(pid,0);throw Error('This finite continuation already has a live owner');}catch(probe){if(probe.code!=='ESRCH')throw probe;unlinkSync(lockPath);const fd=openSync(lockPath,'wx');writeFileSync(fd,String(process.pid));closeSync(fd);}}
 process.on('exit',()=>{try{if(Number(readFileSync(lockPath,'utf8'))===process.pid)unlinkSync(lockPath);}catch{}});
 process.on('SIGINT',()=>process.exit(130));
}
try{await main();}catch(error){state.status='blocked';state.error=error.message;state.finishedAt=new Date().toISOString();save();console.error(error.message);process.exitCode=1;}
