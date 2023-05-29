var getJSON = function (url, id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response, id);
        } else {
            callback(status, xhr.response, id);
        }
    };
    xhr.send();
};


var surah_names_transliteration = ["", "Al Faatiha", "Al Baqara", "Aal i Imraan", "An Nisaa", "Al Maaida", "Al An'aam", "Al A'raaf", "Al Anfaal", "At Tawba", "Yunus", "Hud", "Yusuf", "Ar Ra'd", "Ibrahim", "Al Hijr", "An Nahl", "Al Israa", "Al Kahf", "Maryam", "Taa Haa", "Al Anbiyaa", "Al Hajj", "Al Muminoon", "An Noor", "Al Furqaan", "Ash Shu'araa", "An Naml", "Al Qasas", "Al Ankaboot", "Ar Room", "Luqman", "As Sajda", "Al Ahzaab", "Saba", "Faatir", "Yaseen", "As Saaffaat", "Saad", "Az Zumar", "Al Ghaafir", "Fussilat", "Ash Shura", "Az Zukhruf", "Ad Dukhaan", "Al Jaathiya", "Al Ahqaf", "Muhammad", "Al Fath", "Al Hujuraat", "Qaaf", "Adh Dhaariyat", "At Tur", "An Najm", "Al Qamar", "Ar Rahmaan", "Al Waaqia", "Al Hadid", "Al Mujaadila", "Al Hashr", "Al Mumtahana", "As Saff", "Al Jumu'a", "Al Munaafiqoon", "At Taghaabun", "At Talaaq", "At Tahrim", "Al Mulk", "Al Qalam", "Al Haaqqa", "Al Ma'aarij", "Nooh", "Al Jinn", "Al Muzzammil", "Al Muddaththir", "Al Qiyaama", "Al Insaan", "Al Mursalaat", "An Naba", "An Naazi'aat", "Abasa", "At Takwir", "Al Infitaar", "Al Mutaffifin", "Al Inshiqaaq", "Al Burooj", "At Taariq", "Al A'laa", "Al Ghaashiya", "Al Fajr", "Al Balad", "Ash Shams", "Al Lail", "Ad Dhuhaa", "Ash Sharh", "At Tin", "Al Alaq", "Al Qadr", "Al Bayyina", "Az Zalzala", "Al Aadiyaat", "Al Qaari'a", "At Takaathur", "Al Asr", "Al Humaza", "Al Fil", "Quraish", "Al Maa'un", "Al Kawthar", "Al Kaafiroon", "An Nasr", "Al Masad", "Al Ikhlaas", "Al Falaq", "An Naas"];
var surah_names_translation = ["", "The Opening", "The Cow", "The Family of Imraan", "The Women", "The Table", "The Cattle", "The Heights", "The Spoils of War", "The Repentance", "Jonas", "Hud", "Joseph", "The Thunder", "Abraham", "The Rock", "The Bee", "The Night Journey", "The Cave", "Mary", "Taa-Haa", "The Prophets", "The Pilgrimage", "The Believers", "The Light", "The Criterion", "The Poets", "The Ant", "The Stories", "The Spider", "The Romans", "Luqman", "The Prostration", "The Clans", "Sheba", "The Originator", "Yaseen", "Those drawn up in Ranks", "The letter Saad", "The Groups", "The Forgiver", "Explained in detail", "Consultation", "Ornaments of gold", "The Smoke", "Crouching", "The Dunes", "Muhammad", "The Victory", "The Inner Apartments", "The letter Qaaf", "The Winnowing Winds", "The Mount", "The Star", "The Moon", "The Beneficent", "The Inevitable", "The Iron", "The Pleading Woman", "The Exile", "She Who Is Examined", "The Ranks", "Friday", "The Hypocrites", "Mutual Disillusion", "Divorce", "The Prohibition", "The Sovereignty", "The Pen", "The Reality", "The Ascending Stairways", "Noah", "The Jinn", "The Enshrouded One", "The Cloaked One", "The Resurrection", "Man", "The Emissaries", "The Announcement", "Those who drag forth", "He frowned", "The Overthrowing", "The Cleaving", "Defrauding", "The Splitting Open", "The Constellations", "The Morning Star", "The Most High", "The Overwhelming", "The Dawn", "The City", "The Sun", "The Night", "The Morning Hours", "The Consolation", "The Fig", "The Clot", "The Power, Fate", "The Evidence", "The Earthquake", "The Chargers", "The Calamity", "Competition", "The Declining Day", "The Traducer", "The Elephant", "Quraysh", "Almsgiving", "Abundance", "The Disbelievers", "Divine Support", "The Palm Fibre", "Sincerity", "The Dawn", "Mankind"];
var surah_names_arabic = ["", "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "ابراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبإ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الانسان", "المرسلات", "النبإ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"];

function getSurahName() {
    var list = document.getElementById('list');
    var mainList = [];
    var mainObjList = [];
    for (i = 0; i < list.children.length; i++) {
        var str = (list.children[i].children[0].innerHTML).split('।')[1].trim();
        mainList.push(str);
    }

    console.log(mainList);
    mainList.forEach((e, index) => {
        var arr = e.split('(');
        mainObjList.push({
            'bName': arr[0].trim(),
            'bMean': (arr[1]).replace(')', '').trim(),
            'eName': surah_names_transliteration[index],
            'eMean': surah_names_translation[index],
            'arabic': surah_names_arabic[index],
        });
    });
    saveData(mainObjList, 'Surahs.json');
    console.log(mainObjList);
}

var i = 1;                  //  set your counter to 1

function myLoop() {         //  create a loop function
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
        featchData(i)   //  your code here
        i++;                    //  increment the counter
        if (i <= 114) {           //  if the counter < 10, call the loop function
            myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
    }, 5000)
}

