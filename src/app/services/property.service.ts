import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SearchCriteria } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private propertiesSubject$ = new BehaviorSubject<Property[]>([
    {
      id: 1,
      title: 'Modern garzonlakás',
      type: 'Garzonlakás',
      price: 15_000_000,
      location: 'Miskolc',
      description:
        'Ez a modern kialakítású garzonlakás ideális választás lehet első lakást keresők, egyetemisták vagy akár befektetők számára is, akik egy jól kiadható ingatlant keresnek Miskolc szívében. A lakás letisztult belső terekkel és praktikus elrendezéssel rendelkezik, amely lehetővé teszi a maximális helykihasználást. A kétszobás kialakítás biztosítja a kényelmet akár egy pár számára is, de ideális lehet dolgozószobának vagy vendégszobának is.A lakás világos, nagy ablakai természetes fényt engednek be, amely kiemeli a modern burkolatok és bútorok stílusát. A nyitott konyha és a nappali egy légtérben helyezkedik el, így kiválóan alkalmas társasági élethez is. A fürdőszoba új csempékkel és korszerű szaniterekkel lett felújítva, így a beköltözés után nincs szükség további ráfordításokra.Az épület biztonságos, rendezett társasház része, ahol barátságos lakóközösség várja az új tulajdonost. A környék infrastruktúrája kiváló – közelben található élelmiszerbolt, iskola, orvosi rendelő, tömegközlekedési lehetőségek, így akár autó nélkül is könnyedén elérhető minden szükséges szolgáltatás.A képgalériában több fotót is találhatunk a lakásról, amelyek jól tükrözik annak állapotát és hangulatát. Az ingatlanhoz tartozik egy kis tárolóhelyiség is, valamint parkolási lehetőség az épület előtti közterületen. Ideális otthon lehet azoknak, akik Miskolc belvárosához közel, de csendes, nyugodt környezetben szeretnének élni.',
      roomCount: 2,
      images: ['garzon.jpg', 'minkeraft.png', 'minkeraft.jpg'],
      created_at: new Date(),
    },
    {
      id: 2,
      title: 'College of Winterhold',
      type: 'Kastély',
      price: 10_000_000,
      location: 'Tamriel',
      description:
        'Ez az impozáns kastély nem csupán egy lakóingatlan, hanem egy igazi legendás épület, amely évszázadok óta áll ellen az idő vasfogának. A College of Winterhold Tamriel északi régiójában, egy meredek sziklaperemen helyezkedik el, ahonnan lenyűgöző kilátás nyílik az északi tengerre. A kastély építészeti stílusa a klasszikus középkori jegyeket ötvözi mágikus részletekkel, ami különleges atmoszférát kölcsönöz az egész birtoknak. A hatalmas, 53 szobával rendelkező épület belső terei lenyűgözőek: boltíves mennyezetek, kőből faragott oszlopok, hatalmas könyvtárak és misztikus laboratóriumok várják a lakókat. A kastély történelmi jelentőséggel bír – évszázadokon keresztül a mágia tanulmányozásának központjaként szolgált, és több híres varázsló is innen indult világhódító útjára. A legendák szerint a kastély alapjai ősi, elfeledett varázslatokkal vannak megerősítve, így sem földrengés, sem vihar nem képes kárt tenni benne. A kastély nem csupán belül impozáns – a hatalmas udvar, a tornyok, valamint a rejtett alagutak és titkos termek tovább fokozzák a különleges hangulatot. Az ingatlanhoz tartozik egy különálló torony is, amely ideális megfigyelőpont lehet, de akár lakrészként is használható. A helyszín elszigetelt, mégis jól megközelíthető: mágikus portálok biztosítják a gyors utazást Tamriel más régiói felé. A College of Winterhold tökéletes választás lehet azok számára, akik valami igazán egyedit, történelmit és különlegeset keresnek. Legyen szó különleges rezidenciáról, exkluzív szálláshelyről, vagy akár privát akadémiáról, ez a kastély végtelen lehetőséget kínál. Az ingatlan teljes bútorzattal eladó, valamint az ősi tekercsek és mágikus ereklyék egy része is az ajánlat része lehet külön megállapodás szerint.',
      roomCount: 53,
      images: ['winterhold.jpg', 'winterhold.avif', 'winterhold.webp'],
      created_at: new Date(),
    },
    {
      id: 3,
      title: 'Amerikai Családi Ház',
      type: 'Kertesház',
      price: 100_000_000,
      location: 'Hódmezővásárhely',
      description:
        'Ez az impozáns, amerikai stílusú családi ház Hódmezővásárhely nyugodt, kertvárosi övezetében található, és a tágas életterek, elegáns kialakítás és modern technológiai megoldások tökéletes kombinációját kínálja. Az ingatlan 53 szobával rendelkezik, így tökéletes választás lehet nagycsaládosoknak, közösségi célokra, vagy akár panzióként is üzemeltethető. A ház megjelenése és kialakítása egy klasszikus amerikai álmot idéz, hatalmas előkerttel, dupla garázzsal, széles verandával és gondozott zöldterületekkel. A belső tér minden részletében a minőséget és a kényelmet szolgálja: a tágas nappali középpontjában egy kandalló található, amely nemcsak meleget, hanem otthonos hangulatot is biztosít. A konyha professzionális felszereltséggel rendelkezik, márvány munkapulttal, beépített gépekkel, tágas kamrával és amerikai stílusú reggelizőpulttal. Az étkező rész nagy családi események lebonyolítására is tökéletesen alkalmas. A szobák mindegyike külön fürdőszobával és gardróbbal felszerelt, a fő hálószoba pedig saját erkélykapcsolattal, jakuzzival és hatalmas fürdőszobával rendelkezik. A ház intelligens otthon rendszert használ, így fűtés, világítás, biztonsági rendszer és zenevezérlés egyetlen mobilalkalmazáson keresztül irányítható. A ház minden ablaka hőszigetelt, az épület energiatakarékos megoldásokkal – például napelemekkel és vízújrahasznosító rendszerrel – lett felszerelve. A kertben gyönyörűen kialakított pihenőrész, grillterasz, medence és játszótér is helyet kapott. A telek elhelyezkedése ideális: csendes utcában, de közel a városközponthoz, iskolákhoz, boltokhoz, és a főbb közlekedési csomópontokhoz. Ez az amerikai családi ház nem csupán lakóhely, hanem egy életstílus megtestesítője is. Tökéletes választás azok számára, akik tágas, luxuskivitelű, mégis otthonos környezetet keresnek vidéki nyugalommal, de városi kényelemmel.',
      roomCount: 53,
      images: ['amcsi.webp', 'amcsi2.webp', 'amcsi3.jpg'],
      created_at: new Date(),
    },
    {
      id: 4,
      title: 'Pokol 217. szobája',
      type: 'Szoba',
      price: 10_000_000,
      location: 'Szeged',
      description:
        'Készen állsz egy igazán különleges élményre? Akkor engedd meg, hogy bemutassuk a Pokol 217. szobáját – egy olyan ingatlant Szeged szívében, amelyről már legendák szólnak. Ez az extrém és egyedi lakóegység nem való gyenge idegzetűeknek. A 30 szobás elrendezésével és sajátos atmoszférájával ez a lakás inkább hasonlít egy pszichedelikus utazásra, mintsem egy átlagos albérletre.A lakás az Irinyi kollégium legendás szintjén található, ahol állítólag még a Wi-Fi is csak szellemeken keresztül működik. A folyosókat vörös fények világítják meg, a szobákban pedig füstös múlt és nevető múltidézetek keringenek a levegőben. A 217-es szoba különösen ismert az egykori lakók beszámolói miatt – akik vagy sírva, vagy nevetve mesélik, milyen élmény volt ott élni. Vagy túlélni. 😅A belső terek valódi időutazást kínálnak a 80-as évek koleszromantikájába: a padló recseg, a csap csöpög, a szekrényajtó magától kinyílik – de mindezt egyedi bájjal és nosztalgikus noszogatással. A szoba falait poszterek, graffitik és karcolt idézetek díszítik, melyekből kiderül, hogy itt nemcsak laknak, hanem legendák születnek.A közösségi terek – például a közös konyha és a mosdók – mind hozzájárulnak a kollektív élményhez. Itt nem ismeretlen fogalom a „társas fürdés” fogalma, és biztos, hogy minden reggel új történetet szül. A lakáshoz tartozik három ablak, amelyek – bár nem nyílnak rendesen – legalább nem is záródnak, így a szellőzés állandó és garantált.És még egy érdekesség: a 217-es szobához állítólag saját démon is jár, aki éjszakánként halk suttogással motivál tanulásra vagy filozófiai mélységekbe ránt. Ha tehát nem csak lakást keresel, hanem egy életre szóló sztorit, akkor megtaláltad.Ez a szegedi pokolkapu elsősorban kalandvágyó fiataloknak, alternatív művészeknek, vagy olyanoknak ajánlott, akik már mindent láttak. Egy biztos: aki egyszer belép, az már nem ugyanazként jön ki.',
      roomCount: 30,
      images: ['irinyi.jpg', 'irinyi2.jpg', 'irinyi3.jpg'],
      created_at: new Date(),
    },
    {
      id: 5,
      title: 'Tengerparti villa',
      type: 'Villa',
      price: 250_000_000,
      location: 'Balatonfüred',
      description:
        'Az A- Villa (Vendégház) légkondicionált szállással, valamint fürdő- és wellnessközponttal várja vendégeit Balatonfüreden, a tihanyi apátságtól 8,4 km-re, az Annagora Aquaparktól pedig 2,4 km-re. Az erkélyes szálláshely ingyenes wifit és díjmentes magánparkolót kínál. A villa tóra néző medencével, szaunával és közös konyhával rendelkezik. Az 5 hálószobás, tágas villában 3 fürdőszoba, ágyneműhuzat és törölköző, streamingszolgáltatást kínáló, síkképernyős tévé, étkezősarok, teljesen felszerelt konyha található. A terasz a hegyekre nyújt kilátást. A vendégek a medencére néző, szabadtéri étkezősarokban is étkezhetnek. A zavartalan pihenést külön bejárat is szolgálja.A beltéri medencében és a pezsgőfürdőben kellemes lazításra nyílik lehetőség. A villakomplexumhoz szabadtéri tűzrakóhely és piknikezőterület is tartozik.Balatonfüred vasútállomása 2,4 km-re, a tihanyi Belső-tó pedig 10 km-re van az épülettől. A legközelebbi reptér a 76 km-re fekvő Hévíz–Balaton repülőtér.',
      roomCount: 8,
      images: ['balatonvilla.jpg', 'balatonvilla2.jpg', 'balatonvilla3.jpg'],
      created_at: new Date(),
    },
    {
      id: 6,
      title: 'Panel a 9. emeleten',
      type: 'Lakás',
      price: 25_000_000,
      location: 'Budapest',
      description:
        'Ez a Budapest szívében, egy jól megközelíthető lakótelepen található 9. emeleti panel lakás nem csupán egy ingatlan – ez egy életérzés. A város fölé emelkedve minden reggel a főváros lenyűgöző látképe tárul eléd, különösen napkeltekor, amikor a Duna aranyban fürdik, és a távolban még a Gellért-hegy is köszön. A lakás három külön bejáratú szobából áll, így kiváló lehetőség családosoknak, baráti lakóközösségeknek, vagy akár befektetési célra is, albérletként. A tágas nappali remek közösségi tér, míg a két hálószoba biztosítja a privát szférát. A konyha praktikusan kialakított, rengeteg tárolóhellyel és egy reggelizőasztallal, ahol a kávé elfogyasztása közben a város morajlását hallgathatod. A fürdőszoba és a WC külön helyiségben található, a lakásban pedig sok a természetes fény – köszönhetően a 9. emeleti elhelyezkedésnek és a nagy ablakoknak. Az ingatlanhoz tartozik egy erkély is, ahonnan egyszerre élvezhető a városi panoráma és a friss levegő. Tökéletes hely egy esti borozáshoz, olvasáshoz vagy csak a világ szemléléséhez. A panelház rendezett, csendes lakóközösséggel rendelkezik. A lift megbízható, és a biztonságról kamerarendszer is gondoskodik. A környéken minden megtalálható, ami a városi élethez kell: boltok, iskolák, orvosi rendelő, tömegközlekedés – a metró, busz és villamos percek alatt elérhető. A közeli parkok és zöldterületek lehetővé teszik a kikapcsolódást a városi nyüzsgés közepette. A panel hátrányai – mint a vékony falak vagy a kissé retró stílus – ugyan jelen vannak, de ezek egyben lehetőséget is kínálnak: könnyen alakítható, felújítható, testre szabható. Ráadásul az új nyílászáróknak és korszerűsített fűtési rendszernek köszönhetően a rezsiköltség kifejezetten barátságos. Ez a lakás ideális választás azoknak, akik szeretnének a város közelében, de elérhető áron lakni, miközben élvezik a magasból nyíló kilátás és a panel-élet egyszerű, de otthonos hangulatát.',
      roomCount: 3,
      images: ['panel.webp', 'panel1.jpg', 'panel2.webp'],
      created_at: new Date(),
    },
    {
      id: 7,
      title: 'Hobbitlak',
      type: 'Földbe vájt ház',
      price: 40_000_000,
      location: 'Megye',
      description:
        'Ez az ingatlan nemcsak egy ház – ez maga a béke, a természet és a mesék világa. A Megye dombjai között megbúvó földbe vájt házikó minden ízében a nyugalomról, otthonosságról és természetközeliségről szól. A hobbitlak, bár kívülről szerénynek és kicsinek tűnhet, belépve meglepően tágas és otthonos világ tárul elénk. A lekerekített ajtók és ablakok, a fából készült gerendák és a rusztikus, természetes anyagokkal borított belső terek egyedi karaktert kölcsönöznek a háznak. A négy szobás elrendezés lehetővé teszi, hogy kényelmesen élhessen benne egy kisebb család vagy egy természetkedvelő pár, akik értékelik az egyszerűséget és a harmóniát. A vastag földfalak nyáron hűvösen, télen kellemes melegen tartják a házat, így az év bármely szakában otthonos marad. A konyha minden hobbit álmát megtestesíti: alacsony mennyezet, tágas kamra, hatalmas étkezőasztal, ahol a napi hat étkezés könnyedén elfér – reggeli, második reggeli, tízórai, ebéd, uzsonna és vacsora. Az itt élők számára az étkezés nem pusztán szükséglet, hanem életstílus. A kandallóban ropogó tűz, a friss kenyér illata és a virágoskertekre nyíló ablakok mind hozzájárulnak ahhoz, hogy ez a ház igazi otthonná váljon. A házhoz tartozik egy apró borospince is, ahol a saját készítésű almabort lehet tárolni, valamint egy gondozott veteményes, virágoskert és egy apró halastó, amit a környékbeli patak táplál. A lakók számára a természet közelsége nemcsak lehetőség, hanem életforma: a madárcsicsergés, a friss levegő és az évszakok váltakozása mind részei a mindennapoknak. A Megye közössége rendkívül barátságos, itt mindenki ismer mindenkit, és a házi készítésű piték versenye vagy a nyári tűz körüli mesemondás éppúgy részei a társas életnek, mint a kocsmában elfogyasztott esti sör. A hobbitlak így nemcsak egy lakóhely, hanem egy életstílus: lassabb tempó, több mosoly, és egy világ, ahol még a legkisebb is képes nagy dolgokra.',
      roomCount: 4,
      images: ['hobbit.jpg', 'hobbit2.jpg', 'hobbit3.jpg'],
      created_at: new Date(),
    },
    {
      id: 8,
      title: 'Középkori kastély',
      type: 'Kastély',
      price: 500_000_000,
      location: 'Franciaország',
      description:
        'Ez a Franciaország szívében elhelyezkedő középkori kastély több mint egyszerű ingatlan: egy darab történelem, egy élő legenda, amely évszázadok óta büszkén áll a vidék lankáin. A hatalmas birtokon elterülő, monumentális épület egykor nemesek otthona volt, és minden kövéből, boltívéből és tornyából a múlt dicsősége árad. Ma azonban készen áll arra, hogy új tulajdonosa ismét élettel töltse meg falait. A kastély összesen 20 szobával rendelkezik, köztük reprezentatív fogadótermekkel, hatalmas étkezőkkel, intimitást biztosító hálószobákkal, könyvtárszobával, bálteremmel és természetesen egy impozáns lovagteremmel, ahol a kandallóban lobogó tűz fénye még ma is árnyjátékot vet a kőfalakra. A boltíves mennyezetek, faragott faajtók, régi kovácsoltvas lámpások és az eredeti kőpadló mind-mind megőrizték a kastély eredeti karakterét. A kastélyhoz tartozik egy óriási park is, ősfákkal, szökőkutakkal, kerti pavilonokkal és egy apró tóval, amely a régi legendák szerint egykor titkos találkozók helyszíne volt. A birtokon áll egy különálló istálló- és szolgálati épületegyüttes is, amely akár vendégházzá vagy műhellyé alakítható. A birtok szélén egy kis kápolna is áll, ahol még ma is tarthatók meghitt szertartások. Bár a kastély évszázadokkal ezelőtt épült, az utóbbi évtizedekben több korszerűsítési munkálat zajlott, így a modern kényelmi funkciók – például központi fűtés, megbízható víz- és villanyhálózat, valamint alapvető szigetelés – már adottak. Ennek ellenére a kastély továbbra is megőrizte eredeti báját és történelmi hangulatát, így ideális választás lehet akár szálláshelynek, exkluzív rendezvényhelyszínnek vagy privát lakóhelynek is, azoknak, akik valódi értékekben gondolkodnak. A környék gazdag kulturális és gasztronómiai élményekben: középkori városkák, borvidékek, helyi piacok, kastélyturizmus és kiváló francia éttermek mind karnyújtásnyira találhatók. A közlekedés kiváló, az autópálya és a legközelebbi nemzetközi repülőtér is könnyen elérhető. Ez a kastély nem csupán egy hely, ahol lakhat az ember – ez egy életstílus, amelyben a történelem, a nyugalom és a fényűzés kéz a kézben járnak.',
      roomCount: 20,
      images: ['kastely.jpg', 'kastely2.jpg', 'kastely3.jpg'],
      created_at: new Date(),
    },
    {
      id: 9,
      title: 'Erdő mélyén búvóhely',
      type: 'Házikó',
      price: 35_000_000,
      location: 'Bakony',
      description:
        'A Bakony sűrű erdei mélyén, távol a városi zajtól és a rohanó mindennapoktól bújik meg ez a varázslatos kis házikó, amely tökéletes menedéket kínál azoknak, akik visszavágynak a természethez. Ez az ingatlan nem csupán egy ház, hanem egy életérzés – a csend, a nyugalom és a harmónia otthona, ahol minden egyes reggel madárcsicsergéssel és a lombok susogásával indul. Az ingatlan 2 szobás, de jól kihasználható alaprajzának és átgondolt elrendezésének köszönhetően kényelmes életteret biztosít akár egy párnak, akár egyedülálló természetimádónak. A nappali és a konyha egy légtérben helyezkedik el, így a központi fatüzelésű kályha melege szinte az egész házat átjárja. Az enteriőr rusztikus hangulatát a fából készült bútorok, gerendás mennyezet és a kézzel faragott részletek adják, melyek tökéletesen illeszkednek a környezethez. Az erdővel körülölelt telken minden adott a pihenéshez: egy fedett terasz, ahol reggeli kávézás közben őzeket figyelhetsz meg; egy tűzrakóhely, amely ideális baráti beszélgetésekhez vagy családi grillpartikhoz; valamint egy kerti tároló, amely akár barkácsműhelyként is használható. A kertben saját fűszernövényes ágyás, gyümölcsfák és vadvirágok díszítik a tájat. A ház télen is lakható, hiszen kiváló hőszigeteléssel és korszerű nyílászárókkal van ellátva. Az áramellátás stabil, a vízellátás pedig saját fúrt kútról történik, így a teljes önellátás is megvalósítható. Ideális választás azoknak, akik egyre inkább vonzódnak az off-grid életformához, de nem szeretnének lemondani a kényelemről sem. A környék természeti adottságai lenyűgözőek: túraösvények, bicikliutak, patakok, barlangok és kilátók csalogatják a felfedezőket. A közeli falvakban helyi termelőktől vásárolhatók friss alapanyagok, és számos lehetőség kínálkozik lovaglásra, gombászásra vagy akár vadlesre is. Ez az erdei házikó több mint egy ingatlan – ez egy lehetőség arra, hogy az ember újra kapcsolatba kerüljön önmagával, a természettel, és megélje azokat a nyugodt pillanatokat, amelyeket a modern világban oly ritkán tapasztalunk meg.',
      roomCount: 2,
      images: ['erdeihaz.jpg', 'erdeihaz.webp', 'erdeihaz3.jpg'],
      created_at: new Date(),
    },
    {
      id: 10,
      title: 'Minimalista loft',
      type: 'Loft',
      price: 60_000_000,
      location: 'Berlin',
      description:
        'Berlin szívében, egy egykori ipari épületből kialakított, stílusos és modern loftlakás várja új lakóit, akik értékelik a letisztult dizájnt, a kreatív térszervezést és a városi élet lüktetését. Ez a 60 millió forint értékű, kétszobás lakás nemcsak otthonként, de inspiráló élettérként is szolgálhat azok számára, akik a művészet, a technológia vagy az innováció világában élnek. A loft alapterülete tágas, nyitott koncepció szerint lett kialakítva: a hatalmas belmagasság, a padlótól mennyezetig érő ablakok és a nyers betonfelületek ipari hangulatot kölcsönöznek az enteriőrnek. A belső térben a funkcionalitás és az esztétika tökéletes egyensúlyban van. A nappali, konyha és étkező egyetlen légtérben helyezkedik el, így az otthon szinte lélegzik, a természetes fény pedig egész nap beragyogja a lakást. A modern konyha letisztult fehér és fekete színekkel operál, beépített gépekkel, magasfényű felületekkel és okoseszközökkel felszerelt, így a főzés élménnyé válik. A hálószoba egy félmagas galérián található, így szeparált, mégis nyitott érzetet biztosít. A fürdőszoba minimalista stílusa követi a lakás többi részét: esőztető zuhany, márványhatású burkolatok és rejtett világítás jellemzik. Az egész loftot áthatja a modern életstílus szellemisége: intelligens otthon rendszerrel vezérelhető világítás, fűtés és biztonságtechnika; hangvezérléssel működő hangrendszer és távvezérelhető redőnyök teszik kényelmessé a mindennapokat. A padlófűtés és a kiváló hőszigetelés gondoskodnak a komfortos hőérzetről télen-nyáron. A ház közös terei is különlegesek: egy tetőterasz Berlin ikonikus látképével, közösségi kert, közös coworking helyiség, és egy kerékpártároló is rendelkezésre áll, ami a fenntartható városi életformához igazodik. A környék kulturális és gasztronómiai kínálata végtelen: galériák, specialty kávézók, startup irodák, bárok és vintage boltok minden irányban pár perc sétára elérhetők. Ez a minimalista loft nem csupán lakás, hanem életforma. Ideális választás azoknak, akik a város szívében szeretnének élni, inspiráló és egyedi környezetben, miközben nem mondanak le a modern kényelemről és technológiáról sem.',
      roomCount: 2,
      images: ['loft.webp', 'loft2.jpg', 'loft3.jpg'],
      created_at: new Date(),
    },
    {
      id: 11,
      title: 'Hegyi menedék',
      type: 'Faház',
      price: 45_000_000,
      location: 'Alpok',
      description:
        'Az Alpok csodálatos, hófödte csúcsai között bújik meg ez a mesébe illő faház, amely ideális választás mindazok számára, akik nyugalomra, természetközelségre és friss levegőre vágynak. A 45 millió forint értékű ingatlan három tágas szobával, meleg fa enteriőrrel és lenyűgöző panorámával várja új tulajdonosát, legyen szó pihenésről, állandó otthonról vagy akár kiadásról. A faház kívül-belül természetes anyagokból épült: a helyi lucfenyőből készült gerendák és lambériák meleg, otthonos hangulatot árasztanak. A tágas nappaliban található egy rusztikus kandalló, amely nemcsak látványos díszítőelem, de a hideg alpesi esték meghitt melegét is biztosítja. A nappali és az étkező egy légtérben található, a hatalmas üvegfelületeken át pedig lenyűgöző kilátás nyílik a környező hegyvidékre és fenyvesekre. A konyha teljesen felszerelt, stílusában a ház természetközeli karakterét követi: fa bútorok, kovácsoltvas részletek és modern, energiatakarékos háztartási gépek biztosítják a kényelmet. A három szoba közül kettő az emeleten található, a harmadik pedig egy külön bejáratú, földszinti vendégszoba, így akár több generáció számára is ideális lehet. A fürdőszoba tágas, természetes kőburkolattal, esőztető zuhanyzóval és fűtött padlóval rendelkezik. A házhoz egy hatalmas, fedett terasz is tartozik, ahol akár egy csésze forró teával a kézben csodálhatjuk a naplementét vagy a hóesést. Az udvaron fából készült dézsa és szauna is helyet kapott, melyek tökéletesek a téli sportok utáni lazításhoz. A kertet vadvirágok és örökzöldek díszítik, gondozásuk nem igényel sok időt, így a természet szinte érintetlen formájában élvezhető. Az ingatlan könnyen megközelíthető, mégis kellő távolságra van a forgalmasabb városoktól – így garantált a nyugalom és a csend. A közeli sípályák, túraútvonalak és kristálytiszta tavak minden évszakban izgalmas kikapcsolódást kínálnak. Ez a hegyi menedék azoknak szól, akik a természetet nemcsak látni, hanem megélni is szeretnék. Ideális választás túrázóknak, síelőknek, természetjáróknak vagy azoknak, akik egyszerűen egy nyugodt, tiszta és varázslatos helyen szeretnének élni – akár örökre.',
      roomCount: 3,
      images: ['fahaz.jpg', 'fahaz2.jpg', 'fahaz3.jpg'],
      created_at: new Date(),
    },
    {
      id: 12,
      title: 'Üvegpalota',
      type: 'Modern ház',
      price: 300_000_000,
      location: 'Dubai',
      description:
        'Dubaj modern és lenyűgöző városának egyik ékköve ez a futurisztikus, üvegfalú palota, amely a luxus és a technológia tökéletes kombinációját kínálja. Az ingatlan ára 300 millió forint, és mindazok számára ideális, akik a legmagasabb szintű kényelemmel, fényűzéssel és egyedülálló designnal szeretnének élni. A palota minden részlete a legújabb építészeti trendeket követi, miközben tiszteletben tartja a hagyományos arab stílust. A hatalmas, padlótól mennyezetig érő üvegfelületek lehetővé teszik, hogy a természetes fény az egész épületet beragyogja, miközben lenyűgöző panorámát biztosítanak a városra és a Perzsa-öbölre. A szemet gyönyörködtető látvány a nap minden szakában változik, a város vibráló éjszakai fényeitől kezdve a tenger csillogó víztükörén át a homokdűnék aranysárga árnyalataival bezárólag. A palota belső terét a legújabb okosotthon rendszerek irányítják: az intelligens technológia segítségével könnyedén szabályozható minden – a világítástól kezdve a fűtésen, hűtésen át a hangrendszerig. A belső terek minimalisták, mégis impozánsak, a legfinomabb olasz márvány és gránit burkolatok, designer bútorok és letisztult vonalak dominálnak. Az óriási nappali közepén egy üvegfallal elválasztott, személyre szabható akvárium található, amely a tér középpontjává válik. A palota mindössze 10 hálószobát tartalmaz, mindegyik saját fürdőszobával, beépített gardróbbal és magánterasszal rendelkezik. A legnagyobb szoba egy különleges, panorámás tetőtéri lakosztály, amely egyedülálló kilátást nyújt a város sziluettjére és a naplementére. Az étkező és a konyha egyaránt az eleganciát és a funkcionalitást ötvözi: a legújabb technológiai megoldásokkal felszerelt konyha egy szigettel és prémium minőségű, beépített gépekkel rendelkezik. A palota minden részlete prémium minőségű, a legjobb anyagokkal és kivitelezéssel készült, beleértve a világító tükörfalakat, az egyedi világítási rendszereket és a hangszigetelt ablakokat. Az épület tetőteraszáról páratlan kilátás nyílik a városra, ahol egy medence, jacuzzi, szabadtéri étkezőhely és napozóágyak találhatóak. A külső udvar egy hatalmas, szabadtéri kerttel, pálmafákkal, virágokkal és vízesésekkel rendelkezik, amely az otthont egy igazi oázissá varázsolja. A palota alatt három szint mélygarázs található, amely akár 10 autó számára is elegendő parkolóhelyet biztosít. A legújabb biztonsági rendszerekkel és 24 órás személyzettel ellátott ingatlan teljes mértékben biztosítja a lakók biztonságát és kényelmét. Ez az üvegpalota egy igazi mérföldkő a modern építészet világában. Ideális választás mindazok számára, akik nemcsak otthont keresnek, hanem egy életre szóló élményt is, amely a legújabb technológia, a dizájn és a luxus minden aspektusát magában foglalja. Egy hely, ahol minden nap új élményeket hoz, és ahol a város egyik leglenyűgözőbb panorámája fogadja az új lakókat.',
      roomCount: 10,
      images: ['glasshouse.jpg', 'glasshouse2.jpg', 'glasshouse3.jpg'],
      created_at: new Date(),
    },
    {
      id: 13,
      title: 'Szélmalom',
      type: 'Malomház',
      price: 55_000_000,
      location: 'Hollandia',
      description:
        'Hollandia egyik leghíresebb tájképi elemét, a szélmalmot, most egy teljesen egyedi és különleges lakóházzá alakították. Ez a 55 millió forint értékű ingatlan egyedülálló lehetőséget kínál mindazok számára, akik valami igazán különleges, történelmi hangulatú otthonra vágynak, miközben a modern kényelem és funkcionalitás is biztosított. A szélmalom építészeti szempontból rendkívüli: az eredeti malom szerkezete és elemei megmaradtak, de a belső tér a legmodernebb építészeti megoldásokkal lett átformálva. A három szintes malom középső szintje a nappali, amely hatalmas, nyitott térrel rendelkezik, ahol a fa padló és a világos falak harmonikus eleganciát sugároznak. A hatalmas ablakokból csodálatos kilátás nyílik a holland tájra, amelyet zöld mezők és csatornák szegélyeznek. Az étkező és a konyha egy légtérben található, a konyha teljesen felszerelt, prémium gépekkel, míg az étkezőhely közvetlenül a malom belső szerkezetére épült, így a tradicionális malomszerkezet még mindig hangsúlyos szerepet kap a térben. A szélmalom egyedülálló, különleges hangulatot áraszt, miközben minden szükséges modern kényelmi szolgáltatást biztosít. A szélmalomhoz tartozó hálószobák mindegyike egyedi tervezésű és egyedi berendezésekkel van ellátva. A második szinten két tágas hálószoba található, mindegyik saját fürdőszobával. Az egyik hálószobából közvetlenül a malom tetejére lehet feljutni, ahol a kilátás páratlan, különösen a naplemente idején. A harmadik szint egy kisebb szoba, amely ideális dolgozószobának vagy olvasószobának. A fürdőszobák egyes elemei az egyedi holland stílust képviselik, míg a burkolatok, mint például a kézzel festett csempék, emlékeztetnek a tradicionális holland dizájnra. A fürdőszobákban modern eszközök találhatóak, mint a beépített zuhanyzó, a kád és a fűtött padló. A ház körül egy mesés kert található, amely tökéletes pihenőhelyet biztosít. A zöld területen virágzó növények, valamint egy kis tavacska is található, amely az egész kertet nyugalommal tölti meg. Az udvar egy kerti pavilonra is épült, ahol a család és barátok kényelmesen étkezhetnek, miközben élvezhetik a szélmalom és a természet adta látványt. Ez a szélmalom egy igazi ritkaság: a történelem és a modern élet összefonódik benne, miközben az ingatlan minden egyes szeglete a holland kultúra és életstílus esszenciáját tükrözi. Ez a ház ideális választás azoknak, akik a történelmi, egyedi építkezéseket szeretik, de ugyanakkor nem szeretnének lemondani a modern élet kényelméről.',
      roomCount: 4,
      images: ['szelmalom.jpg', 'szelmalom2.jpg', 'szelmalom3.jpg'],
      created_at: new Date(),
    },
    {
      id: 14,
      title: 'Stúdiólakás belvárosban',
      type: 'Lakás',
      price: 20_000_000,
      location: 'Szeged',
      description:
        'A szegedi belváros szívében található stúdiólakás tökéletes választás fiataloknak, diákoknak vagy bárkinek, aki szeretné élvezni a város vibráló életét, miközben egy kényelmes, modern és stílusos otthonban él. Az ingatlan ára 20 millió forint, és egy ideális lehetőség azok számára, akik nemcsak lakást, hanem egy életstílust is keresnek. A lakás egyedülálló elrendezésének köszönhetően minden szükséges funkcióval rendelkezik anélkül, hogy túlzsúfoltnak tűnne. A tágas, nyitott térben található a nappali, hálószoba és étkező egyben, ami modern minimalizmussal egyesíti a praktikumot és a stílust. A lakás berendezése egyszerű, de elegáns, világos színekkel, modern bútorokkal és letisztult formákkal. Az egész lakásban új, magas minőségű parketta található, amely melegséget ad a térnek, miközben könnyen karbantartható. A konyha praktikus elrendezéssel rendelkezik, beépített modern gépekkel, így a főzés és a napi étkezések egyszerűek és kényelmesek. A konyhasziget a lakás központi eleme, amely egyben étkezőként is funkcionál. A fürdőszoba minden modern kényelmet biztosít, a tágas zuhanyzóval és a dizájnos mosdóval, valamint a beépített tárolóval, hogy a kis tér minden centiméterét kihasználhassuk. A stúdiólakáshoz tartozik egy kis erkély is, ahonnan csodálatos kilátás nyílik a belvárosra, tökéletes hely egy reggeli kávé elfogyasztására vagy egy esti pihenésre. Az erkély a lakás egyedi részévé vált, ami extra szabadságot és friss levegőt biztosít a lakók számára. A belső tér világos és napfényes, köszönhetően az ablakoknak, amelyek a város főutcájára néznek. A lakás ideális elhelyezkedése lehetővé teszi, hogy minden fontos szolgáltatás, étterem, kávézó, bolt és közlekedési lehetőség könnyen elérhető legyen. A közeli egyetemek és iskolák miatt különösen vonzó választás lehet a diákok számára. A lakás a legújabb okosotthon technológiákkal van felszerelve, így a lakók kényelmét és biztonságát a legmodernebb rendszerek biztosítják. A világítás, fűtés és hűtés távolról is vezérelhető, ami kényelmesebbé teszi a mindennapi életet. Ez a stúdiólakás egy ideális választás azok számára, akik szeretnék élvezni a városi életet, miközben kényelmes, stílusos és jól megtervezett otthonra vágynak. A szegedi belváros nyüzsgése, kulturális kínálata és közlekedési lehetőségei mind hozzájárulnak ahhoz, hogy ez a lakás egy ideális otthonná váljon fiataloknak és városi életmódot keresőknek.',
      roomCount: 1,
      images: ['studio.jpg', 'studio2.jpg', 'studio3.webp'],
      created_at: new Date(),
    },
    {
      id: 15,
      title: 'Dűne-ház',
      type: 'Sci-fi épület',
      price: 599_999_999,
      location: 'Arrakis',
      description:
        'Az Arrakis bolygón, a homokviharokkal és a végtelen sivataggal körülvett dűnéken egy igazi sci-fi csoda található: a Dűne-ház, amely a homokvihar álló technológiát alkalmazva nyújt modern, mégis futurisztikus otthont. Az 599 999 999 forintos áron eladó ingatlan egyedülálló lehetőséget kínál mindazok számára, akik a sci-fi világába szeretnének belépni és egy valódi Dűne-univerzum részévé válni. A Dűne-ház koncepciója a legmodernebb technológiai megoldásokat ötvözi a bolygó sajátos környezetével. Az épület külső falai olyan különleges anyagokból készültek, amelyek képesek ellenállni a hatalmas homokviharoknak, amelyek folyamatosan pusztítják a bolygó felszínét. A ház belső tere modern, letisztult, ugyanakkor a futurisztikus dizájn jegyeit viseli, ahol minden részlet a kényelmet és a túléléshez szükséges funkciókat szolgálja. A ház központi része egy tágas, nyitott nappali, amely a legmodernebb technológiai eszközökkel van felszerelve. Az okosotthon rendszerek lehetővé teszik, hogy minden funkciót, például a hőmérsékletet, a világítást és a szellőzést távolról is vezérelhessük, biztosítva a kényelmet még a legzordabb időjárásban is. A nappali hatalmas panorámaablakokkal rendelkezik, ahonnan lenyűgöző kilátás nyílik a végtelen homokdűnékre és a csillagos égboltra. A konyha a legújabb technológiával van felszerelve, és ideális helyszín a családi étkezésekhez. A modern konyhagépek és a beépített tárolók garantálják a kényelmes főzést és étkezést, miközben az egész tér letisztult, minimalista stílust áraszt. Az étkező közvetlenül kapcsolódik a nappalihoz, így könnyedén élvezhetjük a közös étkezéseket a futurisztikus környezetben. A hálószobák mindegyike kényelmes és funkcionális, mindegyik saját fürdőszobával rendelkezik. A fürdőszobák modern zuhanyzókkal és elegáns, letisztult bútorokkal vannak felszerelve, hogy a lakók számára a lehető legnagyobb kényelmet biztosítsák. Az egyik hálószoba egyedi tervezésű, futurisztikus bútorokkal, amelyek tökéletesen illeszkednek a Dűne-ház tematikájához. A Dűne-ház külső területei sem kevésbé lenyűgözőek. A ház körül egy hatalmas, homokos udvar található, amely tökéletes helyszínt biztosít a pihenéshez vagy akár a meditatív szabadtéri programokhoz. A homokdűnék között kialakított ösvényeken sétálva a látogatók megismerhetik a bolygó különleges táját, miközben a ház kényelmét élvezhetik. Ez a futurisztikus ingatlan egyedülálló lehetőséget kínál azoknak, akik szeretnének egyedülálló, sci-fi környezetben élni, miközben megőrzi a legmagasabb szintű kényelmet és biztonságot. Az ingatlan technológiai megoldásai és dizájnja tökéletesen illeszkednek Arrakis sivatagos környezetéhez, így egy igazán különleges otthont kínál mindazok számára, akik szeretnék átélni a Dűne világát.',
      roomCount: 6,
      images: ['dunehouse.jpg', 'dunehouse2.jpg', 'dunehouse3.webp'],
      created_at: new Date(),
    },
    {
      id: 16,
      title: 'Űrállomás 3000',
      type: 'Űrállomás',
      price: 899_999_999,
      location: 'Föld körüli pálya',
      description:
        'Az Űrállomás 3000 nemcsak egy egyszerű űrhajó, hanem egy mozgó, lebegő luxusrezidencia, amely a Föld körüli pályán kering. Ez az 899 999 999 forintos ingatlan a világ legmodernebb technológiai vívmányaival van felszerelve, és olyan életmódot kínál, amelyet eddig csak a sci-fi filmekben láthattunk. Azok számára, akik szeretnék egyedülálló módon élvezni a csillagos égbolt látványát, miközben minden földi luxust élveznek, az Űrállomás 3000 tökéletes választás. A lakás minden egyes négyzetcentimétere a legmodernebb űrtechnológiával van kialakítva, és tökéletesen ötvözi a futurisztikus dizájnt a kényelmes, élhető környezettel. Az állomás körkörös formája lehetővé teszi, hogy a lakók bárhol is tartózkodjanak, mindig lenyűgöző kilátás nyílik a bolygóra, a csillagokra vagy a galaxis távoli részeire. Az ablakok panorámásak, és a fények szinte bármilyen hangulatot képesek varázsolni a belső térben. A nappali hatalmas és tágas, középpontjában egy exkluzív, lebegő ülőhely található, amely lehetővé teszi a kényelmes pihenést és a csillagos égbolt megfigyelését. A bútorok, amelyek lebegnek a padlón, innovatív, súlytalanságot imitáló technológiai megoldásokkal készültek, és minden egyes darab a luxus maximális élményét nyújtja. A nappaliban található holografikus projektoroknak köszönhetően bármilyen környezetet vagy tájat varázsolhatunk a térbe, akár egy tengerparti naplementét, akár egy másik bolygó tájait. A konyha a legmodernebb űrtechnológiával rendelkezik, hiszen az étkezés az Űrállomás 3000-en nemcsak egy egyszerű folyamat, hanem egy igazi élmény. Az étkezőasztal, amely a konyhától a nappaliba vezet, áttetsző, és lebegő módon, mozgatható. A beépített, űrre specializált konyhai gépek és az okosotthon rendszer minden igényt kielégítenek, és az étkezéseket valóban élvezhető élménnyé varázsolják. A hálószobák is a luxus maximális fokán állnak. A legújabb űrtechnológia lehetővé teszi, hogy az ágyak és bútorok ne csak komfortosak, hanem súlytalanságban is kényelmesek legyenek, így az alvás teljesen új élményt nyújt. Az egyes hálószobákhoz külön fürdőszoba tartozik, amelyekben az űrre optimalizált zuhanyzó és WC található, minden kényelmet biztosítva, amit a földi otthonok kínálnak. A szórakoztatás sem marad el: az állomás mozi- és szórakoztató központja igazi csillagközi élményt nyújt. Az űrközpont mozija holografikus kijelzővel van felszerelve, amely a legújabb filmeket és szórakoztató tartalmakat mutatja be úgy, mintha a közönség a filmek közepén lenne. Ezen kívül egy exkluzív szórakoztató részleg is található, ahol a legmodernebb játékok és virtuális valóság élmények várják a lakókat. Az Űrállomás 3000 nemcsak otthon, hanem egy igazi űrélmény, amely lehetővé teszi, hogy bárki, aki itt él, megismerje a galaxis távoli csodáit, miközben a legmodernebb földi luxust élvezi. Az űrállomás ideális választás azok számára, akik nemcsak a bolygónkon szeretnének élni, hanem szeretnék maguk mögött hagyni a földi határokat, és egyedülálló életet élni a csillagok között.',
      roomCount: 15,
      images: ['spacestation.jpg', 'spacestation2.jpg', 'spacestation3.jpg'],
      created_at: new Date(),
    },
    {
      id: 17,
      title: 'Hagyományos parasztház',
      type: 'Parasztház',
      price: 18_000_000,
      location: 'Kalocsa',
      description:
        'Ez a tradicionális parasztház Kalocsa szívében található, és egy igazán különleges lehetőséget kínál mindazok számára, akik a vidéki élet nyugalmát keresik, miközben szeretnének egy olyan otthont, amely a hagyományokat és a modern kényelmet ötvözi. Az ingatlan 18 000 000 forintos áron eladó, és egy igazi falusi idillt kínál azoknak, akik szeretnék elkerülni a város zűrzavarát és élvezni a nyugodt, pihentető életet a természet közelében. A ház egy hagyományos magyar parasztház, amelyet gondosan felújítottak, hogy megőrizze eredeti jellegét, miközben minden szükséges modern kényelmet biztosítson. Az épület tervezése során nagy figyelmet fordítottak arra, hogy az otthon megőrizze a falusi élet egyszerűségét, de a legújabb technológiákat és kényelmi megoldásokat is integrálják. Az ingatlan egy tágas udvarral rendelkezik, amely ideális helyszínt biztosít a szabadtéri programokhoz, a pihenéshez vagy akár a családi összejövetelekhez. Az udvar közepén egy szép kerti tó található, amely a környező fák és virágok árnyékában nyújt pihentető látványt. A kertben helyet kaptak fák, dísznövények és egy kerti pavilon is, amely tökéletes helyszín egy esti grillezéshez vagy egy családi vacsorához. A ház belső terében az autentikus parasztházak jellegzetes stílusa ötvöződik a modern dizájnnal. A nappali egy tágas, világos helyiség, amelyet a tradicionális fa bútorok és a kényelmes kanapék uralnak. A konyha egy valódi vidéki konyha, ahol a régi, falusi hangulatot a mai kor kényelme egészíti ki. A konyhában található modern beépített gépek mellett egy tűzhely is helyet kapott, ahol a lakók a régi idők hagyományos módján is főzhetnek. A ház több hálószobával rendelkezik, mindegyik saját egyedi stílusú bútorokkal van berendezve, amelyek visszarepítenek bennünket a vidéki élet autentikus világába. Az egyik hálószoba egy hagyományos fa ággyal és szőnyegekkel van berendezve, míg a másik egy modern stílusú hálószoba, amely tökéletes kombinációja a régi és új elemeknek. A fürdőszoba is egyszerre modern és hagyományos, mindkét világ előnyeit kihasználva. A parasztház tökéletes választás lehet azok számára, akik szeretnének egy kényelmes otthont vidéken, de nem szeretnék lemondani a modern kényelmi megoldásokról. Az ingatlan elhelyezkedése ideális, hiszen közel van Kalocsa város központjához, így a városi szolgáltatások is könnyen elérhetők, miközben a ház környezete biztosítja a teljes nyugalmat és magánéletet. Ez a ház egy olyan otthont kínál, amely nemcsak egy hely a pihenésre, hanem egy valódi menedék a mindennapi élet rohanása elől. A vidék csendje és szépsége garantáltan elvarázsolja az itt élőket, miközben a ház minden szempontból a modern életstílust tükrözi.',
      roomCount: 3,
      images: ['paraszthaz.jpg', 'paraszthaz2.jpg', 'paraszthaz3.png'],
      created_at: new Date(),
    },
    {
      id: 18,
      title: 'Medencés luxuslak',
      type: 'Villa',
      price: 500_000_000,
      location: 'Los Angeles',
      description:
        'A Medencés luxuslak Los Angeles egyik legkeresettebb és legexkluzívabb területén található, ahol a tengerparti életstílust ötvözik a luxus kényelmével. Az ingatlan 500 000 000 forintért eladó, és olyan életet kínál, amelyet sokan csak álmodnak. A villa mindent megad, amire a legigényesebb lakók vágyhatnak: hatalmas medencét, csúcsminőségű belső teret, lenyűgöző kilátást, és egy olyan környezetet, amely minden egyes pillanatot varázslatossá tesz. A villa modern dizájnja a minimalista stílust ötvözi a meleg, meghitt otthonérzettel. A hatalmas üvegfelületek biztosítják, hogy az épület minden szobájából lélegzetelállító kilátás nyílik a tengerre és a környező hegyekre. Az otthon belső terében a legfinomabb anyagok és berendezések találhatók, beleértve a márvány padlókat, az elegáns bútorokat és a prémium minőségű művészeti alkotásokat, amelyek egyedülálló hangulatot teremtenek. A nappali tágas és fényárban úszik, ahol az elegáns bútorok és a modern dizájn találkoznak. A szoba középpontjában egy impozáns kandalló található, amely a hűvös estéken melegséget biztosít. A nappaliból egyenesen a teraszra léphetünk, ahol egy óriási medence vár minket. A medence körül számos kényelmes napozóágy, pihenőhely és egy szabadtéri étkező található, így bármikor élvezhetjük a napsütést vagy egy hangulatos vacsorát a szabad ég alatt. A konyha egy igazi mestermű, amely az étkezés minden pillanatát különlegessé teszi. A legújabb technológiai eszközökkel felszerelt, szigetes konyhában nemcsak főzni, hanem étkezni is élmény. A konyha egyedülálló designja lehetővé teszi, hogy egyszerre több séf is dolgozhasson, miközben mindenki élvezheti az étkezés élményét. A gépek mindegyike prémium minőségű, beleértve a beépített borospincét, a legmodernebb kávéfőzőket és a hatalmas hűtőszekrényeket. A hálószobákban az igazi luxus és kényelem vár ránk. Az egyik szoba egy hatalmas king-size ággyal és panorámás ablakokkal rendelkezik, amelyeken keresztül a csodálatos tengerparti kilátás nyílik. A fürdőszobákban minden részletre odafigyeltek: a hatalmas zuhanyzók, a jacuzzik, a dupla mosdók és a különleges, márvány burkolatok mind azt a célt szolgálják, hogy az itt élők igazán a luxus világában érezhessék magukat. A villa ezen kívül több szórakoztató funkcióval is rendelkezik, beleértve a mozitermet, ahol a legújabb filmeket nézhetjük, vagy a házimozi-rendszert, amely minden szórakozási igényt kielégít. A borospince és a könyvtár egy igazi pihenőhely, ahol a lakók teljesen kikapcsolódhatnak, miközben élvezhetik a finom borokat és az intimitást. A Medencés luxuslak nemcsak egy ház, hanem egy életstílus, amely a legmagasabb szintű kényelmet és eleganciát kínál minden lakójának. Ha Ön egy olyan ingatlant keres, amely valóban a luxus minden aspektusát magában hordozza, akkor ez az otthon tökéletes választás lesz. A hatalmas teraszok, az úszómedence, a pazar kilátások és a finom részletek mind-mind azt szolgálják, hogy Ön valóban megélhesse álmai életét egy csodálatos helyen.',
      roomCount: 7,
      images: ['luxvilla.jpg', 'luxvilla2.jpg', 'luxvilla3.jpg'],
      created_at: new Date(),
    },
    {
      id: 19,
      title: 'Belső udvaros palota',
      type: 'Palota',
      price: 800_000_000,
      location: 'Isztambul',
      description:
        'Ez a lenyűgöző Belső udvaros palota Isztambul szívében található, és egy olyan különleges életstílust kínál, amely a történelem és a modern kényelem tökéletes harmóniáját ötvözi. Az ingatlan 800 000 000 forintért eladó, és egy olyan ritka lehetőséget kínál, amely nemcsak a történelem iránt érdeklődő, hanem a luxust kereső vevők számára is vonzó lehet. A palota impozáns külsőjével és lenyűgöző belső terével magával ragadja a látogatókat. Az épület homlokzata a hagyományos oszmán építészet minden jellegzetességét magán viseli, miközben a modern igényeket is kielégíti. A palota belső terét a legfinomabb anyagokkal, márvány burkolatokkal és aranyozott díszítésekkel alakították ki, hogy a látogatók az első pillanattól kezdve a luxus világába léphessenek. A palota egyik legkülönlegesebb része a belső udvar, amely a ház közepén található. Az udvar egy igazi oázis, tele zöld növényekkel, pázsittal, szökőkutakkal és szobrokkal. A napsütéses napokon az udvar egy nyugodt menedékként szolgál, míg este a romantikus fények és a lágy vízcsobogás varázslatos légkört teremtenek. Az udvar közepén egy hatalmas szökőkút található, amely az oszmán építészet jellegzetes dísze. A palota belső terében egy-egy szoba, amely mindegyike saját egyedi stílust tükröz, és minden szobában a legnagyobb figyelmet fordították a részletekre. Az egyik szoba a tradicionális oszmán stílust ötvözi a modern dizájnnal, míg a másik egy teljesen modern berendezéssel rendelkezik. A palota minden egyes szobájában a legfinomabb bútorok, selyemfüggönyök, kézzel festett falak és egyéb művészeti alkotások találhatók. A palota számos szórakoztató helyiséggel is rendelkezik. A bálterem hatalmas méretével és elegáns dizájnjával az ideális helyszínt biztosítja bármilyen rendezvényhez, legyen szó akár egy báli eseményről, akár egy exkluzív vacsoráról. A zeneszoba és a mozi minden szórakozást biztosít, amit a lakók vagy vendégeik élvezhetnek, miközben a palota egyedülálló szépsége még inkább fokozza az élményt. A palota konyhája egy igazi mestermű. A legújabb technológiai megoldások és a tradicionális oszmán konyhai eszközök egyesülnek, hogy a legfinomabb ételek készítése is a legnagyobb élvezettel járjon. Az étkezőterem pedig olyan eleganciával rendelkezik, amely biztosítja, hogy minden étkezés egy különleges esemény legyen. A palota több hálószobával rendelkezik, mindegyik saját fürdőszobával és pazar kilátással. Az egyik hálószobában egy hatalmas king-size ágy található, míg a másikban egy tradicionális oszmán stílusú ágy és bútorok alkotják a szobát. A fürdőszobák márvány borítással, jacuzzikkal és hatalmas zuhanyzókkal rendelkeznek, hogy minden szempontból a legmagasabb szintű kényelmet biztosítsák. A palota minden egyes sarkában egy-egy történelmi emlék, művészeti alkotás vagy díszítés található, amelyek mind azt az egyedülálló hangulatot teremtik, ami csak egy olyan palotához illik, mint ez. A palota nemcsak egy otthon, hanem egy élmény is, amelyet a lakói minden nap élvezhetnek. Isztambul ezen különleges palotája a történelem, a kultúra és a luxus tökéletes egyesítése. Ha olyan otthont keres, amely nemcsak a legmagasabb szintű kényelmet kínálja, hanem egy igazi műalkotás is, akkor ez az ingatlan az Ön számára készült. A palota minden részlete azt szolgálja, hogy az itt élők valóban egyedülálló életet élhessenek, miközben egy igazi történelmi örökséget is birtokolnak.',
      roomCount: 25,
      images: ['palace.jpg', 'palace2.jpg', 'palace3.jpg'],
      created_at: new Date(),
    },
    {
      id: 20,
      title: 'Extrém lakókocsi',
      type: 'Lakókocsi',
      price: 12_000_000,
      location: 'Magyarország',
      description:
        'Ez az egyedülálló lakókocsi nem csupán egy átlagos mobil otthon, hanem egy igazi extrém kalandorok számára készült dizájn csoda. 12 000 000 forintért eladó, és olyan különleges megoldásokat kínál, amelyek lehetővé teszik, hogy bárki élvezhesse a szabadságot és a kényelmet bárhol a világon. Ha a szabadságra, kalandra és a mobilitásra vágyik, akkor ez a lakókocsi az Ön számára lett tervezve! Az ingatlan nemcsak praktikus, hanem rendkívül stílusos is. A lakókocsi modern dizájnja és robusztus felépítése biztosítja, hogy bárhol is legyen, mindig otthon érezze magát. A külső részét az extrém körülményekhez is alkalmazkodó anyagok borítják, így ellenáll az időjárás viszontagságainak, legyen szó esőről, hóviharokról vagy tűző napfényről. A lakókocsi belső terét az otthonos, mégis funkcionalitást biztosító elrendezés jellemzi. A hely maximálisan kihasználható, minden egyes négyzetméter okosan van elrendezve, hogy kényelmes és praktikus legyen. Az egyedülállóan tervezett hálószoba kényelmes ágyat kínál, amely tökéletes pihenést biztosít hosszú napok után. A konyha minden modern felszereléssel ellátott, így bárhol is járjon, könnyedén készíthet ételt magának. Az étkező asztal kényelmesen elhelyezhető a konyha közelében, így egy családi étkezés is kényelmesen lebonyolítható. A fürdőszoba kis méretéhez képest igen jól felszerelt, egy nagy zuhanyzóval, WC-vel és mosdóval. Az apró részletekre is nagy figyelmet fordítottak, így az egész fürdőszoba világos, friss és kényelmes. A lakókocsi hűtője és fűtése is beépített rendszeren keresztül működik, biztosítva, hogy bármilyen időjárásban komfortosan tartózkodhassunk benne. A nagy ablakoknak köszönhetően a lakókocsi belsejében természetes fény áramlik be, így a kis tér sokkal tágasabbnak és világosabbnak tűnik. A legnagyobb előnye ennek az extrém lakókocsinak az, hogy bárhova elviheti. Az utazások, kirándulások vagy akár hosszú távú túrák során egy olyan mobil otthont biztosít, amely teljesen fel van készülve mindenre. A lakókocsi különleges autózási technológiai megoldásai lehetővé teszik, hogy a legnehezebb terepeken is könnyedén közlekedjen, miközben minden komfortot biztosít az utazás során. Az extrém lakókocsi egyedülálló dizájnja mellett különböző praktikus funkciókkal is rendelkezik. A tetőteraszra egy kényelmes napozóágyat és egy kempingasztalt is elhelyezhetünk, így a szabad ég alatt is élvezhetjük a pihenést. Az oldalán található mobil terasz pedig tökéletes hely a reggeli kávé elfogyasztására, miközben gyönyörködhetünk a tájban. Mindezek mellett a lakókocsi szintén fel van készülve arra, hogy hosszú távú utazások során is kényelmet biztosítson. A beépített napenergiás rendszer lehetővé teszi, hogy a lakókocsi elektromos eszközei, mint a hűtőszekrény vagy a világítás, folyamatosan működhessenek anélkül, hogy külső áramforrásra lenne szükség. Az akkumulátoros tápegység és a víztisztító rendszer pedig biztosítja a kényelmes, független életet bárhol is legyünk. Ez az extrém lakókocsi tehát minden olyan kalandor számára tökéletes választás, akik szeretnék élvezni a szabadságot, miközben minden kényelmet és luxust biztosítanak maguknak, amit csak egy modern mobil otthon kínálhat. Akár hosszú távú túrákhoz, akár egy-egy hétvégi kiruccanáshoz keresnek egy különleges eszközt, ez a lakókocsi minden igényt kielégít. Ne hagyja ki ezt az egyedülálló lehetőséget, és váljon Ön is részese a szabadság teljes élményének!',
      roomCount: 1,
      images: ['lakokocsi.webp', 'lakokocsi2.webp', 'lakokocsi3.jpg'],
      created_at: new Date(),
    },
  ]);
  public properties$ = this.propertiesSubject$.asObservable();

  constructor() {}

  filterProperties(criteria: SearchCriteria): Property[] {
    //console.log(criteria);
    return this.propertiesSubject$.value.filter((property) => {
      if (
        (!criteria.location ||
          (criteria.location &&
            property.location
              .toLowerCase()
              .includes(criteria.location.toLowerCase()))) &&
        (!criteria.type ||
          (criteria.type &&
            property.type
              .toLowerCase()
              .includes(criteria.type.toLowerCase()))) &&
        (!criteria.minPrice || property.price >= criteria.minPrice) &&
        (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
        (!criteria.bedrooms || property.roomCount >= criteria.bedrooms)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  getPropertyById(id: number): Observable<Property | undefined> {
    return this.properties$.pipe(
      map((properties) => properties.find((property) => property.id === id))
    );
  }

  paginateProperties(pageIndex: number, pageSize: number): Property[] {
    return this.propertiesSubject$.value.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
  }
}
