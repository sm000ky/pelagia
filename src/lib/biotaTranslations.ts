import { Language } from './i18n';
import { BiotaSpecimen } from '../types';

export interface SpecimenLocalization {
  commonName: string;
  observationNotes: string;
  diet: string;
  curiosityRating?: 'Common' | 'Rare' | 'Mythical' | 'Abyssal';
  anatomicalFeatures: string[];
}

export const BIOTA_TRANSLATIONS: Record<Language, Record<string, Partial<SpecimenLocalization>>> = {
  en: {}, // Uses base oceanData.ts defaults
  id: {
    'ghost-crab': {
      commonName: 'Kepiting Hantu Pasifik',
      observationNotes: 'Mobil sport-nya pantai berpasir! Bisa melesat 20 km/jam dengan mata periskop yang bisa berputar 360 derajat mengawasi predator dari udara.',
      diet: 'Remis, anak penyu, bangkai laut segar',
      anatomicalFeatures: [
        'Mata periskop 360° yang bisa melacak burung pemangsa sambil memendam tubuh di pasir',
        'Bulu insang khusus yang menyerap molekul air dari pasir basah',
        'Capit bergerigi yang bisa digesek untuk menghasilkan suara peringatan berderik'
      ]
    },
    'seagull': {
      commonName: 'Camar Pasifik',
      observationNotes: 'Ahli aerodinamika pantai yang cerdik. Suka membawa kerang keras terbang 15 meter ke angkasa lalu menjatuhkannya ke batu karang agar pecah.',
      diet: 'Kerang karang, ikan sarden, bulu babi',
      anatomicalFeatures: [
        'Paruh bengkok kuat dengan bintik merah pemicu insting makan anak burung',
        'Kelenjar garam di atas mata yang membuang kelebihan garam air laut lewat lubang hidung',
        'Lapisan bulu anti-air berlapis lilin alami pelindung dari badai pesisir'
      ]
    },
    'hermit-crab': {
      commonName: 'Kelomang Pantai',
      observationNotes: 'Arsitek cangkang berjalan. Sering mengadakan antrean barter cangkang di bebatuan pantai, di mana kelomang berbaris rapi dari yang terkecil hingga terbesar.',
      diet: 'Alga karang, lumut laut, cacing pasir',
      anatomicalFeatures: [
        'Perut spiral lunak tanpa tulang yang mengait erat pada ulir cangkang siput',
        'Kaki penahan internal yang mengunci tubuh agar tidak bisa ditarik paksa keluar',
        'Capit kanan raksasa yang berfungsi sebagai pintu lapis baja penutup cangkang'
      ]
    },
    'shore-plover': {
      commonName: 'Burung Cerek Pantai',
      observationNotes: 'Penjelajah garis pasang yang lincah. Punya trik pura-pura patah sayap di pasir untuk memancing pemangsa menjauh dari sarang telurnya.',
      diet: 'Cacing laut, udang pasir mikroskopis',
      anatomicalFeatures: [
        'Paruh merah karang sensitif berisi sensor getaran cacing bawah pasir',
        'Sayap berakselerasi tinggi untuk lepas landas kilat menghindari deburan ombak',
        'Corak bulu kamuflase mirip kerikil pantai'
      ]
    },
    'marine-iguana': {
      commonName: 'Iguana Laut Galapagos',
      observationNotes: 'Satu-satunya kadal laut di planet bumi! Menyelam menentang arus ombak ganas untuk memakan alga karang, lalu bersin menyemburkan kerak garam dari hidungnya.',
      diet: 'Alga merah dan hijau subtidal',
      anatomicalFeatures: [
        'Ekor pipih vertikal yang berfungsi sebagai baling-baling dayung kuat',
        'Cakar kait tajam untuk mencengkeram batu karang vulkanik di tengah arus liar',
        'Kelenjar hidung pembersih garam yang menyemprotkan kristal garam putih'
      ]
    },
    'clownfish-anemone': {
      commonName: 'Ikan Badut & Anemon Berbisa',
      observationNotes: 'Punya perisai lendir kimiawi ajaib yang menipu tentakel anemon agar menganggap ikan ini adalah bagian dari tubuh anemon itu sendiri.',
      diet: 'Zooplankton, alga, sisa makanan anemon',
      anatomicalFeatures: [
        'Lapisan lendir gula-protein yang mencegah pemicu harpun racun tentakel',
        'Warna jingga menyala dengan tiga garis enamel putih pemecah siluet visual',
        'Kemampuan beralih kelamin menjadi betina dominan jika pemimpin koloni gugur'
      ]
    },
    'green-turtle': {
      commonName: 'Penyu Hijau Samudra',
      observationNotes: 'Navigator purba samudra raya. Mampu mengarungi ribuan mil lautan lepas hanya dengan mengandalkan kompas magnet bumi alami di dalam kepalanya.',
      diet: 'Padang lamun, ubur-ubur pelagis, spons',
      anatomicalFeatures: [
        'Tempurung hidrodinamis berpola marmer giok pengurang gesekan air',
        'Sirip depan sayap aerofoil yang mengepak dalam ritme angka delapan abadi',
        'Kristal magnetit di dasar tengkorak pendeteksi medan geomagnetik planet'
      ]
    },
    'manta-ray': {
      commonName: 'Pari Manta Karang',
      observationNotes: 'Pesawat layang raksasa samudra. Gemar melakukan atraksi salto akrobatik berulang kali saat melintasi koridor plankton kaya nutrisi.',
      diet: 'Zooplankton mikroskopis, telur ikan',
      anatomicalFeatures: [
        'Sayap pektoral berlian berdaya luncur tinggi tanpa perlu bersusah payah',
        'Sepasang sirip tanduk sefalik yang membuka menjadi corong penyendok plankton',
        'Pola totol perut unik yang berfungsi layaknya sidik jari manusia'
      ]
    },
    'lions-mane-jelly': {
      commonName: 'Ubur-Ubur Surai Singa',
      observationNotes: 'Katedral renda hidup di perairan Arktik. Menjulurkan ribuan tentakel sutra halus sepanjang 30 meter layaknya tirai pembawa sengatan mematikan.',
      diet: 'Ikan kecil, larva krustasea, ubur-ubur lain',
      anatomicalFeatures: [
        'Lonceng delapan lekukan berkontraksi dalam irama jet hidrolik konstan',
        'Lebih dari 1.200 helai tentakel penyengat yang mampu melumpuhkan mangsa seketika',
        'Pendar bioluminesen biru kehijauan yang menyala saat terganggu arus'
      ]
    },
    'whale-shark': {
      commonName: 'Hiu Paus Bintang',
      observationNotes: 'Ikan terbesar di jagat raya yang berhati lembut. Tubuhnya dihiasi ribuan konstelasi putih ivory layaknya peta galaksi di atas kulit biru kelabu.',
      diet: 'Plankton, udang krill, telur ikan',
      anatomicalFeatures: [
        'Mulut selebar 1,5 meter dengan ribuan bantalan saring penyaring jutaan liter air',
        'Kulit setebal 10 sentimeter dari jalinan kolagen anti-serangan pemangsa',
        'Pola tutul putih astronomis yang permanen sepanjang hidupnya'
      ]
    },
    'blue-whale': {
      commonName: 'Paus Biru Antartika',
      observationNotes: 'Makhluk hidup paling kolosal yang pernah menghuni semesta. Jantungnya sebesar mobil, dan sekali meluncur bisa menampung 90 ton air laut di kantung tenggorokannya.',
      diet: 'Udang krill (hingga 4 ton per hari)',
      anatomicalFeatures: [
        'Lipatan tenggorokan ventral elastis yang mekar menjadi parasut raksasa',
        'Pelat balin keratin penyaring krill pengganti gigi',
        'Nyanyian suara infrasonik frekuensi 10-40 Hz yang merambat menembus ribuan kilometer'
      ]
    },
    'great-white': {
      commonName: 'Hiu Putih Raksasa',
      observationNotes: 'Predator puncak berkecepatan torpedo. Mampu melompat keluar sepenuhnya dari permukaan laut saat menerkam anjing laut dari kedalaman.',
      diet: 'Singa laut, lumba-lumba, ikan tuna',
      anatomicalFeatures: [
        'Sensor pori Ampullae of Lorenzini pendeteksi denyut listrik otot mangsa',
        'Deretan gigi gerigi segitiga tajam pada sistem sabuk konveyor berjalan',
        'Sistem pertukaran panas internal yang menjaga suhu otot 14°C lebih hangat dari air dingin'
      ]
    },
    'flying-fish': {
      commonName: 'Ikan Terbang Empat Sayap',
      observationNotes: 'Ahli kabur udara! Mengepakkan ekor 70 kali per detik di atas riak air sebelum membuka sayap layang dan meluncur sejauh 400 meter di atas angin laut.',
      diet: 'Plankton, kopepoda, larva ikan',
      anatomicalFeatures: [
        'Sirip pektoral raksasa yang berfungsi layaknya sayap pesawat layang',
        'Ekor bercabang panjang sebelah bawah sebagai motor pendorong lepas landas',
        'Kornea mata datar yang mampu melihat tajam di dalam air maupun di udara'
      ]
    },
    'sailfish': {
      commonName: 'Ikan Layaran Indo-Pasifik',
      observationNotes: 'Perenang tercepat di muka bumi! Mampu melesat hingga 110 km/jam sambil membentangkan layar biru kobaltnya untuk memecah gerombolan ikan.',
      diet: 'Cumi-cumi, ikan kembung, ikan terbang',
      anatomicalFeatures: [
        'Layar punggung megah bertotol emas yang bisa dilipat rata ke dalam lekukan tubuh',
        'Moncong tombak aerodinamis pembelah arus dan pemukul mangsa',
        'Sel kulit kromatofor kilat yang memancarkan pendar biru elektrik saat berburu'
      ]
    },
    'sea-otter': {
      commonName: 'Berang-Berang Laut Utara',
      observationNotes: 'Pakar alat batu dari dunia mamalia laut. Mengapung telentang santai di hamparan rumput laut sambil memecahkan cangkang bulu babi di dadanya memakai batu pipih kesayangan.',
      diet: 'Bulu babi, kerang abalon, kepiting',
      anatomicalFeatures: [
        'Bulu terpadat di dunia binatang dengan 150.000 helai rambut per sentimeter persegi',
        'Kantung kulit khusus di bawah ketiak tempat menyimpan batu pemecah favorit',
        'Kaki belakang berselaput untuk manuver mengapung santai gaya punggung'
      ]
    },
    'giant-octopus': {
      commonName: 'Gurita Raksasa Pasifik',
      observationNotes: 'Raja kamuflase cerdas dari dasar karang. Memiliki 3 jantung, darah biru tembaga, dan otak desentralisasi di mana dua pertiga neuronnya berada di delapan lengannya.',
      diet: 'Kepiting, lobster, hiu kecil',
      anatomicalFeatures: [
        'Delapan lengan berotot otonom dengan 2.000 mangkok hisap berkemampuan mencicipi rasa',
        'Paruh kitin keras layaknya paruh burung nuri pemecah cangkang terkuat',
        'Kulit kromatofor pintar yang mampu merubah warna dan tekstur dalam 0,2 detik'
      ]
    },
    'ocean-sunfish': {
      commonName: 'Mola-Mola (Ikan Matahari)',
      observationNotes: 'Ikan bertulang terberat di dunia yang berbentuk seperti kepala ikan buntung raksasa. Suka rebahan miring di permukaan laut untuk berjemur menghangatkan badan.',
      diet: 'Ubur-ubur, salpa, ctenofora',
      anatomicalFeatures: [
        'Sirip clavus bergelombang pengganti ekor konvensional',
        'Moncong bulat berparuh menyatu yang tidak pernah tertutup',
        'Kulit tulang rawan tebal menyerupai karet busa penahan dingin laut dalam'
      ]
    },
    'barreleye': {
      commonName: 'Ikan Kepala Kubah Kaca (Barreleye)',
      observationNotes: 'Keajaiban anatomi laut remang! Memiliki tengkorak berkubah transparan bening berisi cairan dengan mata silinder hijau zamrud yang bisa berputar menatap ke atas.',
      diet: 'Siphonophora berbisa, kopepoda bercahaya',
      anatomicalFeatures: [
        'Kubah kranium tembus pandang pelindung mata dari sengatan ubur-ubur',
        'Mata tabung hijau bercahaya penyaring sisa cahaya matahari permukaan',
        'Mulut presisi mungil untuk mencuri makanan dari sulur beracun'
      ]
    },
    'glass-squid': {
      commonName: 'Cumi-Cumi Kaca Tembus Pandang',
      observationNotes: 'Hampir 100% transparan layaknya kaca jernih! Hanya organ pencernaannya yang tampak, dan ia memancarkan cahaya penyamar siluet di bawah matanya agar tak terlihat predator.',
      diet: 'Amfipoda, ikan lentera kecil',
      anatomicalFeatures: [
        'Rongga tubuh berisi larutan amonium klorida untuk melayang tanpa bobot',
        'Fotofor bawah mata penghilang bayangan tubuh dari pandangan bawah',
        'Dapat menggulung kepala ke dalam mantel dan menggelembung jadi bola duri saat terancam'
      ]
    },
    'giant-oarfish': {
      commonName: 'Oarfish Naga Laut Raksasa',
      observationNotes: 'Inspirasi legenda naga laut kuno! Bertubuh pita perak sepanjang 8 meter yang berenang tegak vertikal di air sambil melambaikan jambul merah mahkota menyala.',
      diet: 'Krill laut, cumi-cumi kecil, ubur-ubur',
      anatomicalFeatures: [
        'Tubuh pita pipih perak mengilap tanpa sisik berkilau platinum',
        'Sirip punggung merah kirmizi dengan 400 jari-jari sutra berombak',
        'Sepasang sirip dayung panjang bertabur sensor peraba rasa arus laut'
      ]
    },
    'stoplight-loosejaw': {
      commonName: 'Ikan Sniper Lampu Merah (Loosejaw)',
      observationNotes: 'Satu dari segelintir makhluk laut yang memancarkan dan melihat cahaya merah! Menggunakan senter merah rahasia untuk memburu mangsa yang buta terhadap spektrum merah.',
      diet: 'Kopepoda, ikan lentera',
      anatomicalFeatures: [
        'Lampu fotofor infra-merah (705 nm) yang tak kasat mata bagi 99% predator lain',
        'Rahang bawah tanpa dasar yang terbuka bebas tanpa hambatan air saat menerkam',
        'Pigmen mata berbasis klorofil khusus penangkap pantulan cahaya merah'
      ]
    },
    'lanternfish': {
      commonName: 'Ikan Lentera Gletser',
      observationNotes: 'Penyumbang 65% biomassa ikan laut dalam! Setiap malam mereka bermigrasi massal triliunan ekor naik ke dekat permukaan untuk mencari makan di bawah gelap malam.',
      diet: 'Plankton, kopepoda, amfipoda',
      anatomicalFeatures: [
        'Rangkaian lampu fotofor berpola konstelasi unik di sepanjang perut',
        'Jaringan tubuh berlemak tinggi pemberi daya apung alami tanpa kantung renang gas',
        'Pupil mata hitam raksasa penangkap partikel foton redup'
      ]
    },
    'bigeye-tuna': {
      commonName: 'Tuna Mata Lebar',
      observationNotes: 'Predator tangguh bersuhu tubuh hangat yang sanggup menyelam ratusan meter ke zona remang berkat mata bulat raksasa bersistem pemanas retina.',
      diet: 'Ikan lentera, cumi-cumi, ikan pedang',
      anatomicalFeatures: [
        'Mata bulat raksasa dengan retina tebal penembus bayangan mangsa remang',
        'Penukar panas vaskular yang menjaga suhu mata 6°C lebih hangat dari air beku',
        'Tubuh torpedo hidrodinamis warna perunggu dan nila elektrik'
      ]
    },
    'snipe-eel': {
      commonName: 'Belut Paruh Burung (Snipe Eel)',
      observationNotes: 'Belut berpita kurus dengan 750 ruas tulang belakang! Paruhnya melengkung keluar seperti gunting terbalik dan tak pernah bisa menutup, bekerja layaknya jaring perekat.',
      diet: 'Udang antena panjang, krustasea kecil',
      anatomicalFeatures: [
        'Paruh bergerigi terbalik pemikat dan pengait antena udang liar',
        'Tulang belakang terpanjang di antara semua hewan bertulang belakang di bumi',
        'Posisi anus unik yang terletak tepat di belakang leher'
      ]
    },
    'cockatoo-squid': {
      commonName: 'Cumi-Cumi Jambul Kakaktua',
      observationNotes: 'Cumi-cumi berdinding balon bening yang punya cakar kait berputar 360 derajat layaknya cakar kucing di ujung tentakelnya.',
      diet: 'Ikan mesopelagis, udang laut',
      anatomicalFeatures: [
        'Dua baris cakar kait berputar 360° pengunci mangsa licin',
        'Sepasang lampu pendar warna-warni di bawah bola mata',
        'Mantel balon transparan berisi cairan garam amonium'
      ]
    },
    'silver-hatchetfish': {
      commonName: 'Ikan Kapak Perak (Hatchetfish)',
      observationNotes: 'Setipis pisau cukur (kurang dari 3 mm) dengan cermin guanin keperakan. Sinar lampu di perutnya bersinar ke bawah dengan intensitas pas menyamai cahaya langit.',
      diet: 'Ostrakoda, kopepoda',
      anatomicalFeatures: [
        'Tubuh perak ultra-tipis pemantul cahaya samping',
        'Prisma fotofor ventral penyamar bayangan dari predator di bawahnya',
        'Mata binokular yang terkunci permanen menatap ke atas'
      ]
    },
    'spiny-dogfish': {
      commonName: 'Hiu Duri Purba',
      observationNotes: 'Hiu mungil penjelajah zona remang yang bisa hidup hingga umur 100 tahun. Memiliki duri bertanduk berbisa di depan kedua sirip punggungnya.',
      diet: 'Ikan haring, cumi-cumi, kepiting',
      anatomicalFeatures: [
        'Duri sirip punggung keras berbisa penusuk mulut pemangsa',
        'Lapisan mata reflektif hijau tapetum lucidum penguat cahaya',
        'Masa kehamilan 24 bulan, rekor kehamilan terpanjang di antara vertebrata'
      ]
    },
    'red-crab': {
      commonName: 'Kepiting Merah Pelagis',
      observationNotes: 'Berenang terbalik di air terbuka dengan kibasan ekor kipas. Warna merah menyala menyerap gelombang biru laut dalam, membuatnya tampak hitam pekat tak terlihat.',
      diet: 'Diatom laut, plankton, detritus',
      anatomicalFeatures: [
        'Kipas ekor dayung penopang manuver berenang terbalik di air lepas',
        'Pigmen astaxanthin merah pekat sebagai jubah tembus pandang di laut dalam',
        'Kaki peraba berbulu penyaring rantai diatom mikroskopis'
      ]
    },
    'anglerfish': {
      commonName: 'Anglerfish Bungkuk (Monster Midnight)',
      observationNotes: 'Simbol kegelapan laut dalam. Menjulurkan joran pancing berkepala lentera bakteri fosfor tepat di depan deretan taring jarum kristal yang tak bisa terbuka lagi jika mangsa sudah masuk.',
      diet: 'Ikan viper, ikan lentera, cumi-cumi kaca',
      anatomicalFeatures: [
        'Joran pancing esca bercahaya berisi jutaan koloni bakteri Photobacterium hidup',
        'Gigi taring jarum berengsel satu arah yang mengunci mangsa selamanya',
        'Dimorfisme ekstrem di mana jantan kerdil menyatu permanen menjadi parasit tubuh betina'
      ]
    },
    'gulper-eel': {
      commonName: 'Belut Pelikan Gendut',
      observationNotes: 'Mulutnya berupa kantung raksasa mirip paruh pelikan yang bisa mekar menelan mangsa yang bobotnya jauh melampaui tubuhnya sendiri, dengan ujung ekor berlampu merah delima.',
      diet: 'Krustasea besar, ikan berukuran jumbo',
      anatomicalFeatures: [
        'Rahang kantung pelikan raksasa fleksibel yang menggantung longgar',
        'Ekor cambuk panjang berujung suar cahaya warna merah delima',
        'Rangka tulang tereduksi hampir tanpa kalsium untuk efisiensi energi ekstrem'
      ]
    },
    'viperfish': {
      commonName: 'Viperfish Taring Belati',
      observationNotes: 'Pemegang rekor taring terbesar dibanding proporsi tubuh di dunia ikan! Taring kristalnya melengkung begitu panjang sampai menembus keluar tengkorak melewati matanya.',
      diet: 'Ikan lentera, bristlemouth, cumi-cumi',
      anatomicalFeatures: [
        'Taring pedang melengkung yang terkunci di soket luar tengkorak kepala',
        'Tulang leher bersuspensi peredam kejut benturan saat menerjang mangsa',
        'Ratusan lampu fotofor berjajar di perut layaknya lampu lintasan pacu'
      ]
    },
    'giant-squid': {
      commonName: 'Cumi-Cumi Raksasa (Sang Kraken)',
      observationNotes: 'Kraken mitologis yang nyata adanya! Matanya sebesar piring makan (terbesar di dunia hewan) agar bisa menangkap pendaran air saat paus sperma datang menyergap.',
      diet: 'Ikan laut dalam, ikan orange roughy, cumi-cumi lain',
      anatomicalFeatures: [
        'Dua tentakel penangkap sepanjang 10 meter dengan mangkok hisap bergigi gergaji kitin',
        'Bola mata selebar 30 sentimeter penangkap foton tunggal dalam kegelapan pekat',
        'Paruh kitin sekuat tang hidrolik pemutus kawat baja'
      ]
    },
    'fangtooth': {
      commonName: 'Fangtooth (Taring Raksasa)',
      observationNotes: 'Ikan bertampang monster dengan taring bawah begitu panjang sampai evolusi membuatkan dua lubang saku khusus di sisi otaknya agar rahangnya bisa menutup tanpa menusuk otak.',
      diet: 'Krustasea, cumi-cumi, ikan kecil',
      anatomicalFeatures: [
        'Saku penampung taring di samping otak pelindung tempurung kepala',
        'Sistem gurat sisi berongga sarang lebah peraba getaran mikro air',
        'Sisik berduri kasar layaknya baju zirah kuno'
      ]
    },
    'black-swallower': {
      commonName: 'Black Swallower (Penelan Raksasa)',
      observationNotes: 'Punya perut elastis ajaib yang sanggup melar balon menelan ikan lain yang ukurannya dua kali panjang tubuhnya dan sepuluh kali bobot badannya sendiri.',
      diet: 'Ikan bertulang laut dalam berukuran masif',
      anatomicalFeatures: [
        'Perut membran transparan elastis yang mengembang menampung korban utuh',
        'Jantung yang terdorong maju ke tenggorokan saat proses pencernaan berlangsung',
        'Gigi langit-langit pengayuh mangsa mundur masuk ke lambung'
      ]
    },
    'vampire-squid': {
      commonName: 'Cumi-Cumi Drakula dari Neraka',
      observationNotes: 'Bukan cumi-cumi, bukan gurita. Saat diserang, ia membalik jubah selaput hitamnya keluar layaknya buah nanas berduri untuk melindungi tubuh lunaknya.',
      diet: 'Salju laut (butiran organik jatuh, jasad renik plankton)',
      anatomicalFeatures: [
        'Jubah berselaput hitam kirmizi layaknya mantel Drakula berduri lunak',
        'Sepasang filamen sensorik penarik yang bisa digulung ke saku mantel',
        'Ujung tentakel pemancar awan lendir bercahaya pembingung musuh'
      ]
    },
    'ghost-shark': {
      commonName: 'Hiu Hantu Biru (Chimaera)',
      observationNotes: 'Garis keturunan purba berumur 400 juta tahun. Kulitnya dihiasi alur saluran sensorik bergaris-garis yang tampak persis seperti jahitan benang Frankenstein.',
      diet: 'Kepiting lumpur, moluska, cacing abisal',
      anatomicalFeatures: [
        'Alur sensorik terbuka bermotif jahitan benang peraba medan listrik',
        'Pelat gigi mineral keras abadi penggiling cangkang keras kerang',
        'Sirip dada sayap lebar pengayuh arus dasar laut tenang'
      ]
    },
    'dumbo-octopus': {
      commonName: 'Gurita Dumbo Telinga Sirip',
      observationNotes: 'Gurita imut yang melayang anggun di dasar lumpur samudra dengan mengepakkan sepasang sirip telinga di atas matanya, menelan mangsa utuh tanpa mengunyah.',
      diet: 'Isopoda, cacing lumpur, amfipoda',
      anatomicalFeatures: [
        'Sirip telinga berotot kemudi dayung melayang tanpa suara',
        'Lengan berselaput parasut pembentuk ruang hampa penangkap cacing lumpur',
        'Tidak memiliki kantung tinta karena tidak berguna dalam kegelapan mutlak'
      ]
    },
    'dragonfish': {
      commonName: 'Black Dragonfish (Naga Hitam)',
      observationNotes: 'Berkulit ultra-hitam yang menyerap 99,5% cahaya. Menggoyangkan umpan jenggot dagu bercahaya layaknya cacing berkedip tepat di depan taring jarum tembus pandang.',
      diet: 'Ikan lentera, krustasea midnight',
      anatomicalFeatures: [
        'Kulit berstruktur nano melanosom penyerap cahaya anti-pantulan senter musuh',
        'Jenggot dagu panjang berujung lentera fosfor hijau pemikat',
        'Gigi taring apatit transparan yang tidak memantulkan secercah cahaya pun'
      ]
    },
    'coelacanth': {
      commonName: 'Coelacanth Indonesia (Fosil Hidup)',
      observationNotes: 'Fosil hidup legendaris yang sempat dikira punah 66 juta tahun lalu! Sirip berlobusnya memiliki tulang sendi yang berenang dengan ayunan bergantian mirip kuda berlari.',
      diet: 'Ikan lentera, belut dasar laut, sotong',
      anatomicalFeatures: [
        'Sirip berlobus bertulang mirip kaki hewan darat purba tetrapoda',
        'Organ rostral di moncong berisi tabung gel penerima denyut listrik',
        'Tulang punggung notokorda berongga berisi minyak penahan tekanan laut dalam'
      ]
    },
    'tripod-fish': {
      commonName: 'Ikan Berkaki Tiga (Tripod Fish)',
      observationNotes: 'Berdiri mematung di atas endapan lumpur abisal menggunakan tiga sirip stilt kaku sepanjang satu meter, menghadap arus menunggu plankton melayang masuk ke mulutnya.',
      diet: 'Kopepoda arus, udang mysid',
      anatomicalFeatures: [
        'Tiga sirip stilt penopang yang mengunci kaku menopang tubuh di atas lumpur halus',
        'Mata buta terdegenerasi digantikan oleh sepasang sungut sirip dada peraba arus',
        'Hermafrodit simultan yang mampu memproduksi sperma dan sel telur sekaligus'
      ]
    },
    'sea-pig': {
      commonName: 'Babi Laut Abisal (Sea Pig)',
      observationNotes: 'Teripang merah muda kembung yang berjalan berbaris di atas lumpur abisal menggunakan kaki tabung hidrolik air, berpesta memakan bangkai paus jatuh.',
      diet: 'Endapan organik sedimen, bangkai paus purba',
      anatomicalFeatures: [
        'Kaki tabung hidrolik bertekanan air pengayuh lumpur hisap',
        'Antena sensorik atas pendeteksi aroma protein bangkai paus dari kejauhan',
        'Dermis cairan jeli rapuh yang akan mencair jika dibawa ke tekanan udara permukaan'
      ]
    },
    'faceless-cusk': {
      commonName: 'Belut Tanpa Wajah (Faceless Cusk)',
      observationNotes: 'Ikan aneh yang tampak sama sekali tidak memiliki wajah! Matanya terkubur jauh di bawah lapisan kulit tebal, sementara mulutnya menyembul di bawah kepala.',
      diet: 'Cacing laut, krustasea lumpur',
      anatomicalFeatures: [
        'Kepala polos tanpa fitur wajah luar penahan gesekan endapan sedimen',
        'Mulut vakum bawah yang menjulur seperti corong penyedot debu otomatis',
        'Moncong gelatinosa pembawa jutaan reseptor penciuman kimiawi'
      ]
    },
    'giant-isopod': {
      commonName: 'Kutu Laut Raksasa Abisal',
      observationNotes: 'Kerabat raksasa kutu kayu darat yang membesar drastis di dasar laut. Dapat berpuasa bertahan hidup lebih dari 5 tahun tanpa makan sebutir pun.',
      diet: 'Bangkai paus karam, cumi-cumi mati, kepiting',
      anatomicalFeatures: [
        'Baju zirah pelat kalsium fosfat bertumpuk yang bisa menggulung jadi bola baja',
        'Empat belas kaki pencengkeram berkait tajam penahan bangkai licin',
        'Mata majemuk emas 4.000 faset berlapis cermin tapetum pengumpul pendar'
      ]
    },
    'abyssal-ctenophore': {
      commonName: 'Ubur-Ubur Sisir Pelangi Abisal',
      observationNotes: 'Lentera kristal berjalan di dasar abisal. Delapan baris lempeng silia mikroskopisnya membiaskan stray foton menjadi gelombang kilau pelangi neon yang mempesona.',
      diet: 'Ctenofora kecil, salpa, ubur-ubur hidromedusa',
      anatomicalFeatures: [
        'Delapan baris silia sisir berdenyut ritmis penggerak renang lambat',
        'Lempeng difraksi kristalin pembias spektrum pelangi neon tanpa fotofor',
        'Mulut elastis raksasa penelan mangsa seukuran tubuhnya'
      ]
    },
    'mariana-snailfish': {
      commonName: 'Snailfish Palung Mariana',
      observationNotes: 'Hewan bertulang belakang terdalam di muka bumi! Kulitnya merah jambu tembus pandang menampakkan organ dalam, dengan tulang rawan elastis penahan tekanan 800 atmosfer.',
      diet: 'Kutu amfipoda palung hadal',
      anatomicalFeatures: [
        'Konsentrasi molekul osmolit TMAO raksasa pelindung enzim dari kehancuran tekanan',
        'Tengkorak dan tulang rawan fleksibel mirip karet peredam kompresi 12.000 PSI',
        'Tanpa kantung renang gas yang berisiko meledak hancur di palung terdalam'
      ]
    },
    'hadal-amphipod': {
      commonName: 'Kutu Amfipoda Super Raksasa',
      observationNotes: 'Kutu laut pemecah rekor gigantisme laut dalam, tumbuh 20 kali lebih besar dari sepupunya di pantai berkat dingin beku dan tingginya kadar oksigen palung Mariana.',
      diet: 'Bangkai jatuh, kayu karam terdampar di palung',
      anatomicalFeatures: [
        'Gigantisme palung hadal akibat metabolisme dingin ekstrem',
        'Eksoskeleton bertulang zirah yang diperkuat mineral aluminium dan seng alami',
        'Enzim selulase khusus dalam usus pemecah serat kayu karam purba'
      ]
    },
    'ethereal-snailfish': {
      commonName: 'Snailfish Siluman Palung',
      observationNotes: 'Ikan kecebong hantu serba putih tembus pandang yang melayang tanpa susah payah di arus Palung Mariana pada kedalaman -8.400 meter.',
      diet: 'Amfipoda mikro, isopoda hadal',
      anatomicalFeatures: [
        'Jaringan tubuh gelatinosa tanpa pigmen penyesuai massa jenis air sekitar',
        'Piringan hisap ventral hasil modifikasi sirip panggul pengait batu tebing jurang',
        'Protein seluler piezo-toleran fungsional di bawah tekanan 850 atmosfer'
      ]
    },
    'hadal-cucumber': {
      commonName: 'Mentimun Laut Mariana',
      observationNotes: 'Menyusun hingga 90% biomassa hidup di titik terdalam dunia. Merayap dalam koloni masif menyapu lumpur endapan organik di dasar bumi.',
      diet: 'Sedimen organik, lapisan bakteri palung',
      anatomicalFeatures: [
        'Jaringan kolagen mutabel yang bisa berubah dari keras kaku menjadi cair sesuka hati',
        'Mahkota tentakel penyekop sedimen nutrisi ke dalam saluran cerna',
        'Pernapasan langsung menyerap oksigen menembus kulit tipis'
      ]
    },
    'xenophyophore': {
      commonName: 'Amoeba Raksasa Sel Tunggal',
      observationNotes: 'Salah satu makhluk hidup bersel tunggal terbesar di jagat raya! Membangun rumah labirin berdiameter 20 cm dari butiran pasir laut yang dilem dengan semen organik.',
      diet: 'Partikel organik melayang, bakteri sedimen',
      anatomicalFeatures: [
        'Satu sel raksasa tanpa pembelahan dinding yang memuat ribuan inti sel aktif',
        'Cangkang labirin agglutinasi dari pasir dan duri spons laut yang direkatkan',
        'Mengkonsentrasikan unsur timbal radioaktif dalam pelet buangan alaminya'
      ]
    },
    'hadal-tubeworm': {
      commonName: 'Cacing Tabung Challenger Deep',
      observationNotes: 'Menghuni lantai geologis terdalam planet bumi (-10.994m). Tidak punya mulut atau saluran cerna, hidup murni dari bakteri pengolah sulfur beracun di dalam perutnya.',
      diet: 'Hidrogen sulfida dari bakteri kemosintetik',
      anatomicalFeatures: [
        'Tabung kitin putih pelindung mahkota insang vaskular merah darah',
        'Organ trofosom berisi miliaran bakteri pengolah sulfur menjadi gula energi',
        'Molekul hemoglobin khusus berkemampuan mengikat oksigen dan racun belerang sekaligus'
      ]
    }
  },
  ja: {
    'ghost-crab': {
      commonName: 'スナガニ (砂蟹)',
      observationNotes: '砂浜の超高速スプリンター！時速20kmで疾走し、360度回転する潜望鏡のような眼で空の天敵を監視します。',
      diet: '二枚貝、ウミガメの孵化幼体、有機物',
      anatomicalFeatures: [
        '砂に潜りながら全方位を監視できる360°回転式複眼',
        '湿った砂から微細な水分を吸収する特殊なエラ毛',
        '縄張りを主張する警戒音を鳴らす摩擦爪'
      ]
    },
    'blue-whale': {
      commonName: 'シロナガスクジラ (白長須鯨)',
      observationNotes: '地球史上最大の生命体！心臓は小型車ほどあり、一度の突進捕食で90トンの海水とオキアミを喉袋に飲み込みます。',
      diet: 'オキアミ (1日最大4トン)',
      anatomicalFeatures: [
        '90トンの海水を包み込む伸縮自在の腹部プリーツ',
        '歯の代わりにオキアミを濾し取る数百枚のヒゲ板',
        '数千キロ先まで届く10〜40Hzの超低周波水中歌'
      ]
    },
    'barreleye': {
      commonName: 'デメニギス (管眼魚)',
      observationNotes: '深海の奇跡！透明なドーム状の頭部の中に、真上を向いたエメラルドグリーンの筒状の眼が収まっています。',
      diet: 'クダクラゲの触手、発光甲殻類',
      anatomicalFeatures: [
        'クラゲの刺胞から眼を守る透明な頭部シールド',
        '真上から正面へ回転可能な緑色レンズの筒状眼',
        '触手から獲物を器用に奪い取る精密な小型の口'
      ]
    },
    'mariana-snailfish': {
      commonName: 'マリアナスネイルフィッシュ (超深海魚)',
      observationNotes: '地球最深部で捕獲された脊椎動物！半透明の桃色の皮膚と柔軟な軟骨骨格で、800気圧の破滅的水圧に耐え抜きます。',
      diet: '超深海ヨコエビ類',
      anatomicalFeatures: [
        'タンパク質の変性を防ぐ高濃度TMAO圧力保護分子',
        'ゴムのようにしなる無石灰化軟骨骨格',
        '超高圧下で破裂するリスクのある浮き袋を完全放棄'
      ]
    }
  }
};

/**
 * Returns a localized copy of BiotaSpecimen based on chosen language
 */
export function getLocalizedSpecimen(specimen: BiotaSpecimen, lang: Language): BiotaSpecimen {
  if (lang === 'en') return specimen;

  const overrides = BIOTA_TRANSLATIONS[lang]?.[specimen.id];
  if (!overrides) return specimen;

  return {
    ...specimen,
    commonName: overrides.commonName || specimen.commonName,
    observationNotes: overrides.observationNotes || specimen.observationNotes,
    diet: overrides.diet || specimen.diet,
    curiosityRating: overrides.curiosityRating || specimen.curiosityRating,
    anatomicalFeatures: overrides.anatomicalFeatures || specimen.anatomicalFeatures,
  };
}
