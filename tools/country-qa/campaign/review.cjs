const fs=require('node:fs/promises');
const path=require('node:path');
const dir=path.resolve(__dirname,'../../../artifacts/country-user-journeys-20261029');
(async()=>{
  const rows=[];
  for(let n=1;n<=5;n++){
    try{
      const r=JSON.parse(await fs.readFile(path.join(dir,`tester${n}`,'results.json'),'utf8'));
      rows.push({tester:n,ip:r.before?.ip,country:r.before?.country,providerCountry:r.expectedCountry,countryMismatch:r.countryMismatch,finished:r.finished===true,ipStable:r.ipStable===true,steps:r.steps.length,stepFailures:r.steps.filter(s=>s.status!=='passed').map(s=>s.name),pageErrors:r.pageErrors.length,failedRequests:r.failedRequests.length});
    }catch{rows.push({tester:n,finished:false,reason:'No completed results available'});}
  }
  const ips=rows.map(r=>r.ip).filter(Boolean);
  const verifiedFiveIps=ips.length===5&&new Set(ips).size===5&&rows.every(r=>r.finished&&r.ipStable);
  const summary={verifiedFiveIps,rows,note:'Step failures require reviewer triage: a locator/test failure is not automatically a product defect. Country is observed by a single IP database, not certified.'};
  await fs.mkdir(dir,{recursive:true});
  await fs.writeFile(path.join(dir,'summary.json'),JSON.stringify(summary,null,2));
  console.table(rows);
  console.log('Five distinct stable IPs confirmed:',verifiedFiveIps);
  if(!verifiedFiveIps)process.exitCode=1;
})().catch(()=>{console.error('Could not aggregate campaign results');process.exitCode=1;});
