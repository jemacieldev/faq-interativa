/**
 * script.js
 * Renderização das respostas, ilustração, par do curso concluído,
 * sugestões por tempo e eventos.
 */
document.querySelectorAll("[data-link]").forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) a.href = url;
  else { a.removeAttribute("href"); a.setAttribute("aria-disabled","true");
    const t = document.createElement("span"); t.className = "todo"; t.textContent = "link a definir"; a.appendChild(t); }
});

const keys = ["acesso","comecar","tempo","firme","concluiu"];
function show(k, scroll){
  keys.forEach(x => {
    document.getElementById(x).hidden = x !== k;
    document.getElementById("o-"+x).setAttribute("aria-pressed", x === k);
  });
  document.getElementById("empty").hidden = !!k;
  if (k && scroll) document.getElementById(k).scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
}
document.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
  const k = b.dataset.k;
  if (location.hash !== "#"+k) history.replaceState(null, "", "#"+k);
  show(k, true);
}));
function fromHash(){ const k = location.hash.slice(1); show(keys.includes(k) ? k : null, false); }
window.addEventListener("hashchange", fromHash);
fromHash();

PARES.forEach((p,i) => {
  p[1][3] = PROG && SLUG_IA[i] ? PROG + SLUG_IA[i] : "";
  p[2][3] = PROG && SLUG_HUM[i] ? PROG + SLUG_HUM[i] : "";
});
const goLink = u => u ? `<a class="go" href="${u}" target="_blank" rel="noopener">Abrir curso →</a>` : "";
const sel = document.getElementById("feito"), box = document.getElementById("pairbox");
(function(){
  let h = '<option value="">Escolha o curso que você concluiu</option><optgroup label="IA na Prática">';
  PARES.forEach((p,i) => h += `<option value="${i}-ia">${p[1][0]}</option>`);
  h += '</optgroup><optgroup label="Habilidades Humanas">';
  PARES.forEach((p,i) => h += `<option value="${i}-hum">${p[2][0]}</option>`);
  sel.innerHTML = h + '</optgroup>';
})();
function esc(s){ return s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function card(c, tipo, estado){ return `<div class="pc ${tipo} ${estado}"><span class="lbl">${tipo==="ia"?"IA na Prática":"Habilidades Humanas"}</span><b>${esc(c[0])}</b><small>${esc(c[1])} · ${esc(c[2])}</small>${goLink(c[3])}</div>`; }
function par(){
  const v = sel.value;
  if (!v) { box.innerHTML = '<p class="eyebrow">Par da Semana · Aurora Global Skills</p><p class="empty-p">Escolha acima o curso que você concluiu para ver o seu par: o que a IA faz e o que só você faz.</p>'; return; }
  const [n, lado] = v.split("-"), i = +n, p = PARES[i], prox = PARES[(i+1) % PARES.length];
  const feito = lado === "ia" ? p[1] : p[2], fazer = lado === "ia" ? p[2] : p[1];
  box.innerHTML = `<p class="eyebrow">Par ${String(i+1).padStart(2,"0")} · Aurora Global Skills</p><h4>${esc(p[0])}</h4>`
    + card(feito, lado, "done") + '<p class="join" aria-hidden="true">+</p>' + card(fazer, lado==="ia"?"hum":"ia", "now")
    + `<p class="why"><b>Você fez ${esc(feito[0])}, então faça ${esc(fazer[0])}.</b> ${esc(p[3])}</p>`
    + `<p class="next">Já fez os dois? Próximo par: <b>${esc(prox[0])}</b> (${esc(prox[1][0])} + ${esc(prox[2][0])})</p>`;
}
sel.addEventListener("change", par); par();

function toast(msg){ const t=document.createElement("div"); t.className="toast"; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),1800); }
document.getElementById("copy-subj").addEventListener("click", () => {
  const el = document.getElementById("subj");
  const sel = () => { const r=document.createRange(); r.selectNodeContents(el); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast("Texto selecionado. É só copiar."); };
  try { navigator.clipboard.writeText(el.textContent).then(() => toast("Assunto copiado"), sel); } catch(e){ sel(); }
});

/* Falta de tempo: cursos da trilha que cabem em até 4 semanas no ritmo escolhido */
const CURSOS = [];
PARES.forEach(p => { [["ia",p[1]],["hum",p[2]]].forEach(([t,c]) => { const m = c[1].match(/(\d+) h/); if (m) CURSOS.push({t, nome:c[0], org:c[1].split(" · ")[0], h:+m[1], lang:c[2], url:c[3]}); }); });
const fit = document.getElementById("fit");
function sugerir(h){
  document.querySelectorAll(".hr").forEach(b => b.setAttribute("aria-pressed", +b.dataset.h === h));
  /* Faixa de carga horária para cada ritmo: 1 h = até 4 h · 2 h = 5 a 8 h · 3 h = 9 a 12 h · 5 h ou mais = 13 h ou mais */
  const FAIXA = {1:[0,4], 2:[5,8], 3:[9,12], 5:[13,999]}[h];
  const cabe = CURSOS.filter(c => c.h >= FAIXA[0] && c.h <= FAIXA[1]).sort((a,b) => a.h - b.h);
  const lista = t => cabe.filter(c => c.t === t).slice(0,3).map(c => {
    const s = Math.max(1, Math.ceil(c.h / h));
    return `<li><span class="lbl ${t}">${t==="ia"?"IA na Prática":"Habilidades Humanas"}</span><b>${esc(c.nome)}</b><small>${esc(c.org)} · ${c.h} h · ${esc(c.lang)}</small><small class="when">Você termina em ${s===1?"1 semana":`cerca de ${s} semanas`}</small>${goLink(c.url)}</li>`;
  }).join("");
  const n = cabe.length;
  fit.innerHTML = `<p class="fit-sum">Com <b>${h === 5 ? "5 h ou mais" : h + " h"} por semana</b>, estes são os cursos da trilha com a duração ideal para o seu ritmo (${h === 5 ? "a partir de 13 h" : FAIXA[0] === 0 ? "até 4 h" : "de " + FAIXA[0] + " a " + FAIXA[1] + " h"} de curso):</p>`
    + `<ul class="fit-list">${lista("ia")}${lista("hum")}</ul>`
    + `<p class="fit-tip">Dica: alterne um curso de <b>IA na Prática</b> com um de <b>Habilidades Humanas</b>. A trilha foi pensada para unir os dois.</p>`;
}
document.querySelectorAll(".hr").forEach(b => b.addEventListener("click", () => sugerir(+b.dataset.h)));
sugerir(2);
