var moment    = require('moment-timezone');
var startDate = moment().subtract(24, 'days').startOf('day');

module.exports = [{
	id          : 1,
	createdAt   : moment('2017-01-31'),
	video       : null,
	title       : 'Wat stel jij voor?',
	summary     : `De campagne voor ‘Stem van West’ is nu van start! Met deze campagne willen we de bewoner laten weten dat je nu online een voorstel kunt doen voor je eigen buurt.`,
	intro       : `De campagne ‘Stem van West’ is nu gestart! Je zult posters in je buurt tegenkomen en misschien ook berichten op Facebook. Leden van het Algemeen Bestuur (AB) gaan de wijk in en leggen uit wat het online platform ‘de Stem van West’ voor jou als bewoner kan betekenen. Het AB wil namelijk graag weten welke interessante ideeën en plannen er leven bij de bewoners van West.`,
	quote       : `Op verkiezingsdag tellen we elke stem, op alle andere dagen wordt iedere stem gehoord.`,
	description : `
		<p>Iedere bewoner kan een plan uploaden op de Stem van West. Wanneer je een voorstel hebt geüpload, kun je andere buurtbewoners uitnodigen om op je plan te stemmen. Na 30 dagen wordt gekeken welk voorstel de meeste stemmen heeft behaald. Dit voorstel wordt dan op de agenda gezet van het Algemeen Bestuur en uitgebreid besproken. In de eerste 30 dagen nét niet eerste geworden? Geen zorgen! Je hebt in totaal 90 dagen de tijd om de meeste stemmen te behalen, met de kans je voorstel te komen pitchen in de vergadering van het Algemeen Bestuur!</p>
		<p>Dus wil je meebeslissen over je eigen buurt? Laat je stem horen!</p>
	`
}, {
	id          : 2,
	createdAt   : moment(startDate).add(24, 'days'),
	video       : '{"url":"https://player.vimeo.com/video/201816568"}',
	title       : 'Je stem laten horen helpt!',
	summary     : `Ralph Stuyver protesteerde tegen de uitbreiding van een supermarkt onder zijn woning. Hierdoor zou het groen in zijn binnentuin verdwijnen. Hij stapte naar het stadsdeel om een oplossing te zoeken. `,
	intro       : `Die co-creatie van het stadsdeel met ons als bewoners vind ik heel goed.`,
	quote       : ``,
	description : ``
}, {
	id          : 3,
	createdAt   : moment(startDate).add(19, 'days'),
	video       : '{"url":"https://player.vimeo.com/video/201816517"}',
	title       : 'Autovrije straten in West',
	summary     : `Bewoner Mischa Woutersen had een bijzonder voorstel: maak meer straten in West tijdelijk autovrij. Bekijk hier hoe zijn plan werkelijkheid werd!`,
	intro       : `Dorrit de Jong is lid van de bestuurscommissie en vindt dat mensen meer inspraak moeten krijgen bij beslissingen die hun directe omgeving aangaan. Ze zouden meer eigenaar van hun omgeving moeten worden door direct betrokken te worden bij beleidsplannen die hun wijk, buurt of gebied aangaan. Waarom ze dat zo belangrijk vindt wordt duidelijk aan de hand van het project ‘Leefstraten’, dat gebaseerd is op een idee van buurtbewoner Mischa Woutersen.`,
	quote       : `Ik weet zeker dat er meer buurtbewoners zijn met een goed idee, maar niet iedereen weet waar het idee onder de aandacht gebracht kan worden. Nu is er de Stem van West.`,
	description : ``
}, {
	id          : 4,
	createdAt   : moment(startDate).add(3, 'days'),
	video       : null,
	title       : 'Buurtbewoners bemoeien zich met renovatie',
	summary     : `Bij de herinrichting van het Karel Doormanplein koos een groep actieve bewoners zelf een architect uit voor de renovatie van het jongerencentrum.`,
	intro       : `Bij de herinrichting van het Karel Doormanplein besloot een groep bewoners om zich actief te bemoeien met de renovatie van het plein. Ze vonden ook dat het jongerencentrum ‘New Society’ op het plein aan grondige verbouwing toe was. Buurtbewoners Lex de Jong en Harry Goossen wisten precies hoe je een plan kunt aandragen bij het stadsdeel en kregen het voor elkaar dat niet alleen het plein werd gerenoveerd, maar ook het jongerencentrum op het plein een opknapbeurt kreeg. De bewoners droegen zelf een architect voor, die het pand mocht renoveren.`,
	quote       : `Als je weet hoe de regels in elkaar steken, dan kun je heel veel bereiken`,
	description : `
		<p>Lex de Jong weet inmiddels hoe je een goed idee ook echt uitgevoerd krijgt. “Eerlijk gezegd, wist ik van tevoren niet waar ik aan begonnen was. Maar dankzij mijn buurman Harry Goossen leerde ik langzaamaan de weg naar het Stadsdeel kennen en konden we samen de juiste stappen zetten om de gemeente ervan te overtuigen dat wij heel goed wisten wat onze buurt nodig had.</p>
		<p>Via een bewonersavond hoorden we dat het stadsdeel deels het plan ‘pleinrenovatie van het Karel Doormanplein’, van de agenda had afgehaald. Er was alleen geld gereserveerd voor het opnieuw inrichten van het plein en voor enkele aanpassingen van het jongerencentrum. Maar wij vonden dat ook de binnenkant van het centrum grondig verbouwd moest worden. Toen zijn we met een aantal buurtbewoners samen gaan zitten om eens te brainstormen hoe we de gemeente op andere gedachten konden brengen. Dat is uiteindelijk gelukt.</p>
		<p>“Die ‘agenda’ is heel belangrijk” benadrukt Lex. “Wat niet op de agenda staat, wordt ook niet besproken. Het is dus zaak te weten hoe je iets op die agenda krijgt. Gelukkig wist Harry mij te vertellen dat iedere bewoner zich kan aanmelden om drie minuten spreektijd te krijgen bij een deelraadvergadering. Je moet dan wel een goed voorbereid plan hebben.” </p>
		<p>Uiteindelijk hebben we de raadsleden een boekje aangeboden met daarin voorbeelden van andere pleinen en met ideeën voor onze buurt, zodat we een goed onderbouwd verhaal hadden. Het letterlijke verhaal mocht ik in de raadszaal doen. Dat was wel een mijlpaal voor me, want je spreekt toch namens je buurt!”</p>
		<p>Het stadsdeel reageerde heel voortvarend en in korte tijd werden er concrete plannen gemaakt voor de renovatie van het plein. De bewoners waren daar erg blij mee, maar wilden ook dat de binnenkant van het jongerencentrum gerenoveerd werd.  Door opnieuw in te spreken bij de vergadering van de stadsdeelraad, werd dit plan aangenomen en kwam er geld vrij voor de interne verbouwing van het jongerencentrum. Het stadsdeel kwam met twee offertes van architecten die de renovatie wilden uitvoeren. </p>
		<p>“Ja, dat klinkt heel leuk” zegt Lex, “maar die mensen waren nog nooit op het plein geweest en hadden geen enkele bewoner gesproken. Dus je kunt je voorstellen dat de plannen voor de verbouwing niet aansloten bij onze wensen als buurtbewoners.” </p>
		<p>Het gevolg was dat Lex, Harry en buurtbewoner Ingeborg Baltussen aparte bewonersavonden organiseerden in hun favoriete ontmoetingsplek, het Amsterdams café ‘Van de Buurt’, zelf van deur tot deur gingen om handtekeningen op te halen en later zelfs een wijkkrantje gingen maken om bewoners te enthousiasmeren. “We deden alles zelf. Sterker nog, we benaderden zelf een architect voor de verbouwing van het jongerencentrum en maakten binnen anderhalve week een projectplan voor ‘New Society’ dat we vervolgens presenteerden aan het Dagelijks Bestuur.”</p>
		<p>Als gevolg van de actieve dialoog met het stadsdeel, kregen Lex, Harry en Ingeborg het akkoord om verder te gaan met de architect van hun keuze en voerde het stadsdeel de renovatie uit. Dankzij de inzet van de bewoners werd naast de 1,3 miljoen euro voor het plein nog eens 170.000 euro extra toegekend voor de renovatie van het jongerencentrum. </p>
		<p>Lex is trots op het resultaat: “Ik zie het als een soort spel. Als je weet hoe de regels in elkaar steken, dan kun je heel veel bereiken. Zowel de gemeente als de bewoners hebben er baat bij dat er nauw samengewerkt wordt. Je moet met elkaar in contact blijven. En ik weet nu in ieder geval hoe!” </p>
		<p>Met de Stem van West kunnen alle bewoners hun ideeën, plannen en stellingen op de agenda krijgen, als ze genoeg stemmen werven uit de buurt.</p>
		<p>Heb je ook een goed plan? Dan kun je dat hier uploaden.</p>
	`
}, {
	id          : 5,
	createdAt   : moment(startDate).add(14, 'days'),
	video       : null,
	title       : 'Jeroen wil meer dynamiek!',
	summary     : `Hij wil bewoners enthousiasmeren mee te denken over de kansen die er liggen om hun buurt nóg beter te maken.`,
	intro       : `Jeroen wil een sfeer creëren en instrumenten ontwikkelen in West waarbij iedereen mee kan denken, invloed kan uitoefenen én kan meebeslissen over zaken in zijn buurt. Een mooi voorbeeld is de ontwerpwedstrijd voor de betegeling van de fietstunnel van de Zaanstraat in de Spaarndammerbuurt.`,
	quote       : `Op verkiezingsdag wordt elke stem geteld, op alle andere dagen wordt iedere stem gehoord.`,
	description : `
		<p>‘Amsterdammers zijn gebekt en daar ben ik heel blij mee!’ zegt Jeroen van Berkel. Hij is daar zelf een goed voorbeeld van. Jeroen is 47 jaar, heeft twee kinderen van 15 en 16, woont aan de Admiraal de Ruyterweg en praat voluit. Hij heeft zich verkiesbaar gesteld voor het Algemeen Bestuur van Stadsdeel West omdat hij ziet dat in West veel kansen en uitdagingen liggen en dat sommige mensen alleen maar een klein duwtje in de rug nodig hebben. Maar ook omdat het met veel mensen nog niet goed gaat en voor die groep wil hij zich ook inzetten.</p>
		<p>‘Met een actief lokaal bestuur staan we dicht bij mensen en ik geloof dat we hierdoor echt het verschil kunnen maken. De inbreng van bewoners is daarbij belangrijk. Als lid van het Algemeen Bestuur kan ik wel voorstellen doen, maar die worden alleen maar beter als ik die voorstellen ook toets met de bewoners. Bewoners hebben een hele scherpe kijk op wat er nodig is in hun buurt en die ervaring moeten we gebruiken.’ Door mensen te betrekken bij plannen voor hun buurt, wordt meer saamhorigheid gekweekt en voelen ze ook meer verantwoordelijkheid.</p>
		<p>Jeroen wil een sfeer creëren en instrumenten ontwikkelen in West waarbij iedereen mee kan denken, invloed kan uitoefenen én kan meebeslissen over zaken in zijn buurt. Een mooi voorbeeld is de ontwerpwedstrijd voor de betegeling van de fietstunnel van de Zaanstraat in de Spaarndammerbuurt. </p>
		<p>Via een online platform konden bewoners ontwerpen uploaden voor de betegeling van de muren van het fietstunneltje. Daarna kon iedereen stemmen op het ontwerp dat hij of zij het mooiste vond. Er kwamen 49 inzendingen en ruim 6000 mensen stemden op hun favoriete ontwerp. “We waren aangenaam verrast door de enorme energie en enthousiasme waarmee bewoners van jong tot oud aan de slag gingen. Mensen gingen bovendien zelf voor hun ontwerp campagne voeren. Zo kregen we zicht op netwerken in de buurt waar wij als stadsdeel geen weet van hadden. ” </p>
		<p>Jeroen hoopt dat hij nog meer bewoners kan enthousiasmeren om mee te denken over hoe problemen én kansen in de buurt aangepakt of benut kunnen worden. Vanuit zijn politieke rol kan hij de bewoner de juiste weg wijzen of de juiste middelen aanbieden. </p>
		<p>‘De Stem van West is een nieuw spannend platform; bewoners kunnen ideeën, plannen of stellingen indienen. Als daar voldoende stemmen op zijn uitgebracht, wordt dat plan direct besproken in het Algemeen Bestuur, samen met de indiener. “Inwoners van West krijgen daarmee een nieuw grondrecht: het recht van agendering. Dat sluit aan bij ons motto: Op verkiezingsdag wordt elke stem geteld, op alle andere dagen wordt iedere stem gehoord.’, aldus een enthousiaste Jeroen.</p>
		<p>“De afgelopen jaren heb ik veel bewoners gezien die op constructieve manier mee willen denken met het Algemeen Bestuur. Natuurlijk zijn er altijd mensen die tegen een bepaald plan zijn, maar toch praten de tegenstemmers mee over de wijze waarop iets het beste gedaan kan worden. Soms zijn er discussies maar we kunnen gelukkig in goede sfeer ruzie maken” lacht van Berkel.</p>
	`
}, {
	id          : 6,
	createdAt   : moment(startDate).add(10, 'days'),
	video       : null,
	title       : `De afstand verkleinen tussen bewoner en stadsdeel`,
	summary     : `De Stem van West helpt bewoners om directer met het stadsdeel te communiceren.`,
	intro       : `In alle stadsdelen gaan politici de buurt in om signalen van bewoners op te halen en met bewoners te praten. Ook Geert van Schaik doet dit waardoor de bewoners hem makkelijk  weten te vinden Alles dat helpt om de afstand te verkleinen tussen bewoner en stadsdeel wordt door Geert van Schaik toegejuicht.`,
	quote       : `Ik doe meer mét de mensen dan voor de mensen.`,
	description : `
		<p>Geert van Schaik denkt graag terug aan zijn tijd als twintiger toen de Staatsliedenbuurt vooral bewoond werd door krakers en alles samen werd gedaan. Ook hij was kraker en herinnert zich de tijd dat hij en zijn medebewoners samen radio en televisie maakten en bioscoopavonden organiseerden. ‘Deze saamhorigheid van destijds is waarschijnlijk de reden dat de bewoners uit deze buurt zo intensief met elkaar omgaan. Buren kennen elkaar. Er wordt nog steeds veel samen gedaan en iedereen groet elkaar in de straat’ zegt Geert. </p>
		<p>Buurtbewoners weten Geert makkelijk te vinden, maar zoals hij zelf zegt: ‘Als buurtadoptant doe ik meer mét de mensen dan vóór de mensen. Ik vind dat je mensen zoveel mogelijk zelf hun buurt moet laten besturen. Soms heb ik een rol als intermediair en help ik bewoners op weg met hun vragen. Maar de afstand tussen bewoner en stadsdeel is vrij groot. Alles dat kan helpen om deze afstand te verkleinen juich ik dan ook van harte toe. De Stem van West draagt hier zeker aan bij.’</p>
		<p>In alle stadsdelen gaan politici de buurt in om signalen van bewoners op te halen en met bewoners te praten. Maar nog niet online. Geert denkt dat West vooroploopt met dit platform. ‘Ik hoop dan ook dat veel mensen uit mijn buurt hier gebruik van maken.’ </p>
		<p>Dat Geert een actieve buurt heeft, wordt duidelijk door BeeCare, een door bewoners opgerichte stichting die als missie heeft om van de Staatsliedenbuurt een ‘beschermd bijengebied’ te maken. De stichting heeft onderzocht dat het houden van honingbijen in de stad een groot voordeel is ten opzichte van het houden van bijen op het platteland. In de stad hebben de bijen minder last van neonicotine, een voor de bijensoort gevaarlijk type pesticide.</p>
		<p>Ruim twee jaar geleden gingen bewoners van BeeCare in gesprek met de stadsdeelraad om ervoor te zorgen dat de gevaarlijke insecticiden en pesticiden die door de gemeente gebruikt werden, uit de parken en moestuinen geweerd werden. Geert hielp daarbij en fungeerde als gesprekspartner tussen de bewoners en de deelraad. Hij diende een motie in en doordat een meerderheid van de deelraad de motie ondersteunde, nam het stadsdeel de maatregel om het gebruik van schadelijke producten voor de natuur te verbieden. Bovendien werd vanuit de gemeente besloten om dit op te nemen binnen de dierenwelzijnsnota en het voor heel Amsterdam toe te passen. Dit laat duidelijk zien wat de invloed van bewoners kan zijn op de besluitvorming in hun directe omgeving.</p>
	`
}, {
	id          : 7,
	createdAt   : moment(startDate).add(7, 'days'),
	video       : null,
	title       : `Bernadette wil meer doen met ideeën uit de buurt`,
	summary     : `Huiswerklessen geven, koken voor anderen of op elkaars kinderen passen: in de wijk van Bernadette Vieverich gebeurt het allemaal.`,
	intro       : `Bernadette groeide op in Curaçao, waardoor ze het heel normaal vindt om in een maatschappij te leven met veel diversiteit. “Je moet willen samenwonen en -werken.” Daarom zet ze zich in voor gelijke kansen, gelijke rechten én participatie.`,
	quote       : `Je moet willen samenwonen én samenwerken.`,
	description : `
		<p>Ze maakt zich zorgen over de werkeloosheid. Over andere dingen is ze juist optimistisch: “Het is geweldig om te zien hoeveel mensen vrijwilligerswerk doen. Dat mensen onbetaald werk moeten doen waar ze vroeger voor betaald kregen is juist een heel onwenselijk gevolg van de reorganisatie en bezuinigingen in de zorg. Ze doen dit onder meer om zin aan hun bestaan te geven. Maar ook gewoon omdat ze hun buren willen helpen.”  </p>
		<p>Bernadette haalt de vele initiatieven aan die er ontstaan zijn in haar buurt. Mensen die zich zelf organiseren door huiswerklessen te geven, op kinderen te passen, te koken voor anderen, ouderen rond te rijden of taallessen te geven.</p>
		<p>“Ik weet dat er veel leeft onder de bewoners van West. Het is goed om nu een platform te hebben waarop mensen zichtbaar steun voor hun idee kunnen krijgen. Natuurlijk ben ik me ervan bewust dat De Stem van West een beperkte groep bereikt. Ik blijf daarom ook de straat op gaan. Mensen aanspreken bij De Hallen of bij een buurthuis. Dat vind ik belangrijk en leuk! Ik hoop dat mensen mij als buurtadoptant weten te vinden als ze me nodig hebben. Bewoners moeten hun vertegenwoordigers snel en eenvoudig kunnen bereiken. Deze site helpt daar bij.”</p>
		<p>Bernadette vindt het prettig om bewoners zo direct mogelijk te ondersteunen. Zo heeft ze in samenwerking met het buurthuis in de Guldenwinckelbuurt een pilot ontwikkeld om eenzaamheid onder ouderen te bestrijden. </p>
		<p>Ze is trots op het feit dat bewoners mee hebben gedacht over regels bij het verlenen van vergunningen aan festivals en evenementen. Mensen uit verschillende delen van West hebben zich uit gesproken over de frequentie, de openingstijden en de geluidsoverlast die de festivals in hun buurt met zich meebrengen. De bewoners hebben hun mening gegeven over wat acceptabel is en wat niet. Per buurt heeft het stadsdeel richtlijnen opgesteld. Bij het verstrekken van vergunningen wordt vanaf nu rekening gehouden met deze richtlijnen. </p>
		<p>“Het is goed dat bewoners zelf aangeven dat ze hier regels voor willen opstellen. Als ze contact met mij zoeken kan ik ze helpen om deze regels formeel vast te leggen. Ik zorg ervoor dat hun wensen bij het Algemeen Bestuur terecht komen, zodat hierover beslist wordt en beleid gemaakt kan worden” zegt Bernadette.</p>
		<p>“Doordat we als buurtadoptant veel bewoners spreken halen we goede ideeën op. Zo wordt er nu een boekje gemaakt voor ouderen. Hierin staan allemaal sociale activiteiten bij hun in de buurt zoals kook- dans- en klaverjasavonden. Maar ook telefoonnummers van hulpdiensten en huisartsen. Het is een boekje voor 65 plussers dat huis aan huis verspreid wordt. In het boekje staan allemaal ideeën die van de bewoners zelf komen.” </p>
		<p>Heb jij ook een goed voorstel? Laat het ons dan weten!</p>
	`
}, {
	id          : 8,
	createdAt   : moment(startDate).add(5, 'days'),
	video       : '{"url":"https://player.vimeo.com/video/201816452"}',
	title       : `Zelf onderwerpen op de agenda van het AB zetten`,
	summary     : `Als bewoner van Amsterdam West bepaal jij waar de politici het over moeten hebben. Dat dit uniek is wordt door Jelle de Graaf uitgelegd in dit filmpje.`,
	intro       : `Jelle vindt dat burgers zelf verantwoordelijkheid moeten krijgen én nemen. Hij hoopt dat de Stem van West bewoners aanzet om ideeën te posten waarvoor ze zich samen hard willen maken. Nu kan een bewoner een voorstel posten waarop gestemd kan worden door buurtbewoners. Als het plan genoeg stemmen krijgt, dan wordt het besproken in het Algemeen Bestuur.`,
	quote       : `In de toekomst hoop ik  dat De Stem van West niet alleen een plaats is om ideeën of plannen in te brengen, maar ook een plaats om inhoudelijke discussies te voeren.`,
	description : `
		<p>Jelle werkt als jongerenwerker en hoopt dat hij met zijn activiteiten mensen in beweging kan krijgen: “Wat ik graag zou willen van de mensen uit mijn buurt is dat men samenkomt om na te denken over het verbeteren van de buurt. Zo is na de dood van juwelier Fred Hunt een beweging van burgers ontstaan die samen zijn gekomen om de buurtbewoners met elkaar te verenigen. Ze hebben een ‘winkelstraatvereniging’ opgericht van bewoners en ondernemers samen.” Daar bespreken de bewoners en de winkeliers samen hoe ze hun buurt nog aantrekkelijker kunnen maken. Ze maken afspraken met elkaar over bijvoorbeeld de inrichting van de straat maar ook initiatieven als de Mercatorsouk, een markt die een paar keer per jaar plaatsvindt, komt uit hun koker. Ik ben trots op alle vernieuwingsprojecten die worden opgestart.”</p>
		<p>Jelle vindt dat burgers zelf verantwoordelijkheid moeten krijgen. Net zoals hij dat geleerd heeft binnen het vrijzinnige jongerencentrum waar hij werkt. ‘Iedereen heeft de sleutel maar iedereen is daarmee meteen ook verantwoordelijk voor de ruimte. Mensen leren om samen afspraken met elkaar te maken over die ruimte. Dit wil ik ook voor mijn buurt. “Jelle hoopt dat de Stem van West bewoners aanzet om ideeën te posten waarvoor ze zich samen hard willen maken. Nu kan een bewoner een idee posten waarop gestemd kan worden door buurtbewoners. Als het plan genoeg stemmen krijgt, dan wordt het besproken en opgepakt. </p>
		<p>Jelle: “In de toekomst hoop ik dat De Stem van West niet alleen een plaats is om ideeën of plannen in te brengen, maar ook een plaats om inhoudelijke discussies te voeren. Natuurlijk zonder dat ik daarbij het directe contact met de bewoners verlies, want juist daar gaat het mij om!”</p>
	`
}, {
	id          : 9,
	createdAt   : moment(startDate).add(1, 'days'),
	video       : null,
	title       : 'Laat van je horen!',
	summary     : `Ilana Rooderkerk wil dat je als Amsterdammer in West van je kunt laten horen. Met de Stem van West kun je jouw plan aan alle andere buurtbewoners presenteren.`,
	intro       : `Ilana Rooderkerk: ’Ik wil dat je als Amsterdammer in West van je kunt laten horen.’`,
	quote       : `Er is niets vervelender dan dat er niet naar je geluisterd wordt`,
	description : `
		<p>‘Er is niets vervelender dan dat er niet naar je geluisterd wordt’, vindt Ilana Rooderkerk, buurtadoptant van de Zeeheldenbuurt. ‘Ik wil dat je als Amsterdammer in West van je kunt laten horen’ zegt Ilana. Enige tijd geleden werd in Oud West een bewonersforum georganiseerd, waar bewoners hun zegje konden doen over hun buurt en wijk. </p>
		<p>Voor het bewonersforum kwamen ruim 100 bewoners bij elkaar die een afspiegeling vormen van Oud West. Oud West is een populair gebied dat veel veranderingen heeft doorgemaakt in de afgelopen jaren: er zijn horeca gelegenheden bijgekomen, toeristen vinden hun weg naar het gebied en huizenprijzen stijgen. De druk op de openbare ruimte neemt toe. Bewoners ervaren hierdoor meer overlast. </p>
		<p>Daarom kwamen de bewoners met concrete ideeën en oplossingen. Nieuw was dat zij direct in de vergadering van Algemeen Bestuur hun ideeën konden pitchen, zonder tussenkomst van ambtenaren of procedures. Een aantal voorstellen heeft het Algemeen Bestuur direct overgenomen. Zo komt er een commissie waarin horecaondernemers, winkeleigenaren, bewoners, pandeigenaren en andere ondernemers verenigd zijn. Samen kijken zij wat voor type winkel of horecagelegenheid gewenst is als er een pand leeg komt. Bewoners kunnen zo direct meepraten over een zo divers mogelijk winkelaanbod in de buurt. </p>
		<p>Andere voorstellen, zoals over fietsparkeren en afval of vakantieverhuur, worden toegevoegd  aan de acties die het stadsdeel nu al uitvoert. Om ervoor te zorgen dat de plannen niet in de la verdwijnen, is er eind januari een bijeenkomst met de ideeënmakers. </p>
		<p>Via de Stem van West kunnen bewoners zich ook uitspreken. ‘Door deze website sta je als bewoner, net als bij het bewonersforum, direct in contact met ons als bestuurscommissieleden’ zegt Ilana. ‘Je kunt een idee posten, waar anderen op kunnen stemmen. De voorstellen met de meeste stemmen zullen worden besproken in het Algemeen Bestuur. Heb je zelf een mooi plan of een goed voorstel? Post het op de site en laat van je horen!’</p>
	`
}, {
	id          : 10,
	createdAt   : moment(startDate),
	video       : '{"url":"https://player.vimeo.com/video/201816393"}',
	title       : 'Bewoners op de bres voor behoud van plantsoen',
	summary     : `Anne Janssen vertelt hoe bewoners zelf actie hebben ondernomen om hun plantsoen te behouden en mooier te maken.`,
	intro       : ``,
	quote       : `Een mooi plantsoen dankzij actieve bewoners in de buurt`,
	description : ``
}];