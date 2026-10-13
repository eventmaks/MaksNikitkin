'use strict';
const groups=[{name:'Знакомство и команда',tab:'Команда',time:'18:15 — 18:45',description:'Узнать коллег с новой стороны, посмеяться вместе и почувствовать себя командой.',items:[
['Ты меня знаешь','Корпоративный квиз с вопросами о вашей работе и профессиональной тематике.','За столами'],
['Кинолица','Угадайте фильм по кадру, в котором лица героев заменены фотографиями коллег и руководителей.','Фото коллег'],
['Что было дальше?','Нейросеть оживляет фотографии коллег. Угадайте, кто в кадре и что случится дальше, выбрав один из вариантов.','Фото и видео'],
['Стрём или норм','Оцените предложенную ситуацию: «стрём» или «норм». Диджей сопровождает ответы реакциями-мемами.','Обсуждение'],
['Базовый минимум','Игра про вкусы, привычки и самоиронию: узнаваемые ситуации и разные взгляды участников.','Про нас'],
['Смехлыст','Команды придумывают смешные ответы на вопросы с телефонов, затем голосуют за ответы соперников. Можно отвечать анонимно.','С телефона','Понадобятся телефоны. Формат модерации ответов уточняется.'],
['Битва мемов','Выберите мем, который лучше всего отвечает на забавную ситуацию о коллегах, руководителях или компании.','Командами'],
['Шоу «Интуиция»','Две команды угадывают, кому из соперников принадлежит необычный, малоизвестный факт.','Факты о коллегах']
]},{name:'Музыкальные активности',tab:'Музыка',time:'19:00 — 19:35',description:'Вспоминаем хиты, угадываем мелодии и подпеваем знакомым строчкам.',items:[]},{name:'Игры из популярных шоу',tab:'Шоу и игры',time:'20:05 — 20:40',description:'Телевизионные форматы, командные испытания и игры с реквизитом.',items:[]},{name:'Танцы и караоке',tab:'Танцы и караоке',time:'20:55 — 21:25',description:'Финальный игровой блок: музыка, импровизация и движение.',items:[]}];
groups[1].items=[["Музыкальное лото", "Команды выбирают номера, слушают треки, поют и отмечают песни в бланках. Побеждает команда, первой закрывшая свой бланк. В подборке 60 современных, вечных и ретрохитов.", "За столами"], ["Угадай Music", "Музыкальная викторина из девяти интерактивов: перевёртыши, эмоджи, музыка из фильмов, сериалов и мультфильмов.", "Музыкальный квиз"], ["Музыкальный биатлон", "Две стороны соревнуются, кто быстрее вспомнит строчку песни или ответит на вопрос о популярном хите. Можно не только отвечать, но и петь.", "Музыкальная дуэль"], ["Своя игра · Песни", "Выбирайте музыкальные категории и отвечайте на вопросы в формате знакомой телевизионной викторины.", "Эрудиция"], ["Музыкальная натальная карта", "Угадайте исполнителя по трём карточкам с описаниями. Они напоминают характеристики знаков зодиака, но построены на текстах песен.", "Угадать артиста"], ["Вта фа пеппе шнейне", "Расшифруйте набор букв и узнайте, какая песня за ним скрывается.", "Музыкальный баттл"], ["Эмоджи", "Угадайте фильмы, страны, песни и мемы, зашифрованные последовательностями смайликов.", "Визуальный квиз"], ["Шазам Hits 2026!", "Узнайте 14 хитов 2026 года по напевам. После каждого задания открывается правильный ответ.", "Современные хиты"], ["ХЗ шоу · Хит знаю", "Угадайте популярные песни по напевам со словами «ХЗ», исполненным голосом Анны Асти. После верного ответа команда поёт вместе.", "Угадать и спеть"], ["Допевалити", "Знакомая песня неожиданно прерывается. Продолжите её и допойте нужную строчку.", "Поём вместе"], ["Мэйд ин Раша", "Квиз и музыка в русском стиле. На выбор: узнавать песни по стилизованным минусовкам, фильмы по старорусским трейлерам, находить логику, различать «наше / не наше» и угадывать товары по отзывам.", "Несколько раундов"]];
groups[2].items=[["Кажется, нащупали · Что в коробке?", "Угадайте спрятанный предмет на ощупь, не заглядывая внутрь коробки.", "С реквизитом", "В исходном варианте предусмотрены в том числе живые объекты. Состав уточняется."], ["Два дивана + шокеры", "Команды на время угадывают слова, выражения, фильмы и песни в нескольких раундах. Используются капы, таблички и другой реквизит.", "Командное шоу", "Формат включает шокеры. Условия участия нужно обсудить заранее."], ["Громкий вопрос", "Участник в наушниках угадывает фразу или ситуацию за ограниченное время. Команда помогает жестами и артикуляцией.", "Жесты и мимика"], ["НеИгры", "Шесть динамичных раундов по мотивам YouTube-шоу. Команды выполняют задания на время.", "Командные испытания"], ["Эпоха 90-х", "Три раунда о девяностых: видео, аудио и вопросы с ответами.", "Ностальгия"], ["Янкин понг, Хдыщь, перевёртыши, корнхолл", "Подвижные задания с реквизитом: успеть надеть каску, действовать воздушной битой и выбивать теннисные шарики молотом, в том числе в очках-перевёртышах.", "Подвижные игры", "Нужна свободная площадка. Состав игр и реквизита уточняет исполнитель."], ["Слепой лабиринт", "Участник с закрытыми глазами проходит напольный лабиринт. Остальные направляют его, по очереди произнося по одному слову.", "На взаимодействие", "Прохождение с повязкой на глазах. Нужна свободная площадка."], ["Пьяный снайпер", "Команды выполняют задания с шариками для пинг-понга и яичными лотками в очках-перевёртышах.", "Ловкость", "Название игры; алкоголь в описании механики не предусмотрен."], ["Цу-е-фа", "Команды открывают на экране ячейки с жестами «камень, ножницы, бумага». Победители получают балл, проигравшие выполняют песенное, танцевальное или другое задание.", "Удача и задания"], ["Крокотивити", "Объясните команде слова с экрана: в одном задании можно использовать речь, в другом — только движения.", "Слова и жесты"], ["Парни против девушек", "Три раунда вопросов о мужских и женских стереотипах: фото, видео и аудио.", "Викторина"], ["Телешоу", "Адаптированные форматы «Кто хочет стать миллионером?», «Поле чудес» и «Угадай мелодию».", "Знакомые форматы"], ["Игра на выбивание", "Две команды проходят пять раундов: квиз, внимательность, скорость реакции, танцы и караоке.", "Пять испытаний"]];
groups[3].items=[["50 оттенков розового", "Команды угадывают популярные фильмы, а после каждого раунда выполняют импровизированное танцевальное задание.", "Кино и танцы"], ["Дэнс кейс", "Три тура для двух команд. Выбирайте соперникам музыкальные жанры и задания: как танцевать и что делать.", "Танцевальный баттл"], ["Командообразование", "Танцевальная викторина с музыкальными жанрами на экране. В баттлах участвуют по три представителя команды с определёнными навыками.", "По 3 участника"], ["Танцевальное ЧБД", "Угадайте продолжение необычного музыкального клипа. Команда, которая ошиблась, повторяет танец из видео.", "Видео и движение"], ["Карты, деньги, два стола", "Несколько виртуальных карточных раздач. Проигравшая команда выполняет танцевальный челлендж.", "Карты и танцы"], ["Танцуй, если знаешь этот тренд", "Баттл по вирусным танцам из TikTok и Reels. За знакомые движения команда получает баллы, за незнакомые теряет их.", "Танцевальные тренды"], ["Just Dance", "Команды по очереди играют в морской бой. Проигравшая повторяет танцевальные движения за видео на экране.", "Повторяй движения"], ["Загадочное караоке + шокеры", "Шесть песен на выбор с текстами, переделанными нейросетью. Нужно петь и угадывать зашифрованные продолжения строк.", "Караоке-загадка", "За ошибку в исходном формате предусмотрен разряд тока. Условия участия обсуждаются заранее."], ["Актёрское караоке", "Исполните известную песню с актёрским заданием: меняйте настроение, подражайте известным людям или обыгрывайте комичную ситуацию.", "Импровизация"], ["Караоке-баттл «Меломан» + шумометр", "Вспоминайте пропущенные слова и пойте всей командой громче соперников. Громкость измеряется шумометром.", "Командное караоке"], ["Караоке поколений", "Команды исполняют хиты разных поколений: от Hi-Fi, Билана и «Зверей» до Zivert, Вани Дмитриенко и SQWOZ BAB.", "Хиты разных лет", "В исходнике команды — родители и дети. Состав команд адаптируется к гостям."], ["Музыкальный фристайл", "На ходу придумайте песню, ориентируясь на смайлики, которые бегущей строкой появляются на экране.", "Песенная импровизация", "В исходнике песня адресована малышу или будущим родителям. Тему для корпоратива нужно заменить."], ["Шоу «Ночной контакт»", "Выберите иконку с заданием, позвоните указанному типу контакта из своей телефонной книги и выполните условие.", "Звонки знакомым", "В игре участвуют люди за пределами мероприятия. Задания уточняются заранее."], ["Пьяноговорки", "Команды стараются без ошибок произнести сложные фразы и зарабатывают баллы.", "Командная речь", "В исходном формате баллы выдаются в виде алкогольного напитка."]];
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const titles=['Знакомимся','Ловим ритм','Включаем азарт','Зажигаем'];
const MAXIM_PHONE_DISPLAY='+7 915 336-28-45';
const MAXIM_PHONE_DIGITS='79153362845';
const STORE_KEY='nikitkin-programme-draft';
const plannedOptions=['Торт','Первый танец','Поздравления гостей','Выступление артистов','Шоу-программа','Розыгрыш','Сюрприз от гостей'];
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.matchMedia?.('(pointer:coarse)').matches;