function featchData(i) {


    var total_Meaning = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan/' + i + '.min.json'
    var total_Meaning_en = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-muhammadtaqiudd/' + i + '.min.json'

    getJSON(total_Meaning_en, i,
        function (err, total_Men_e, id) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                const total_Meaning_en = total_Men_e;

                getJSON(total_Meaning, i,
                    function (err, total_Men, id) {
                        if (err !== null) {
                            alert('Something went wrong: ' + err);
                        } else {

                            //const total_Men = Object.values(sData);
                            //console.log(total_Men.chapter[0].text);

                            var url_bangla = 'https://quranwbw-data.vercel.app/data/' + id + '/word-translations/bangla.json?v1681754030';

                            getJSON(url_bangla, id,
                                function (err, data, id1) {
                                    if (err !== null) {
                                        alert('Something went wrong: ' + err);
                                    } else {

                                        const bengali = Object.values(data);
                                        //console.log(bengali);
                                        var url_English = 'https://quranwbw-data.vercel.app/data/' + id1 + '/word-translations/english.json?v1681754030';

                                        getJSON(url_English, id1,
                                            function (err, data1, id2) {
                                                if (err !== null) {
                                                    alert('Something went wrong: ' + err);
                                                } else {

                                                    const english = Object.values(data1);
                                                    console.log(english);
                                                    var url_Arabic = 'https://quranwbw-data.vercel.app/data/' + id1 + '/word-translations/arabic.json?v1681754030';

                                                    getJSON(url_Arabic, id2,
                                                        function (err, data2, id3) {
                                                            if (err !== null) {
                                                                alert('Something went wrong: ' + err);
                                                            } else {

                                                                const arabic = Object.values(data2);
                                                                //console.log(arabic);

                                                                //console.log(data1);
                                                                arabic.forEach((aya, index) => {
                                                                    aya.m = bengali[index];
                                                                    aya.fm = total_Men.chapter[index].text;
                                                                    aya.e = english[index];
                                                                    //aya.a = arabic[index];
                                                                    aya.fme = total_Meaning_en.chapter[index].text;
                                                                });
                                                                
                                                                //console.log(id3);
                                                                saveData(arabic, padZero(id3) + '.js');

                                                            }
                                                        });

                                                    //console.log(data1);
                                                    // arabic.forEach((aya, index) => {
                                                    //     aya.m = bengali[index];
                                                    //     aya.fm = total_Men.chapter[index].text;
                                                    // });

                                                    // console.log(id2);
                                                    // saveData(arabic, 'Surah_' + id2 + "_" + surah_names_transliteration[id2] + '.json');

                                                }
                                            });
                                    }
                                });

                        }
                    });

            }
        });
}

function padZero(number) {
    return number.toString().padStart(3, '0');
}

function saveData(data, fileName) {
    //setTimeout(() => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var json = JSON.stringify(data),
        blob = new Blob([json], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    // }, 1000);
}