const state={
  screen:'intro',level:0,index:0,selected:new Set(),skipped:new Set(),discussed:new Set(),seen:new Set(),done:new Set(),notes:{},skipNotes:{},discussNotes:{},
  name:'',contact:'',eventDate:'',startTime:'',endTime:'',eventType:'',venue:'',guestCount:'',
  audienceAge:'',children:'',childrenDetails:'',guestParticipation:'',activityLevel:'',eveningStyle:'',
  musicLikes:'',musicAvoid:'',humorConsent:'',sensitiveTopics:'',importantGuests:'',surprises:'',decisionMaker:'',
  preferredContact:'',contactTime:'',existingTimeline:'',coordinatorContact:'',djContact:'',mediaContact:'',venueContact:'',
  planned:[],plannedOther:'',wants:'',avoid:'',comment:'',finalQuestion:'',consent:false,applicationId:'',createdAt:'',updatedAt:'',completedAt:'',sentAt:'',revision:1,returnFromDetails:''
};
let statusTimer,draftFound=false,loadedFromLink=false,readOnlyMode=false;

function scrollTopNow(){try{window.scrollTo({top:0,left:0,behavior:'auto'})}catch{window.scrollTo(0,0)}}
function openModal(id){const d=typeof id==='string'?$(id):id;if(!d)return;try{if(typeof d.showModal==='function'){d.showModal();return}}catch{}d.classList.add('fallback-open');d.setAttribute('open','');document.body.classList.add('modal-open')}
function closeModal(id){const d=typeof id==='string'?$(id):id;if(!d)return;try{if(typeof d.close==='function'&&d.open){d.close()}}catch{}d.classList.remove('fallback-open');d.removeAttribute('open');document.body.classList.remove('modal-open')}
function legacyCopy(text){const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';ta.style.pointerEvents='none';document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);let ok=false;try{ok=document.execCommand('copy')}catch{}ta.remove();return ok}
function openExternal(url){if(isMobile){location.href=url;return}const w=window.open(url,'_blank','noopener');if(!w)location.href=url}
function valid(id){return typeof id==='string'&&/^\d+-\d+$/.test(id)&&!!groups[+id.split('-')[0]]?.items[+id.split('-')[1]]}
function picks(g){return groups[g].items.map((x,i)=>({id:g+'-'+i,item:x})).filter(x=>state.selected.has(x.id))}
function selectOne(id){if(!valid(id))return;const group=+id.split('-')[0],prefix=group+'-';for(const selectedId of [...state.selected]){if(selectedId.startsWith(prefix)){state.selected.delete(selectedId);delete state.notes[selectedId]}}state.skipped.delete(group);state.discussed.delete(group);delete state.skipNotes[group];delete state.discussNotes[group];state.selected.add(id);markIncomplete()}
function normalizeSelections(){const keep=new Map();for(const id of state.selected){if(valid(id))keep.set(+id.split('-')[0],id)}state.selected=new Set(keep.values());for(const g of [...state.skipped]){if(g<0||g>=groups.length||picks(g).length)state.skipped.delete(g)}for(const g of [...state.discussed]){if(g<0||g>=groups.length||picks(g).length||state.skipped.has(g))state.discussed.delete(g)}}
function levelResolved(g){return picks(g).length>0||state.skipped.has(g)||state.discussed.has(g)}
function resolvedCount(){return groups.reduce((n,_,i)=>n+(levelResolved(i)?1:0),0)}
function unresolvedLevels(){return groups.map((_,i)=>i).filter(i=>!levelResolved(i))}
function notify(s){$('status').textContent=s;clearTimeout(statusTimer);statusTimer=setTimeout(()=>$('status').textContent='',4200)}
function nowISO(){return new Date().toISOString()}
function makeApplicationId(){const d=new Date(),p=n=>String(n).padStart(2,'0');let r='';try{const a=new Uint8Array(2);crypto.getRandomValues(a);r=[...a].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase()}catch{r=Math.random().toString(36).slice(2,6).toUpperCase()}return `MN-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}-${r}`}
function ensureMeta(){if(!state.applicationId)state.applicationId=makeApplicationId();if(!state.createdAt)state.createdAt=nowISO()}
function markIncomplete(){if(state.completedAt||state.sentAt){state.revision=Math.max(1,Number(state.revision)||1)+1;state.completedAt='';state.sentAt='';state.consent=false}}
function formatDateTime(v){if(!v)return'';const d=new Date(v);if(Number.isNaN(d.getTime()))return'';return d.toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}
function durationText(){if(!state.createdAt)return'';const end=state.completedAt||state.updatedAt;if(!end)return'';const ms=new Date(end)-new Date(state.createdAt);if(!Number.isFinite(ms)||ms<0)return'';const mins=Math.max(1,Math.round(ms/60000));if(mins<60)return mins+' мин';const h=Math.floor(mins/60),m=mins%60;return h+' ч'+(m?' '+m+' мин':'')}
function plannedText(){const items=[...(Array.isArray(state.planned)?state.planned:[])];if(state.plannedOther.trim())items.push(state.plannedOther.trim());return items.length?items.join(', '):'Не указано'}
function save(){
  if(!hasDraftData()&&!state.applicationId){try{localStorage.removeItem(STORE_KEY)}catch{};return}
  ensureMeta();state.updatedAt=nowISO();
  try{localStorage.setItem(STORE_KEY,JSON.stringify(snapshot()))}catch{}
  updateAutosave();
}
function updateAutosave(){const el=$('autosave-status');if(!el)return;el.textContent=state.updatedAt?'Сохранено автоматически · '+new Date(state.updatedAt).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}):'Автосохранение включено'}
function autosaveHTML(){return `<p class="autosave" id="autosave-status">${state.updatedAt?'Сохранено автоматически · '+esc(new Date(state.updatedAt).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})):'Автосохранение включено'}</p>`}
function snapshot(){return {v:6,ids:[...state.selected],skipped:[...state.skipped],discussed:[...state.discussed],notes:state.notes,skipNotes:state.skipNotes,discussNotes:state.discussNotes,name:state.name,contact:state.contact,eventDate:state.eventDate,startTime:state.startTime,endTime:state.endTime,eventType:state.eventType,venue:state.venue,guestCount:state.guestCount,audienceAge:state.audienceAge,children:state.children,childrenDetails:state.childrenDetails,guestParticipation:state.guestParticipation,activityLevel:state.activityLevel,eveningStyle:state.eveningStyle,musicLikes:state.musicLikes,musicAvoid:state.musicAvoid,humorConsent:state.humorConsent,sensitiveTopics:state.sensitiveTopics,importantGuests:state.importantGuests,surprises:state.surprises,decisionMaker:state.decisionMaker,preferredContact:state.preferredContact,contactTime:state.contactTime,existingTimeline:state.existingTimeline,coordinatorContact:state.coordinatorContact,djContact:state.djContact,mediaContact:state.mediaContact,venueContact:state.venueContact,planned:state.planned,plannedOther:state.plannedOther,wants:state.wants,avoid:state.avoid,comment:state.comment,finalQuestion:state.finalQuestion,consent:state.consent,applicationId:state.applicationId,createdAt:state.createdAt,updatedAt:state.updatedAt,completedAt:state.completedAt,sentAt:state.sentAt,revision:state.revision}}
function hasDraftData(){return Boolean(state.selected.size||state.skipped.size||state.discussed.size||state.name.trim()||state.contact.trim()||state.eventDate||state.startTime||state.eventType||state.venue.trim()||state.guestCount||state.audienceAge||state.children||state.childrenDetails.trim()||state.guestParticipation||state.activityLevel||state.eveningStyle||state.musicLikes.trim()||state.musicAvoid.trim()||state.humorConsent||state.sensitiveTopics.trim()||state.importantGuests.trim()||state.surprises.trim()||state.decisionMaker.trim()||state.preferredContact||state.contactTime||state.existingTimeline.trim()||state.coordinatorContact.trim()||state.djContact.trim()||state.mediaContact.trim()||state.venueContact.trim()||state.planned.length||state.plannedOther.trim()||state.wants.trim()||state.avoid.trim()||state.comment.trim()||state.finalQuestion.trim())}
function applySnapshot(p){
  if(!p||![1,2,3,4,5,6].includes(p.v))return false;
  state.selected=new Set();state.skipped=new Set();state.discussed=new Set();state.notes={};state.skipNotes={};state.discussNotes={};
  if(Array.isArray(p.ids))p.ids.filter(valid).forEach(id=>state.selected.add(id));
  if(p.v>=3&&Array.isArray(p.skipped))p.skipped.filter(Number.isInteger).forEach(g=>state.skipped.add(g));
  if(p.v>=6&&Array.isArray(p.discussed))p.discussed.filter(Number.isInteger).forEach(g=>state.discussed.add(g));
  state.notes=p.v>=3&&p.notes&&typeof p.notes==='object'?p.notes:{};
  state.skipNotes=p.v>=4&&p.skipNotes&&typeof p.skipNotes==='object'?p.skipNotes:{};
  state.discussNotes=p.v>=6&&p.discussNotes&&typeof p.discussNotes==='object'?p.discussNotes:{};
  const text=(k,max=1500)=>typeof p[k]==='string'?p[k].slice(0,max):'';
  state.name=text('name',120);state.contact=text('contact',160);state.eventDate=text('eventDate',10);state.startTime=text('startTime',5);state.endTime=text('endTime',5);state.eventType=text('eventType',80);state.venue=text('venue',240);state.guestCount=String(p.guestCount||'').slice(0,5);
  state.wants=text('wants');state.avoid=text('avoid');state.comment=text('comment');
  if(p.v>=5){
    state.audienceAge=text('audienceAge',80);state.children=text('children',40);state.childrenDetails=text('childrenDetails',300);state.guestParticipation=text('guestParticipation',100);state.activityLevel=text('activityLevel',100);state.eveningStyle=text('eveningStyle',100);state.musicLikes=text('musicLikes',800);state.musicAvoid=text('musicAvoid',800);state.humorConsent=text('humorConsent',100);state.sensitiveTopics=text('sensitiveTopics',1000);state.importantGuests=text('importantGuests',1000);state.surprises=text('surprises',1000);state.decisionMaker=text('decisionMaker',300);state.planned=Array.isArray(p.planned)?p.planned.filter(x=>plannedOptions.includes(x)):[];state.plannedOther=text('plannedOther',500);state.applicationId=text('applicationId',80);state.createdAt=text('createdAt',40);state.updatedAt=text('updatedAt',40);state.completedAt=text('completedAt',40);
  }
  if(p.v>=6){state.preferredContact=text('preferredContact',80);state.contactTime=text('contactTime',80);state.existingTimeline=text('existingTimeline',2000);state.coordinatorContact=text('coordinatorContact',300);state.djContact=text('djContact',300);state.mediaContact=text('mediaContact',300);state.venueContact=text('venueContact',300);state.finalQuestion=text('finalQuestion',1500);state.consent=Boolean(p.consent);state.sentAt=text('sentAt',40);state.revision=Math.max(1,Number(p.revision)||1)}else{state.revision=1;state.sentAt='';state.consent=false}
  normalizeSelections();if(state.selected.size||state.skipped.size||state.discussed.size)state.seen.add('started');return true;
}
function restore(){try{const p=JSON.parse(localStorage.getItem(STORE_KEY)||'null');if(!applySnapshot(p))return false;draftFound=hasDraftData();return draftFound}catch{return false}}
function clearState(){
  Object.assign(state,{screen:'intro',level:0,index:0,selected:new Set(),skipped:new Set(),discussed:new Set(),seen:new Set(),done:new Set(),notes:{},skipNotes:{},discussNotes:{},name:'',contact:'',eventDate:'',startTime:'',endTime:'',eventType:'',venue:'',guestCount:'',audienceAge:'',children:'',childrenDetails:'',guestParticipation:'',activityLevel:'',eveningStyle:'',musicLikes:'',musicAvoid:'',humorConsent:'',sensitiveTopics:'',importantGuests:'',surprises:'',decisionMaker:'',preferredContact:'',contactTime:'',existingTimeline:'',coordinatorContact:'',djContact:'',mediaContact:'',venueContact:'',planned:[],plannedOther:'',wants:'',avoid:'',comment:'',finalQuestion:'',consent:false,applicationId:'',createdAt:'',updatedAt:'',completedAt:'',sentAt:'',revision:1,returnFromDetails:''});
  draftFound=false;readOnlyMode=false;try{localStorage.removeItem(STORE_KEY)}catch{}
}
function resetAll(){if(!confirm('Очистить анкету, все выбранные конкурсы и комментарии?'))return;clearState();render();scrollTopNow();notify('Анкета очищена. Можно начать заново.')}
function minutes(t){const m=/^(\d{1,2}):(\d{2})$/.exec(t||'');return m?Math.min(23,Math.max(0,+m[1]))*60+Math.min(59,Math.max(0,+m[2])):null}
function clock(n){n=((n%1440)+1440)%1440;return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
function formatDate(d){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||'');return m?m[3]+'.'+m[2]+'.'+m[1]:(d||'')}
function shiftedRange(range){const start=minutes(state.startTime);if(start===null)return'';const m=/(\d{1,2}:\d{2})\s*[—-]\s*(\d{1,2}:\d{2})/.exec(range||'');if(!m)return'';const base=18*60,from=minutes(m[1])-base,to=minutes(m[2])-base;return clock(start+from)+' — '+clock(start+to)}
function questionnaireStatus(){return state.sentAt?'Передана Максиму':state.completedAt?'Заполнена':hasDraftData()?'В процессе':'Не начата'}
function discussNoteField(g){return `<div class="choice-note"><label class="field" for="discuss-note-${g}">Что хотите обсудить с Максимом? <span class="muted">(необязательно)</span></label><textarea id="discuss-note-${g}" data-discuss-note="${g}" maxlength="600" rows="2" placeholder="Например: не уверены, что лучше подойдёт нашей компании">${esc(state.discussNotes[g]||'')}</textarea></div>`}
function timelineEntries(){const rows=[];if(state.startTime)rows.push({time:state.startTime,title:'Начало мероприятия',note:'Ориентир, указанный заказчиком'});groups.forEach((g,i)=>{const list=picks(i),time=shiftedRange(g.time);if(list.length)rows.push({time:time||'—',title:list[0].item[0],note:g.name});else if(state.discussed.has(i))rows.push({time:time||'—',title:'Блок уточнить с Максимом',note:g.name});});if(state.endTime)rows.push({time:state.endTime,title:'Ориентировочное окончание',note:'По данным заказчика'});return rows}
function timelineHTML(){const rows=timelineEntries();if(!rows.length)return '<p class="muted">Укажите время начала, чтобы появился ориентировочный тайминг.</p>';return '<div class="timeline-list">'+rows.map(r=>`<div class="timeline-row"><div class="timeline-time">${esc(r.time)}</div><div><p><strong>${esc(r.title)}</strong></p><p class="muted">${esc(r.note)}</p></div></div>`).join('')+'</div><p class="fine">Это черновой ориентир. Паузы, банкетные подачи, поздравления, шоу и точный порядок Максим согласует отдельно.</p>'}
function timelineText(){const rows=timelineEntries();if(!rows.length)return 'Не сформирован';return rows.map(r=>r.time+' — '+r.title+' ('+r.note+')').join('\n')}
function pickedList(g,withNote=false){const list=picks(g);if(!list.length)return'';return '<ul class="picked-list">'+list.map(x=>`<li><span>${esc(x.item[0])}</span><button class="remove" data-remove="${x.id}" aria-label="Убрать ${esc(x.item[0])}">×</button></li>${withNote?`<div class="choice-note"><label class="field" for="note-${x.id}">Комментарий к этому конкурсу <span class="muted">(необязательно)</span></label><textarea id="note-${x.id}" data-note="${x.id}" maxlength="600" rows="2" placeholder="Например: хотим этот формат, но без выхода гостей на сцену">${esc(state.notes[x.id]||'')}</textarea></div>`:''}`).join('')+'</ul>'}
function skipNoteField(g){return `<div class="choice-note"><label class="field" for="skip-note-${g}">Почему пропускаете этот блок? <span class="muted">(необязательно)</span></label><textarea id="skip-note-${g}" data-skip-note="${g}" maxlength="600" rows="2" placeholder="Например: не хотим музыкальные конкурсы вообще">${esc(state.skipNotes[g]||'')}</textarea></div>`}
function steps(){return '<nav class="steps" aria-label="Уровни">'+titles.map((t,i)=>`<button class="step ${i===state.level?'active':''} ${levelResolved(i)?'done':''}" data-level="${i}" ${i===state.level?'aria-current="step"':''}><span>0${i+1}${levelResolved(i)?' · заполнен':''}</span>${t}</button>`).join('')+'</nav>'}
function go(screen,focus=true){state.screen=screen;render();if(focus){scrollTopNow();const h=document.querySelector('#screen h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}}
function openLevel(g){state.level=Math.max(0,Math.min(groups.length-1,g));state.index=0;go('play')}
function requiredDetails(){return [{id:'event-type',label:'формат мероприятия',ok:Boolean(state.eventType)},{id:'event-date',label:'дату мероприятия',ok:Boolean(state.eventDate)},{id:'start-time',label:'время начала',ok:Boolean(state.startTime)},{id:'guest-count',label:'количество гостей',ok:Boolean(state.guestCount&&+state.guestCount>0)},{id:'person',label:'ваше имя',ok:Boolean(state.name.trim())},{id:'contact',label:'контакт для связи',ok:Boolean(state.contact.trim())}]}
function validateDetails(){const missing=requiredDetails().filter(x=>!x.ok);document.querySelectorAll('[aria-invalid="true"]').forEach(x=>x.removeAttribute('aria-invalid'));if(!missing.length)return true;missing.forEach(x=>$(x.id)?.setAttribute('aria-invalid','true'));notify('Заполните обязательные поля: '+missing.map(x=>x.label).join(', ')+'.');$(missing[0].id)?.focus();return false}
function continueDraft(){closeModal('draft-dialog');const missingDetails=requiredDetails().filter(x=>!x.ok);if(missingDetails.length){go('details');notify('Сначала дополните обязательные данные мероприятия.');return}if((state.completedAt||state.sentAt)&&resolvedCount()){go('finish');return}if(state.selected.size||state.skipped.size||state.discussed.size){const missing=unresolvedLevels();if(!missing.length)go('confirm');else openLevel(missing[0])}else go('details')}
function showDraftDialog(){if(!draftFound||loadedFromLink||!$('draft-dialog'))return;setTimeout(()=>openModal('draft-dialog'),80)}
function finishAttempt(){
  const missingDetails=requiredDetails().filter(x=>!x.ok);
  if(missingDetails.length){state.returnFromDetails='';go('details');setTimeout(()=>validateDetails(),0);return}
  const missing=unresolvedLevels();
  if(missing.length){openLevel(missing[0]);notify('Примите решение по каждому блоку: выбрать конкурс, пропустить или обсудить с Максимом.');return}
  go('confirm');
}
function optionTags(values,current){return values.map(x=>`<option value="${esc(x)}" ${current===x?'selected':''}>${esc(x)}</option>`).join('')}
function plannedHTML(){return `<div class="checkbox-grid">${plannedOptions.map(x=>`<label class="check-option"><input type="checkbox" data-planned="${esc(x)}" ${state.planned.includes(x)?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div>`}
function render(){
  $('count').textContent=state.selected.size;
  let out='';const g=groups[state.level];
  document.body.classList.toggle('intro-screen',state.screen==='intro');
  if(state.screen==='intro'){
    out=`<section class="clean-intro indie-hero">
      <div class="indie-world" aria-hidden="true">
        <div class="paper-grain"></div>
        <div class="red-wave red-wave-a"></div>
        <div class="red-wave red-wave-b"></div>
        <div class="red-wave red-wave-c"></div>

        <div class="megaphone-wrap">
          <svg class="megaphone" viewBox="0 0 220 180" role="presentation">
            <path class="mega-body" d="M22 92 L116 46 L149 64 L128 118 L29 131 Z"/>
            <path class="mega-mouth" d="M121 46 C151 38 185 45 202 71 C211 85 207 103 194 116 C174 135 145 129 124 118 C138 94 137 69 121 46Z"/>
            <path class="mega-inner" d="M139 59 C160 57 181 63 191 77 C197 86 194 96 187 103 C176 114 158 112 143 105 C150 90 149 74 139 59Z"/>
            <path class="mega-handle" d="M68 121 L92 116 L103 159 L79 165 Z"/>
            <path class="mega-glint" d="M44 83 C69 72 91 60 108 55"/>
          </svg>
          <span class="mega-ray ray-1"></span><span class="mega-ray ray-2"></span><span class="mega-ray ray-3"></span>
        </div>

        <div class="sound-stream">
          <i class="particle p-star">★</i><i class="particle p-heart">♥</i><i class="particle p-dot"></i>
          <i class="particle p-spark">✦</i><i class="particle p-pill"></i><i class="particle p-heart">♥</i>
          <i class="particle p-star">★</i><i class="particle p-dot"></i><i class="particle p-spark">✦</i>
        </div>

        <svg class="cloud cloud-a" viewBox="0 0 180 90"><path d="M22 69c-17-2-20-24-5-31 5-18 30-23 42-10 10-26 48-27 61-4 21-7 43 10 40 31-2 17-16 24-33 23H38c-6 0-11-3-16-9Z"/></svg>
        <svg class="cloud cloud-b" viewBox="0 0 180 90"><path d="M22 69c-17-2-20-24-5-31 5-18 30-23 42-10 10-26 48-27 61-4 21-7 43 10 40 31-2 17-16 24-33 23H38c-6 0-11-3-16-9Z"/></svg>
        <svg class="cloud cloud-c" viewBox="0 0 180 90"><path d="M22 69c-17-2-20-24-5-31 5-18 30-23 42-10 10-26 48-27 61-4 21-7 43 10 40 31-2 17-16 24-33 23H38c-6 0-11-3-16-9Z"/></svg>

        <div class="doodle heart heart-a">♥</div><div class="doodle heart heart-b">♥</div>
        <div class="doodle star star-a">★</div><div class="doodle star star-b">★</div><div class="doodle star star-c">★</div>
        <div class="doodle lightning">ϟ</div>
        <div class="doodle loop-line loop-a"></div><div class="doodle loop-line loop-b"></div>

        <div class="disco-rig">
          <span class="disco-cord"></span>
          <div class="disco-swing">
            <div class="disco-ball">
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <i class="disco-glint glint-a"></i><i class="disco-glint glint-b"></i><i class="disco-glint glint-c"></i>
        </div>
      </div>

      <svg class="photo-motion-layer" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <clipPath id="discoClip"><circle cx="1517" cy="184" r="100"/></clipPath>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <path id="topFlight" d="M970 110 C1080 72 1190 84 1288 138 C1340 166 1383 170 1430 158"/>
          <path id="leftFlight" d="M190 510 C235 474 275 478 318 510 C350 534 382 534 417 515"/>
          <path id="orbitOne" d="M 1518 184 m -96 0 a 96 96 0 1 1 192 0 a 96 96 0 1 1 -192 0"/>
          <path id="orbitTwo" d="M 1518 184 m -132 0 a 132 132 0 1 1 264 0 a 132 132 0 1 1 -264 0"/>
        </defs>

        <defs>
          <clipPath id="original-ball-cutout"><circle cx="1546" cy="200" r="108"/></clipPath>
          <clipPath id="original-ball-paper"><circle cx="1546" cy="200" r="112"/><rect x="1524" y="0" width="19" height="118"/></clipPath>
        </defs>
        <g clip-path="url(#original-ball-paper)">
          <image href="assets/intro-doodle-bg.png" x="650" y="-180" width="1672" height="941"/>
        </g>
        <path class="original-ball-cord" d="M1531 0 Q1533 60 1536 115" fill="none" stroke="#151515" stroke-width="6" stroke-linecap="round"/>
        <g class="original-ball-motion">
          <g clip-path="url(#original-ball-cutout)"><image href="assets/intro-doodle-bg.png" width="1672" height="941"/></g>
        </g>

        <g class="disco-effects">
          <g clip-path="url(#discoClip)" opacity=".34">
            <rect class="disco-sweep sweep-a" x="1398" y="40" width="20" height="300" rx="10" fill="#fff" transform="rotate(18 1517 184)"/>
            <rect class="disco-sweep sweep-b" x="1430" y="42" width="7" height="300" rx="4" fill="#fff" transform="rotate(18 1517 184)"/>
          </g>
          <g class="disco-twinkle twinkle-1" filter="url(#softGlow)"><path d="M1610 101v28M1596 115h28"/><path d="M1601 106l18 18M1619 106l-18 18"/></g>
          <g class="disco-twinkle twinkle-2"><path d="M1390 211v24M1378 223h24"/></g>
          <g class="disco-twinkle twinkle-3"><path d="M1586 304v19M1577 313h18"/></g>
          <circle class="disco-ping ping-1" cx="1518" cy="184" r="108"/>
          <circle class="disco-ping ping-2" cx="1518" cy="184" r="120"/>
        </g>

        <g class="cloud-overlays">
          <path class="cloud-drift cloud-a-ghost" d="M18 57c31-27 84-25 111 1c12-9 34-12 50-5c19 8 29 22 31 37c22 4 34 14 34 30c0 20-19 33-47 33H71C25 153 0 137 0 109c0-20 9-36 18-52z"/>
          <path class="cloud-drift cloud-b-ghost" d="M1202 83c17-15 42-18 61-10c15-23 47-33 74-23c20 8 35 24 39 42c16 1 32 6 42 17c9 11 12 25 8 38c-6 20-29 31-57 31h-122c-45 0-71-16-71-44c0-21 12-39 26-51z"/>
          <path class="cloud-drift cloud-c-ghost" d="M1484 431c14-15 38-22 59-18c10-20 34-31 60-29c33 3 58 25 62 52c21 1 38 8 48 22c9 14 10 29 3 44c-8 18-28 28-55 28h-120c-50 0-78-18-78-49c0-20 8-36 21-50z"/>
        </g>

        <g class="orbit-effects">
          <path class="orbit-stroke" d="M 1518 184 m -96 0 a 96 96 0 1 1 192 0 a 96 96 0 1 1 -192 0"/>
          <path class="orbit-stroke" d="M 1518 184 m -132 0 a 132 132 0 1 1 264 0 a 132 132 0 1 1 -264 0"/>
          <circle class="orbit-spark core-yellow" r="8">
            <animateMotion dur="6.8s" repeatCount="indefinite" rotate="auto"><mpath href="#orbitOne"/></animateMotion>
            <animate attributeName="opacity" values=".2;1;1;.2" dur="6.8s" repeatCount="indefinite"/>
          </circle>
          <circle class="orbit-spark core-red" r="6">
            <animateMotion dur="5.6s" begin="-1.4s" repeatCount="indefinite" rotate="auto"><mpath href="#orbitOne"/></animateMotion>
            <animate attributeName="opacity" values=".15;1;1;.15" dur="5.6s" begin="-1.4s" repeatCount="indefinite"/>
          </circle>
          <circle class="orbit-spark core-blue" r="7">
            <animateMotion dur="9.3s" begin="-2.7s" repeatCount="indefinite" rotate="auto"><mpath href="#orbitTwo"/></animateMotion>
            <animate attributeName="opacity" values=".1;1;1;.1" dur="9.3s" begin="-2.7s" repeatCount="indefinite"/>
          </circle>
        </g>

        <g class="megaphone-effects">
          <path class="sound-ray ray-a" d="M175 417 L228 388"/>
          <path class="sound-ray ray-b" d="M188 456 L250 451"/>
          <path class="sound-ray ray-c" d="M176 494 L232 527"/>
          <g class="emit emit-1"><polygon points="218,400 226,416 244,418 231,430 235,448 218,439 202,448 205,430 192,418 210,416"/></g>
          <g class="emit emit-2"><path d="M210 474 C196 460 176 477 184 493 C191 507 210 517 210 517 C210 517 230 506 236 491 C243 474 223 460 210 474Z"/></g>
          <g class="emit emit-3"><ellipse cx="209" cy="546" rx="18" ry="8"/></g>
          <g class="emit emit-4"><path d="M220 430l14-5M224 441l17 5M215 452l7 14"/></g>
          <g class="emit emit-5"><circle cx="206" cy="522" r="7"/></g>
        </g>

        <g class="accent-pulses">
          <g class="heart-beat"><path d="M1129 63l10-16M1140 72l18-7M1134 86l15 9"/></g>
          <g class="left-star-beat"><path d="M116 246l15-10M122 263l20 1M116 280l15 11"/></g>
          <g class="right-star-beat"><path d="M1596 653l18-11M1602 671l21 2M1595 688l15 13"/></g>
          <g class="cloud-spark spark-a"><circle cx="347" cy="256" r="5"/><circle cx="365" cy="272" r="3"/></g>
          <g class="cloud-spark spark-b"><circle cx="1332" cy="124" r="4"/><circle cx="1350" cy="136" r="3"/></g>
        </g>

        <g class="star-glow left-star-glow"><path d="M132 217v26M119 230h26"/><path d="M123 221l18 18M141 221l-18 18"/></g>
        <g class="star-glow right-star-glow"><path d="M1597 614v30M1582 629h30"/><path d="M1587 619l20 20M1607 619l-20 20"/></g>
        <g class="heart-aura"><path d="M1120 74l16-23M1137 69l20-2M1143 82l12 15"/></g>

        <g class="route-runners">
          <circle class="runner runner-top" r="5" fill="#151515">
            <animateMotion dur="7.2s" repeatCount="indefinite" rotate="auto"><mpath href="#topFlight"/></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.82;1" dur="7.2s" repeatCount="indefinite"/>
          </circle>
          <circle class="runner runner-left" r="5" fill="#ef2d32">
            <animateMotion dur="5.8s" begin="-2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#leftFlight"/></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.8;1" dur="5.8s" begin="-2.1s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>

      <div class="clean-intro-inner indie-copy">
        <p class="clean-kicker">ВЕДУЩИЙ ВАШЕГО МЕРОПРИЯТИЯ</p>
        <h1>Максим<br><span>Никиткин</span></h1>
        <p class="clean-lead">Соберите программу вечера под себя — легко, без шаблонов и скучных анкет.</p>
        <button class="primary indie-start" data-action="start"><span>Начать</span><b aria-hidden="true">↗</b></button>
      </div>
    </section>`;
  }
  if(state.screen==='details'){
    out=`<section class="finish"><div class="back-row"><button class="link" data-action="back">← Назад</button><button class="link" data-action="reset">Начать заново</button></div><p class="eyebrow">Шаг 1 · О мероприятии</p><h1>Расскажите немного о вашем вечере</h1><p class="muted">Поля со звёздочкой обязательны. Остальные вопросы помогут Максиму точнее подобрать формат и заранее учесть особенности гостей.</p><div class="brief-visual-strip" aria-hidden="true"><span>DATE / PLACE</span><span>PEOPLE</span><span>VIBE</span><span>DETAILS</span><span>CONTACT</span></div>${autosaveHTML()}
    <div class="form-fields">
      <section class="brief-section"><h2><span class="section-mark">01</span>Основные данные</h2><div class="form-grid">
        <div><label class="field" for="event-type">Формат мероприятия *</label><select id="event-type" required><option value="">Выберите формат</option>${optionTags(['Свадьба','Корпоратив','Юбилей','День рождения','Выпускной','Частное мероприятие','Другое'],state.eventType)}</select></div>
        <div><label class="field" for="event-date">Дата мероприятия *</label><input type="date" id="event-date" required value="${esc(state.eventDate)}"></div>
        <div><label class="field" for="start-time">Время начала *</label><input type="time" id="start-time" required value="${esc(state.startTime)}"></div>
        <div><label class="field" for="end-time">Примерное время окончания</label><input type="time" id="end-time" value="${esc(state.endTime)}"></div>
        <div><label class="field" for="guest-count">Количество гостей *</label><input type="number" id="guest-count" required min="1" max="9999" inputmode="numeric" placeholder="Например, 60" value="${esc(state.guestCount)}"></div>
        <div><label class="field" for="person">Ваше имя *</label><input type="text" id="person" required maxlength="120" placeholder="Как к вам обращаться" value="${esc(state.name)}"></div>
        <div class="field-wide"><label class="field" for="venue">Место проведения</label><input type="text" id="venue" maxlength="240" placeholder="Название площадки или адрес, если уже известны" value="${esc(state.venue)}"></div>
        <div class="field-wide"><label class="field" for="contact">Телефон или Telegram *</label><input type="text" id="contact" required maxlength="160" placeholder="Чтобы Максим мог связаться по программе" value="${esc(state.contact)}"></div>
      </div></section>
      <section class="brief-section"><h2><span class="section-mark">02</span>Гости и вовлечение</h2><div class="form-grid">
        <div><label class="field" for="audience-age">Основная аудитория</label><select id="audience-age"><option value="">Не выбрано</option>${optionTags(['18–25 лет','25–35 лет','35–50 лет','50+','Смешанная компания'],state.audienceAge)}</select></div>
        <div><label class="field" for="children">Будут ли дети?</label><select id="children"><option value="">Не выбрано</option>${optionTags(['Нет','Да','Пока не знаем'],state.children)}</select></div>
        <div class="field-wide"><label class="field" for="children-details">Если будут дети — сколько и примерно какого возраста?</label><input type="text" id="children-details" maxlength="300" placeholder="Например: 6 детей, 5–12 лет" value="${esc(state.childrenDetails)}"></div>
        <div><label class="field" for="guest-participation">Выход гостей и активное участие</label><select id="guest-participation"><option value="">Не выбрано</option>${optionTags(['Да, можно активно вовлекать','Умеренно, без давления','Лучше без выхода гостей','По ситуации'],state.guestParticipation)}</select></div>
        <div><label class="field" for="activity-level">Желаемый уровень активности</label><select id="activity-level"><option value="">Не выбрано</option>${optionTags(['Спокойно','Умеренно','Активно','Максимально драйвово','Смешанный формат'],state.activityLevel)}</select></div>
      </div></section>
      <section class="brief-section"><h2><span class="section-mark">03</span>Стиль вечера</h2><div class="form-grid">
        <div><label class="field" for="evening-style">Какой стиль ближе?</label><select id="evening-style"><option value="">Не выбрано</option>${optionTags(['Лёгкий и ненавязчивый','Весёлый и активный','Интеллигентный','Максимально драйвовый','Смешанный'],state.eveningStyle)}</select></div>
        <div><label class="field" for="humor-consent">Юмор про гостей</label><select id="humor-consent"><option value="">Не выбрано</option>${optionTags(['Можно','Можно аккуратно','Лучше не надо','Только после согласования'],state.humorConsent)}</select></div>
        <div class="field-wide"><label class="field" for="music-likes">Какая музыка нравится?</label><textarea id="music-likes" maxlength="800" rows="2" placeholder="Исполнители, жанры, эпохи, любимые песни">${esc(state.musicLikes)}</textarea></div>
        <div class="field-wide"><label class="field" for="music-avoid">Что из музыки точно не ставить?</label><textarea id="music-avoid" maxlength="800" rows="2" placeholder="Исполнители, жанры или конкретные песни">${esc(state.musicAvoid)}</textarea></div>
        <div class="field-wide"><label class="field" for="sensitive-topics">Темы, которые нельзя затрагивать</label><textarea id="sensitive-topics" maxlength="1000" rows="2" placeholder="Например: возраст, работа, бывшие отношения, конкретные истории…">${esc(state.sensitiveTopics)}</textarea></div>
      </div></section>
      <section class="brief-section"><h2><span class="section-mark">04</span>Что важно учесть</h2><div class="form-grid">
        <div class="field-wide"><label class="field" for="important-guests">Важные гости</label><textarea id="important-guests" maxlength="1000" rows="2" placeholder="Кого особенно важно учитывать: родители, руководство, молодожёны, юбиляр…">${esc(state.importantGuests)}</textarea></div>
        <div class="field-wide"><label class="field" for="surprises">Сюрпризы от гостей или организаторов</label><textarea id="surprises" maxlength="1000" rows="2" placeholder="Что уже известно и что нужно встроить в программу">${esc(state.surprises)}</textarea></div>
        <div class="field-wide"><label class="field">Что уже запланировано?</label>${plannedHTML()}</div>
        <div class="field-wide"><label class="field" for="planned-other">Что ещё уже запланировано?</label><input type="text" id="planned-other" maxlength="500" placeholder="Можно добавить свой вариант" value="${esc(state.plannedOther)}"></div>
        <div class="field-wide"><label class="field" for="decision-maker">Кто принимает финальные решения по программе?</label><input type="text" id="decision-maker" maxlength="300" placeholder="Например: я / мы вдвоём / HR / руководитель" value="${esc(state.decisionMaker)}"></div>
      </div></section>
      <section class="brief-section"><h2><span class="section-mark">05</span>Связь и команда</h2><div class="form-grid">
        <div><label class="field" for="preferred-contact">Как удобнее связаться?</label><select id="preferred-contact"><option value="">Не выбрано</option>${optionTags(['Telegram','WhatsApp','Звонок','Без разницы'],state.preferredContact)}</select></div>
        <div><label class="field" for="contact-time">Когда удобно связаться?</label><select id="contact-time"><option value="">Не выбрано</option>${optionTags(['Утром','Днём','Вечером','В любое время'],state.contactTime)}</select></div>
        <div class="field-wide"><label class="field" for="coordinator-contact">Организатор / координатор</label><input type="text" id="coordinator-contact" maxlength="300" placeholder="Имя и контакт, если есть" value="${esc(state.coordinatorContact)}"></div>
        <div class="field-wide"><label class="field" for="dj-contact">DJ / звук</label><input type="text" id="dj-contact" maxlength="300" placeholder="Имя и контакт, если уже известны" value="${esc(state.djContact)}"></div>
        <div class="field-wide"><label class="field" for="media-contact">Фотограф / видеограф</label><input type="text" id="media-contact" maxlength="300" placeholder="Имя и контакт, если есть" value="${esc(state.mediaContact)}"></div>
        <div class="field-wide"><label class="field" for="venue-contact">Контакт площадки</label><input type="text" id="venue-contact" maxlength="300" placeholder="Менеджер площадки, банкетная служба и т. п." value="${esc(state.venueContact)}"></div>
        <div class="field-wide"><label class="field" for="existing-timeline">Есть ли уже тайминг от площадки или организатора?</label><textarea id="existing-timeline" maxlength="2000" rows="4" placeholder="Можно вставить сюда черновой тайминг или основные временные точки">${esc(state.existingTimeline)}</textarea></div>
      </div></section>
    </div>
    <div class="button-row"><button class="primary" data-action="begin-choice">${state.returnFromDetails==='finish'?'Сохранить и вернуться к программе →':state.selected.size||state.skipped.size?'Сохранить и вернуться к выбору →':'Перейти к выбору программы →'}</button></div>
    <p class="fine">Время окончания, площадку и дополнительные ответы можно заполнить позже. Все данные сохраняются автоматически в этом браузере.</p></section>`;
  }
  if(state.screen==='play'){
    const resolved=resolvedCount();
    out=`<div class="selection-layout"><section class="options-panel level-${state.level+1}"><div class="back-row"><button class="link" data-action="back">← Назад</button><button class="link" data-action="reset">Начать заново</button></div>${steps()}<div class="level-heading"><div><p class="eyebrow">Уровень 0${state.level+1} из 04</p><h1>${titles[state.level]}</h1></div><span class="progress">Заполнено ${resolved} из 4</span></div><p class="muted">${esc(g.description)} Выберите один вариант. Если не уверены, можно пропустить блок или оставить решение Максиму.</p><div class="level-visual-ribbon" aria-hidden="true"><span>CHOOSE ONE</span><b>✦</b><span>YOUR VIBE</span><b>↘</b><span>NO RANDOM</span></div><div class="options-grid">${g.items.map((item,i)=>{const id=state.level+'-'+i,on=state.selected.has(id);return `<article class="option-card reveal-card ${on?'is-selected':''}" data-option-card tabindex="0" aria-label="${esc(item[0])}. Наведите курсор или нажмите, чтобы увидеть описание."><h2 class="option-title">${esc(item[0])}</h2><div class="option-details"><div class="activity-meta"><span class="option-number">${String(i+1).padStart(2,'0')}</span><span class="tag">${esc(item[2])}</span></div><p class="option-description">${esc(item[1])}</p>${item[3]?`<p class="notice">${esc(item[3])}</p>`:''}<button class="option-select" data-toggle="${id}" aria-pressed="${on}"><span aria-hidden="true">${on?'✓':'+'}</span>${on?'В вашей программе':'Хочу в программу'}</button></div></article>`}).join('')}</div><div class="resolution-row"><button class="secondary" data-action="skip-level">${state.skipped.has(state.level)?'✓ Блок пропускаем':'Пропустить этот уровень'}</button><button class="secondary" data-action="discuss-level">${state.discussed.has(state.level)?'✓ Обсудим с Максимом':'Решим вместе с Максимом'}</button></div>${state.skipped.has(state.level)?skipNoteField(state.level):state.discussed.has(state.level)?discussNoteField(state.level):''}<div class="button-row"><button class="primary" data-action="advance">${state.level===3?'Перейти к проверке':'Следующий уровень →'}</button></div>${autosaveHTML()}</section><aside class="live-plan"><div class="plan-title"><h2>Ваш вечер</h2><span>${resolved}/4</span></div><p class="plan-caption">Одно решение в каждом блоке</p><div class="plan-dots" aria-label="Прогресс">${[0,1,2,3].map(i=>`<span class="${levelResolved(i)?'on':''}"></span>`).join('')}</div>${groups.map((group,i)=>`<section class="plan-group"><span class="plan-level">УРОВЕНЬ 0${i+1}</span><h3>${esc(group.name)}</h3>${picks(i).length?'<ul>'+picks(i).map(x=>`<li><span>${esc(x.item[0])}</span><button data-remove="${x.id}" aria-label="Убрать ${esc(x.item[0])}">×</button></li>`).join('')+'</ul>':state.skipped.has(i)?`<p>Пропускаем этот блок${state.skipNotes[i]?' · есть комментарий':''}</p>`:state.discussed.has(i)?`<p>Решим вместе с Максимом${state.discussNotes[i]?' · есть комментарий':''}</p>`:'<p>Пока не решено</p>'}</section>`).join('')}<button class="primary" data-action="finish">Проверить программу</button><button class="link" data-action="reset">Начать заново</button><p class="plan-caption">Выбрано конкурсов: ${state.selected.size}. Заполнено блоков: ${resolved} из 4.</p></aside></div>`;
  }
  if(state.screen==='confirm'){
    const discussed=state.discussed.size,skipped=state.skipped.size;
    out=`<section class="finish"><div class="back-row"><button class="link" data-action="confirm-back">← Вернуться к выбору</button><button class="link" data-action="edit-details">Изменить анкету</button></div><p class="eyebrow">Финальная проверка</p><h1>Всё верно?</h1><p class="muted">Проверьте основные данные и черновой тайминг. После подтверждения откроется готовая карточка, которую можно отправить Максиму.</p><div class="confirm-banner" aria-hidden="true"><span>FINAL CHECK</span><strong>YOUR NIGHT</strong><i>✓</i></div>${autosaveHTML()}<div class="event-summary"><p><strong>${esc(state.eventType||'Мероприятие')}</strong>${state.eventDate?' · '+esc(formatDate(state.eventDate)):''}</p><p>${esc(state.name||'Заказчик')} · ${esc(state.contact||'контакт не указан')}</p><p>Начало: ${esc(state.startTime||'—')}${state.endTime?' · окончание '+esc(state.endTime):''} · гостей: ${esc(state.guestCount||'—')}</p><p>Выбрано: ${state.selected.size} · пропущено: ${skipped} · обсудим с Максимом: ${discussed}</p><p>ID: ${esc(state.applicationId||'—')} · версия ${Math.max(1,Number(state.revision)||1)}</p></div><section class="result-section"><h2>Ваш выбор</h2><ul class="compact-list">${groups.map((group,i)=>{const list=picks(i);return `<li><strong>${esc(group.name)}:</strong> ${list.length?esc(list[0].item[0]):state.skipped.has(i)?'пропускаем':'решим вместе с Максимом'}</li>`}).join('')}</ul></section><section class="result-section"><h2>Предварительный тайминг</h2>${timelineHTML()}${state.existingTimeline.trim()?`<p><strong>Тайминг от заказчика / площадки:</strong></p><p class="muted">${esc(state.existingTimeline).replace(/\n/g,'<br>')}</p>`:''}</section><section class="result-section"><h2>Последние пожелания</h2><div class="form-fields"><label class="field" for="wants">Что точно хочется на мероприятии?</label><textarea id="wants" maxlength="1500" rows="3" placeholder="Например: больше музыки, вовлечение всей команды, лёгкий юмор…">${esc(state.wants)}</textarea><label class="field" for="avoid">Чего точно не должно быть?</label><textarea id="avoid" maxlength="1500" rows="3" placeholder="Например: без пошлых конкурсов, без принуждения выходить на сцену…">${esc(state.avoid)}</textarea><label class="field" for="comment">Дополнительные пожелания</label><textarea id="comment" maxlength="1500" rows="3" placeholder="Любые детали, которые важно учесть">${esc(state.comment)}</textarea><label class="field" for="final-question">Есть ли что-то важное, о чём Максим должен знать?</label><textarea id="final-question" maxlength="1500" rows="3" placeholder="Можно написать то, что не подошло ни к одному вопросу выше">${esc(state.finalQuestion)}</textarea></div></section><label class="consent-box"><input type="checkbox" id="consent" ${state.consent?'checked':''}><span>Я подтверждаю, что данные в анкете можно передать Максиму Никиткину для подготовки и связи по этому мероприятию.</span></label><div class="button-row"><button class="secondary" data-action="confirm-back">Проверить ещё раз</button><button class="primary" data-action="confirm-finish">Подтвердить программу →</button></div></section>`;
  }
    if(state.screen==='finish'){
    const resolved=resolvedCount(),planned=plannedText(),status=questionnaireStatus();
    if(readOnlyMode){
      out=`<section class="finish"><div class="readonly-note"><strong>Режим просмотра</strong><p class="muted">Эта ссылка показывает сохранённую версию анкеты без редактирования.</p></div><p class="eyebrow">${esc(status)} · версия ${Math.max(1,Number(state.revision)||1)}</p><h1>${esc(state.eventType||'Мероприятие')}${state.eventDate?' · '+esc(formatDate(state.eventDate)):''}</h1><div class="event-summary"><p>Заказчик: ${esc(state.name||'не указан')} · ${esc(state.contact||'контакт не указан')}</p><p>Начало: ${esc(state.startTime||'—')}${state.endTime?' · окончание '+esc(state.endTime):''} · гостей: ${esc(state.guestCount||'—')}</p><p>Место: ${esc(state.venue||'не указано')}</p><p>ID: ${esc(state.applicationId||'—')}</p></div><section class="result-section"><h2>Выбранная программа</h2><ul class="compact-list">${groups.map((group,i)=>{const list=picks(i);return `<li><strong>${esc(group.name)}:</strong> ${list.length?esc(list[0].item[0]):state.skipped.has(i)?'пропускаем':'решим вместе с Максимом'}</li>`}).join('')}</ul></section><section class="result-section"><h2>Предварительный тайминг</h2>${timelineHTML()}</section><div class="button-row"><button class="primary" data-action="pdf">Сохранить PDF / печать</button><button class="secondary" data-action="copy-full">Скопировать полную версию</button></div><p class="fine">Финальный сценарий и точный тайминг согласуются с Максимом Никиткиным · ${MAXIM_PHONE_DISPLAY}.</p></section>`;
    }else{
      out=`<section class="finish"><div class="back-row"><button class="link" data-action="back">← Назад к выбору</button><button class="link" data-action="reset">Начать заново</button></div><p class="eyebrow">Ваша программа · заполнено ${resolved} из 4 блоков</p><h1>Ваш вечер собран!</h1><p class="muted">Это предварительные пожелания. Максим адаптирует порядок, длительность и механику под площадку и гостей.</p><div class="final-visual-banner" aria-hidden="true"><span>EVENT SHEET</span><b>MAXIM NIKITKIN</b><em>YOUR NIGHT / YOUR RULES</em></div>${autosaveHTML()}<div class="event-summary event-cover"><p><span class="status-pill">${esc(status)}</span></p><p><strong>${esc(state.eventType||'Формат не указан')}</strong>${state.eventDate?' · '+esc(formatDate(state.eventDate)):''}</p><p>ID анкеты: <strong>${esc(state.applicationId||'—')}</strong> · версия ${Math.max(1,Number(state.revision)||1)}</p><p>Заказчик: ${esc(state.name||'не указан')} · контакт: ${esc(state.contact||'не указан')}</p><p>Начало: ${esc(state.startTime||'не указано')}${state.endTime?' · окончание примерно '+esc(state.endTime):''}${state.guestCount?' · гостей: '+esc(state.guestCount):''}</p><p>${state.venue?'Место: '+esc(state.venue):'Место пока не указано'}</p><p>Предпочтительная связь: ${esc(state.preferredContact||'не указана')}${state.contactTime?' · '+esc(state.contactTime):''}</p><button class="link" data-action="edit-details">Изменить анкету мероприятия</button></div><section class="result-section"><div class="result-heading"><h2>Параметры вечера</h2><button class="link" data-action="edit-details">Изменить</button></div><p class="muted">Стиль: ${esc(state.eveningStyle||'не указан')} · активность: ${esc(state.activityLevel||'не указана')}</p><p class="muted">Аудитория: ${esc(state.audienceAge||'не указана')} · дети: ${esc(state.children||'не указано')}${state.childrenDetails?' ('+esc(state.childrenDetails)+')':''}</p><p class="muted">Вовлечение гостей: ${esc(state.guestParticipation||'не указано')} · юмор: ${esc(state.humorConsent||'не указано')}</p><p class="muted">Уже запланировано: ${esc(planned)}</p>${state.decisionMaker?`<p class="muted">Финальное решение: ${esc(state.decisionMaker)}</p>`:''}${state.importantGuests?`<p class="muted">Важные гости: ${esc(state.importantGuests)}</p>`:''}${state.surprises?`<p class="muted">Сюрпризы: ${esc(state.surprises)}</p>`:''}</section><section class="result-section"><h2>Предварительный тайминг</h2>${timelineHTML()}${state.existingTimeline.trim()?`<p><strong>Тайминг от площадки / организатора:</strong></p><p class="muted">${esc(state.existingTimeline).replace(/\n/g,'<br>')}</p>`:''}</section>${groups.map((x,i)=>{const list=picks(i),note=list.length?String(state.notes[list[0].id]||'').trim():state.skipped.has(i)?String(state.skipNotes[i]||'').trim():String(state.discussNotes[i]||'').trim();return `<section class="result-section"><div class="result-heading"><h2>${titles[i]}</h2><button class="link" data-level="${i}">Изменить</button></div>${list.length?`<p><strong>${esc(list[0].item[0])}</strong></p>`:state.skipped.has(i)?'<p class="muted">Вы решили пропустить этот блок.</p>':state.discussed.has(i)?'<p class="muted">Этот блок вы хотите подобрать вместе с Максимом.</p>':'<p class="muted">Решение пока не принято.</p>'}${note?`<p class="muted">Комментарий: ${esc(note)}</p>`:''}</section>`}).join('')}<section class="result-section"><div class="result-heading"><h2>Пожелания</h2><button class="link" data-action="edit-final">Изменить</button></div><p><strong>Что хочется:</strong> ${esc(state.wants.trim()||'не указано')}</p><p><strong>Чего не должно быть:</strong> ${esc(state.avoid.trim()||'не указано')}</p><p><strong>Дополнительно:</strong> ${esc(state.comment.trim()||'не указано')}</p><p><strong>Что ещё важно знать:</strong> ${esc(state.finalQuestion.trim()||'не указано')}</p></section><div class="event-summary final-actions"><p><strong>Передать программу Максиму</strong></p><p class="contact-number">${MAXIM_PHONE_DISPLAY}</p><p>Основной способ — WhatsApp: откроется чат с уже заполненной программой. Останется нажать «Отправить».</p><div class="button-row"><button class="primary" data-action="whatsapp">Отправить Максиму в WhatsApp</button><button class="secondary" data-action="telegram">Отправить через Telegram</button></div>${state.sentAt?`<div class="sent-note"><strong>Отмечено как отправленное</strong><p class="muted">${esc(formatDateTime(state.sentAt))}. Если вы внесёте изменения, статус снова станет черновиком.</p></div>`:`<button class="link" data-action="mark-sent">Я уже отправил(а) программу Максиму</button>`}</div><div class="button-row"><button class="primary" data-action="pdf">Сохранить PDF / печать</button><button class="secondary" data-action="download">Скачать TXT</button><button class="secondary" data-action="copy-short">Скопировать краткую версию</button><button class="secondary" data-action="copy-full">Скопировать полную версию</button><button class="secondary native-share" data-action="native-share">Поделиться с телефона</button><button class="link" data-action="share">Ссылка для редактирования</button><button class="link" data-action="view-link">Ссылка только для просмотра</button><button class="secondary" data-action="resume">← Вернуться к выбору</button></div><p class="fine">Анкета: ${esc(state.applicationId||'—')} · статус: ${esc(status)} · версия ${Math.max(1,Number(state.revision)||1)}${state.completedAt?' · подтверждена '+esc(formatDateTime(state.completedAt)):''}${durationText()?' · заполнение '+esc(durationText()):''}. Точный сценарий согласуется с Максимом.</p></section>`;
    }
  }
  $('screen').innerHTML=out;$('screen').dataset.view=state.screen;save();
}
function all(){const g=groups[state.level];$('all-title').textContent=titles[state.level]+' · все варианты';$('all-items').innerHTML=g.items.map((x,i)=>`<label class="all-row"><input type="radio" name="level-choice" data-choice="${state.level+'-'+i}" ${state.selected.has(state.level+'-'+i)?'checked':''}><span><strong>${esc(x[0])}</strong><p>${esc(x[1])}</p>${x[3]?`<p class="notice">${esc(x[3])}</p>`:''}</span></label>`).join('');openModal('all-dialog')}
function programmeFull(){
  const lines=['МАКСИМ НИКИТКИН · ПОЛНАЯ КАРТОЧКА МЕРОПРИЯТИЯ',''];
  lines.push('АНКЕТА');lines.push('ID: '+(state.applicationId||'Не указан'));lines.push('Статус: '+questionnaireStatus());lines.push('Версия: '+Math.max(1,Number(state.revision)||1));if(state.completedAt)lines.push('Подтверждена: '+formatDateTime(state.completedAt));if(state.sentAt)lines.push('Отмечена как отправленная: '+formatDateTime(state.sentAt));if(durationText())lines.push('Время заполнения: '+durationText());lines.push('');
  lines.push('ЗАКАЗЧИК');lines.push('Имя: '+(state.name.trim()||'Не указано'));lines.push('Контакт: '+(state.contact.trim()||'Не указан'));lines.push('Предпочтительная связь: '+(state.preferredContact||'Не указана'));lines.push('Когда удобно связаться: '+(state.contactTime||'Не указано'));lines.push('Кто принимает финальное решение: '+(state.decisionMaker.trim()||'Не указано'));lines.push('');
  lines.push('МЕРОПРИЯТИЕ');lines.push('Формат: '+(state.eventType||'Не указан'));lines.push('Дата: '+(state.eventDate?formatDate(state.eventDate):'Не указана'));lines.push('Время начала: '+(state.startTime||'Не указано'));lines.push('Примерное окончание: '+(state.endTime||'Не указано'));lines.push('Количество гостей: '+(state.guestCount||'Не указано'));lines.push('Место: '+(state.venue.trim()||'Не указано'));lines.push('');
  lines.push('ГОСТИ И СТИЛЬ');lines.push('Основная аудитория: '+(state.audienceAge||'Не указана'));lines.push('Дети: '+(state.children||'Не указано')+(state.childrenDetails.trim()?' · '+state.childrenDetails.trim():''));lines.push('Вовлечение гостей: '+(state.guestParticipation||'Не указано'));lines.push('Уровень активности: '+(state.activityLevel||'Не указан'));lines.push('Стиль вечера: '+(state.eveningStyle||'Не указан'));lines.push('Юмор про гостей: '+(state.humorConsent||'Не указано'));lines.push('');
  lines.push('МУЗЫКА И ОГРАНИЧЕНИЯ');lines.push('Что нравится: '+(state.musicLikes.trim()||'Не указано'));lines.push('Что не ставить: '+(state.musicAvoid.trim()||'Не указано'));lines.push('Темы, которые нельзя затрагивать: '+(state.sensitiveTopics.trim()||'Не указано'));lines.push('');
  lines.push('ВАЖНЫЕ МОМЕНТЫ');lines.push('Важные гости: '+(state.importantGuests.trim()||'Не указано'));lines.push('Сюрпризы: '+(state.surprises.trim()||'Не указано'));lines.push('Уже запланировано: '+plannedText());lines.push('Тайминг от площадки / организатора: '+(state.existingTimeline.trim()||'Не указан'));lines.push('');
  lines.push('КОНТАКТЫ КОМАНДЫ');lines.push('Организатор / координатор: '+(state.coordinatorContact.trim()||'Не указан'));lines.push('DJ / звук: '+(state.djContact.trim()||'Не указан'));lines.push('Фото / видео: '+(state.mediaContact.trim()||'Не указан'));lines.push('Площадка: '+(state.venueContact.trim()||'Не указан'));lines.push('');
  lines.push('ВЫБОР ПО БЛОКАМ');
  groups.forEach((g,i)=>{const time=shiftedRange(g.time),list=picks(i);lines.push('');lines.push((i+1)+'. '+g.name+(time?' · ориентировочно '+time:''));if(list.length){const x=list[0];lines.push('• '+x.item[0]);const note=String(state.notes[x.id]||'').trim();if(note)lines.push('  Комментарий: '+note)}else if(state.skipped.has(i)){lines.push('• Блок пропускаем');const note=String(state.skipNotes[i]||'').trim();if(note)lines.push('  Комментарий: '+note)}else if(state.discussed.has(i)){lines.push('• Подобрать вместе с Максимом');const note=String(state.discussNotes[i]||'').trim();if(note)lines.push('  Что обсудить: '+note)}else{lines.push('• Решение пока не принято')}});
  lines.push('');lines.push('ПРЕДВАРИТЕЛЬНЫЙ ТАЙМИНГ');lines.push(timelineText());
  lines.push('');lines.push('ПОЖЕЛАНИЯ');lines.push('Что точно хочется: '+(state.wants.trim()||'Не указано'));lines.push('Чего точно не должно быть: '+(state.avoid.trim()||'Не указано'));lines.push('Дополнительно: '+(state.comment.trim()||'Без комментария'));lines.push('Что ещё важно знать Максиму: '+(state.finalQuestion.trim()||'Не указано'));
  lines.push('');lines.push('СВЯЗЬ С ВЕДУЩИМ');lines.push('Максим Никиткин: '+MAXIM_PHONE_DISPLAY+' · Telegram / WhatsApp');
  lines.push('');lines.push('Это предварительные пожелания заказчика. Финальный сценарий, порядок, длительность и условия проведения согласуются с Максимом Никиткиным.');
  return lines.join('\n');
}
function programmeShort(){
  const lines=['МАКСИМ НИКИТКИН · КРАТКАЯ ПРОГРАММА'];
  lines.push('ID: '+(state.applicationId||'—')+' · версия '+Math.max(1,Number(state.revision)||1));lines.push((state.eventType||'Мероприятие')+' · '+(state.eventDate?formatDate(state.eventDate):'дата не указана')+' · '+(state.startTime||'время не указано')+' · '+(state.guestCount||'?')+' гостей');
  lines.push('Заказчик: '+(state.name.trim()||'не указан')+' · '+(state.contact.trim()||'контакт не указан'));
  if(state.eveningStyle||state.activityLevel)lines.push('Стиль: '+(state.eveningStyle||'не указан')+' · активность: '+(state.activityLevel||'не указана'));
  lines.push('');lines.push('ВЫБОР:');
  groups.forEach((g,i)=>{const list=picks(i);lines.push((i+1)+'. '+g.name+': '+(list.length?list[0].item[0]:state.skipped.has(i)?'пропускаем':state.discussed.has(i)?'подобрать вместе с Максимом':'не решено'))});
  lines.push('');lines.push('ТАЙМИНГ:');timelineEntries().forEach(r=>lines.push(r.time+' — '+r.title));
  if(state.wants.trim())lines.push('');lines.push('Хочется: '+(state.wants.trim()||'—'));if(state.avoid.trim())lines.push('Не должно быть: '+state.avoid.trim());
  lines.push('');lines.push('Максим: '+MAXIM_PHONE_DISPLAY+' · Telegram / WhatsApp');
  return lines.join('\n');
}
async function copy(text,message){let ok=false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);ok=true}}catch{}if(!ok)ok=legacyCopy(text);notify(ok?message:'Не удалось скопировать автоматически. Нажмите «Скачать программу» или отправьте через WhatsApp / Telegram.');return ok}
function openWhatsApp(){openExternal('https://wa.me/'+MAXIM_PHONE_DIGITS+'?text='+encodeURIComponent(programmeFull()))}
function openTelegram(){const url='https://t.me/share/url?url=&text='+encodeURIComponent(programmeFull());copy(MAXIM_PHONE_DISPLAY,'Номер Максима скопирован: '+MAXIM_PHONE_DISPLAY);openExternal(url)}
async function nativeShareProgramme(){if(navigator.share){try{await navigator.share({title:'Максим Никиткин · программа мероприятия',text:programmeFull()});return}catch(e){if(e&&e.name==='AbortError')return}}copy(programmeFull(),'Полная программа скопирована. Её можно отправить Максиму.')}
async function printProgramme(){
  if(state.screen!=='finish'){go('finish',false);setTimeout(()=>window.print(),80);return}
  setTimeout(()=>{try{window.print()}catch{notify('Не удалось открыть печать. Используйте полную текстовую версию.')}},40)
}
async function downloadProgramme(){
  const text='\uFEFF'+programmeFull(),name='МАКСИМ-НИКИТКИН-'+(state.applicationId||'программа')+'.txt';
  try{const file=new File([text],name,{type:'text/plain;charset=utf-8'});if(isIOS&&navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:'Программа мероприятия',files:[file]});notify('Программа готова. Выберите, куда её сохранить или отправить.');return}}catch(e){if(e&&e.name==='AbortError')return}
  try{const u=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500);notify(isIOS?'Если файл не скачался, используйте «Скопировать» или WhatsApp.':'Программа подготовлена для скачивания.')}catch{copy(programmeFull(),'Полная программа скопирована. Сохраните её в заметки или отправьте Максиму.')}
}
function act(action){
  if(readOnlyMode&&!['pdf','copy-full','copy-short'].includes(action))return;
  if(action==='start'){ensureMeta();go('details');return}
  if(action==='back'){if(state.screen==='details'){if(state.returnFromDetails==='finish'){state.returnFromDetails='';go(state.completedAt?'finish':'confirm')}else go('intro')}else if(state.screen==='play'){if(state.level>0)openLevel(state.level-1);else go('details')}else if(state.screen==='confirm')go('play');else if(state.screen==='finish')go('play');return}
  if(action==='confirm-back'){go('play');return}
  if(action==='reset'){resetAll();return}
  if(action==='begin-choice'){if(!validateDetails())return;state.seen.add('started');if(state.returnFromDetails==='finish'){state.returnFromDetails='';go(state.completedAt?'finish':'confirm');return}if(state.returnFromDetails==='confirm'){state.returnFromDetails='';go('confirm');return}const missing=unresolvedLevels();openLevel(missing.length?missing[0]:0);return}
  if(action==='resume'){state.seen.add('started');const missing=unresolvedLevels();openLevel(missing.length?missing[0]:state.level);return}
  if(action==='all'){all();return}
  if(action==='edit-details'){state.returnFromDetails=state.screen==='confirm'?'confirm':'finish';go('details');return}
  if(action==='edit-final'){state.consent=false;state.completedAt='';state.sentAt='';go('confirm');return}
  if(action==='skip-level'){markIncomplete();if(state.skipped.has(state.level)){state.skipped.delete(state.level);delete state.skipNotes[state.level]}else{for(const x of picks(state.level)){state.selected.delete(x.id);delete state.notes[x.id]}state.discussed.delete(state.level);delete state.discussNotes[state.level];state.skipped.add(state.level)}render();return}
  if(action==='discuss-level'){markIncomplete();if(state.discussed.has(state.level)){state.discussed.delete(state.level);delete state.discussNotes[state.level]}else{for(const x of picks(state.level)){state.selected.delete(x.id);delete state.notes[x.id]}state.skipped.delete(state.level);delete state.skipNotes[state.level];state.discussed.add(state.level)}render();return}
  if(action==='finish'){finishAttempt();return}
  if(action==='advance'){state.done.add(state.level);if(state.level<3)openLevel(state.level+1);else finishAttempt();return}
  if(action==='confirm-finish'){if(!state.consent){notify('Подтвердите передачу данных Максиму, чтобы завершить анкету.');$('consent')?.focus();return}ensureMeta();state.completedAt=nowISO();state.sentAt='';save();go('finish');return}
  if(action==='mark-sent'){state.sentAt=nowISO();if(!state.completedAt)state.completedAt=nowISO();save();render();notify('Отмечено: программа передана Максиму.');return}
  if(action==='copy-short'){copy(programmeShort(),'Краткая версия скопирована.');return}
  if(action==='copy-full'||action==='copy'){copy(programmeFull(),'Полная программа скопирована. Её можно отправить Максиму.');return}
  if(action==='download'){downloadProgramme();return}
  if(action==='pdf'){printProgramme();return}
  if(action==='native-share'){nativeShareProgramme();return}
  if(action==='share'){if(location.protocol==='file:'){notify('Ссылка заработает после размещения сайта. Пока используйте копирование, PDF или WhatsApp.');return}const u=new URL(location.href);u.hash='plan='+encodeURIComponent(JSON.stringify(snapshot()));copy(u.href,'Ссылка для редактирования скопирована.');return}
  if(action==='view-link'){if(location.protocol==='file:'){notify('Ссылка для просмотра заработает после размещения сайта.');return}const u=new URL(location.href);u.hash='view='+encodeURIComponent(JSON.stringify(snapshot()));copy(u.href,'Ссылка только для просмотра скопирована.');return}
  if(action==='whatsapp'){openWhatsApp();notify('Открываю WhatsApp. После отправки вернитесь сюда и отметьте, что программа передана.');return}
  if(action==='telegram'){openTelegram();return}
}
$('screen').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.toggle&&valid(b.dataset.toggle)){const id=b.dataset.toggle;markIncomplete();if(state.selected.has(id)){state.selected.delete(id);delete state.notes[id]}else selectOne(id);render();document.querySelector('[data-toggle="'+id+'"]')?.focus({preventScroll:true});return}
  if(b.dataset.action){act(b.dataset.action);return}
  if(b.dataset.level!==undefined){openLevel(+b.dataset.level);return}
  if(b.dataset.remove&&valid(b.dataset.remove)){markIncomplete();state.selected.delete(b.dataset.remove);delete state.notes[b.dataset.remove];render()}
});

// Touch devices: first tap opens a card, selection remains an explicit button action.
$('screen').addEventListener('click',e=>{
  const card=e.target.closest('[data-option-card]');
  if(!card||e.target.closest('button,a,input,textarea,select,label'))return;
  if(!window.matchMedia('(hover: none), (pointer: coarse)').matches)return;
  const willOpen=!card.classList.contains('is-expanded');
  document.querySelectorAll('[data-option-card].is-expanded').forEach(x=>x.classList.remove('is-expanded'));
  if(willOpen){card.classList.add('is-expanded');card.scrollIntoView({block:'nearest',behavior:'smooth'})}
});
const bindings={person:'name',contact:'contact','event-date':'eventDate','start-time':'startTime','end-time':'endTime','event-type':'eventType',venue:'venue','guest-count':'guestCount','audience-age':'audienceAge',children:'children','children-details':'childrenDetails','guest-participation':'guestParticipation','activity-level':'activityLevel','evening-style':'eveningStyle','music-likes':'musicLikes','music-avoid':'musicAvoid','humor-consent':'humorConsent','sensitive-topics':'sensitiveTopics','important-guests':'importantGuests',surprises:'surprises','decision-maker':'decisionMaker','preferred-contact':'preferredContact','contact-time':'contactTime','existing-timeline':'existingTimeline','coordinator-contact':'coordinatorContact','dj-contact':'djContact','media-contact':'mediaContact','venue-contact':'venueContact','planned-other':'plannedOther',wants:'wants',avoid:'avoid',comment:'comment','final-question':'finalQuestion'};
$('screen').addEventListener('input',e=>{
  const t=e.target;if(bindings[t.id]){state[bindings[t.id]]=t.value;markIncomplete()}
  if(t.dataset.note&&valid(t.dataset.note)){state.notes[t.dataset.note]=t.value;markIncomplete()}
  if(t.dataset.skipNote!==undefined){const g=+t.dataset.skipNote;if(Number.isInteger(g)&&g>=0&&g<groups.length){state.skipNotes[g]=t.value;markIncomplete()}}
  if(t.dataset.discussNote!==undefined){const g=+t.dataset.discussNote;if(Number.isInteger(g)&&g>=0&&g<groups.length){state.discussNotes[g]=t.value;markIncomplete()}}
  if(t.matches('[aria-invalid="true"]')&&String(t.value).trim())t.removeAttribute('aria-invalid');save();
});
$('screen').addEventListener('change',e=>{
  const t=e.target;
  if(t.id==='consent'){state.consent=Boolean(t.checked);save();return}
  if(t.dataset.planned){markIncomplete();const value=t.dataset.planned;if(t.checked){if(!state.planned.includes(value))state.planned.push(value)}else state.planned=state.planned.filter(x=>x!==value);save();return}
  if(bindings[t.id]){state[bindings[t.id]]=t.value;markIncomplete();if(t.matches('[aria-invalid="true"]')&&String(t.value).trim())t.removeAttribute('aria-invalid');save()}
});
$('all-items').addEventListener('change',e=>{const id=e.target.dataset.choice;if(!valid(id))return;markIncomplete();if(e.target.checked)selectOne(id);else{state.selected.delete(id);delete state.notes[id]};$('count').textContent=state.selected.size;save();const current=state.level,g=groups[current];$('all-items').innerHTML=g.items.map((x,i)=>`<label class="all-row"><input type="radio" name="level-choice" data-choice="${current+'-'+i}" ${state.selected.has(current+'-'+i)?'checked':''}><span><strong>${esc(x[0])}</strong><p>${esc(x[1])}</p>${x[3]?`<p class="notice">${esc(x[3])}</p>`:''}</span></label>`).join('')});
function closeAll(){closeModal('all-dialog')}
$('close-all').onclick=$('done-all').onclick=closeAll;
$('all-dialog').addEventListener('close',()=>render());
$('home').onclick=()=>go('intro');
$('collection').onclick=()=>finishAttempt();
$('review-check').onclick=()=>{const missing=unresolvedLevels();closeModal('review-dialog');if(missing.length)openLevel(missing[0]);else openLevel(0)};
$('review-finish').onclick=()=>{closeModal('review-dialog');finishAttempt()};
$('draft-continue').onclick=continueDraft;
$('draft-reset').onclick=()=>{closeModal('draft-dialog');clearState();render();notify('Начинаем новую анкету.')};
window.addEventListener('beforeunload',e=>{if(hasDraftData()&&!state.completedAt&&state.screen!=='finish'){e.preventDefault();e.returnValue=''}});



restore();
try{if(location.hash.startsWith('#plan=')){const p=JSON.parse(decodeURIComponent(location.hash.slice(6)));if(applySnapshot(p)){loadedFromLink=true;draftFound=false;state.screen='finish'}}else if(location.hash.startsWith('#view=')){const p=JSON.parse(decodeURIComponent(location.hash.slice(6)));if(applySnapshot(p)){loadedFromLink=true;draftFound=false;readOnlyMode=true;state.screen='finish'}}}catch{}
render();showDraftDialog();

