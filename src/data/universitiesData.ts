// Данные о странах и университетах

export interface University {
  name: string;
  nameRu?: string;
}

export interface CountryWithUniversities {
  name: string;
  flag: string;
  universities: University[];
}

export interface CountryGroup {
  name: string;
  countries: CountryWithUniversities[];
}

export const countryGroups: CountryGroup[] = [
  {
    name: "Европа (Западная)",
    countries: [
      {
        name: "Германия",
        flag: "🇩🇪",
        universities: [
          { name: "Technical University of Munich (TUM)", nameRu: "Технический университет Мюнхена" },
          { name: "Ludwig Maximilian University of Munich (LMU)", nameRu: "Университет Людвига-Максимилиана" },
          { name: "Heidelberg University", nameRu: "Гейдельбергский университет" }
        ]
      },
      {
        name: "Франция",
        flag: "🇫🇷",
        universities: [
          { name: "PSL University (Paris Sciences & Lettres)", nameRu: "Парижский университет наук и искусств" },
          { name: "Sorbonne University", nameRu: "Сорбонна" },
          { name: "École Polytechnique", nameRu: "Политехническая школа" }
        ]
      },
      {
        name: "Италия",
        flag: "🇮🇹",
        universities: [
          { name: "University of Bologna", nameRu: "Болонский университет" },
          { name: "Sapienza University of Rome", nameRu: "Римский университет Сапиенца" },
          { name: "Politecnico di Milano", nameRu: "Миланский политехнический университет" }
        ]
      },
      {
        name: "Испания",
        flag: "🇪🇸",
        universities: [
          { name: "University of Barcelona", nameRu: "Барселонский университет" },
          { name: "Complutense University of Madrid", nameRu: "Мадридский университет Комплутенсе" },
          { name: "Pompeu Fabra University", nameRu: "Университет Помпеу Фабра" }
        ]
      },
      {
        name: "Португалия",
        flag: "🇵🇹",
        universities: [
          { name: "University of Lisbon", nameRu: "Лиссабонский университет" },
          { name: "University of Porto", nameRu: "Университет Порту" },
          { name: "NOVA University Lisbon", nameRu: "Новый университет Лиссабона" }
        ]
      }
    ]
  },
  {
    name: "Европа (Центральная)",
    countries: [
      {
        name: "Нидерланды",
        flag: "🇳🇱",
        universities: [
          { name: "University of Amsterdam", nameRu: "Амстердамский университет" },
          { name: "Delft University of Technology", nameRu: "Делфтский технический университет" },
          { name: "Utrecht University", nameRu: "Утрехтский университет" }
        ]
      },
      {
        name: "Бельгия",
        flag: "🇧🇪",
        universities: [
          { name: "KU Leuven", nameRu: "Лёвенский католический университет" },
          { name: "Ghent University", nameRu: "Гентский университет" },
          { name: "Université Catholique de Louvain", nameRu: "Лувенский католический университет" }
        ]
      },
      {
        name: "Австрия",
        flag: "🇦🇹",
        universities: [
          { name: "University of Vienna", nameRu: "Венский университет" },
          { name: "Vienna University of Technology (TU Wien)", nameRu: "Венский технический университет" },
          { name: "Medical University of Vienna", nameRu: "Венский медицинский университет" }
        ]
      },
      {
        name: "Швейцария",
        flag: "🇨🇭",
        universities: [
          { name: "ETH Zurich", nameRu: "Швейцарская высшая техническая школа Цюриха" },
          { name: "EPFL (École Polytechnique Fédérale de Lausanne)", nameRu: "Федеральная политехническая школа Лозанны" },
          { name: "University of Zurich", nameRu: "Цюрихский университет" }
        ]
      },
      {
        name: "Польша",
        flag: "🇵🇱",
        universities: [
          { name: "University of Warsaw", nameRu: "Варшавский университет" },
          { name: "Jagiellonian University", nameRu: "Ягеллонский университет" },
          { name: "Warsaw University of Technology", nameRu: "Варшавский политехнический университет" }
        ]
      }
    ]
  },
  {
    name: "Европа (Восточная)",
    countries: [
      {
        name: "Чехия",
        flag: "🇨🇿",
        universities: [
          { name: "Charles University", nameRu: "Карлов университет" },
          { name: "Czech Technical University in Prague", nameRu: "Чешский технический университет в Праге" },
          { name: "Masaryk University", nameRu: "Масариков университет" }
        ]
      },
      {
        name: "Венгрия",
        flag: "🇭🇺",
        universities: [
          { name: "Eötvös Loránd University", nameRu: "Университет Этвёша Лоранда" },
          { name: "Budapest University of Technology and Economics", nameRu: "Будапештский технико-экономический университет" },
          { name: "University of Szeged", nameRu: "Сегедский университет" }
        ]
      },
      {
        name: "Румыния",
        flag: "🇷🇴",
        universities: [
          { name: "University of Bucharest", nameRu: "Бухарестский университет" },
          { name: "Babeș‑Bolyai University", nameRu: "Университет Бабеш-Бойяи" },
          { name: "Politehnica University of Bucharest", nameRu: "Бухарестский политехнический университет" }
        ]
      },
      {
        name: "Болгария",
        flag: "🇧🇬",
        universities: [
          { name: "Sofia University", nameRu: "Софийский университет" },
          { name: "Technical University of Sofia", nameRu: "Софийский технический университет" },
          { name: "Plovdiv University", nameRu: "Пловдивский университет" }
        ]
      },
      {
        name: "Греция",
        flag: "🇬🇷",
        universities: [
          { name: "National and Kapodistrian University of Athens", nameRu: "Афинский национальный университет" },
          { name: "Aristotle University of Thessaloniki", nameRu: "Университет Аристотеля в Салониках" },
          { name: "Athens University of Economics and Business", nameRu: "Афинский университет экономики и бизнеса" }
        ]
      }
    ]
  },
  {
    name: "Скандинавия и Ирландия",
    countries: [
      {
        name: "Финляндия",
        flag: "🇫🇮",
        universities: [
          { name: "University of Helsinki", nameRu: "Хельсинкский университет" },
          { name: "Aalto University", nameRu: "Университет Аалто" },
          { name: "University of Turku", nameRu: "Университет Турку" }
        ]
      },
      {
        name: "Швеция",
        flag: "🇸🇪",
        universities: [
          { name: "Lund University", nameRu: "Лундский университет" },
          { name: "Uppsala University", nameRu: "Уппсальский университет" },
          { name: "KTH Royal Institute of Technology", nameRu: "Королевский технологический институт" }
        ]
      },
      {
        name: "Норвегия",
        flag: "🇳🇴",
        universities: [
          { name: "University of Oslo", nameRu: "Университет Осло" },
          { name: "Norwegian University of Science and Technology (NTNU)", nameRu: "Норвежский университет естественных и технических наук" },
          { name: "University of Bergen", nameRu: "Университет Бергена" }
        ]
      },
      {
        name: "Дания",
        flag: "🇩🇰",
        universities: [
          { name: "University of Copenhagen", nameRu: "Копенгагенский университет" },
          { name: "Technical University of Denmark", nameRu: "Датский технический университет" },
          { name: "Aarhus University", nameRu: "Орхусский университет" }
        ]
      },
      {
        name: "Ирландия",
        flag: "🇮🇪",
        universities: [
          { name: "Trinity College Dublin", nameRu: "Тринити-колледж Дублина" },
          { name: "University College Dublin", nameRu: "Университетский колледж Дублина" },
          { name: "National University of Ireland Galway", nameRu: "Национальный университет Ирландии в Голуэе" }
        ]
      }
    ]
  },
  {
    name: "Европа (другие)",
    countries: [
      {
        name: "Великобритания",
        flag: "🇬🇧",
        universities: [
          { name: "University of Oxford", nameRu: "Оксфордский университет" },
          { name: "University of Cambridge", nameRu: "Кембриджский университет" },
          { name: "Imperial College London", nameRu: "Имперский колледж Лондона" }
        ]
      },
      {
        name: "Турция",
        flag: "🇹🇷",
        universities: [
          { name: "Koç University", nameRu: "Университет Коч" },
          { name: "Middle East Technical University (METU)", nameRu: "Ближневосточный технический университет" },
          { name: "Istanbul Technical University", nameRu: "Стамбульский технический университет" }
        ]
      },
      {
        name: "Кипр",
        flag: "🇨🇾",
        universities: [
          { name: "University of Cyprus", nameRu: "Кипрский университет" },
          { name: "Cyprus University of Technology", nameRu: "Кипрский технологический университет" },
          { name: "European University Cyprus", nameRu: "Европейский университет Кипра" }
        ]
      },
      {
        name: "Мальта",
        flag: "🇲🇹",
        universities: [
          { name: "University of Malta", nameRu: "Мальтийский университет" },
          { name: "Malta College of Arts, Science and Technology", nameRu: "Мальтийский колледж искусств, науки и технологий" },
          { name: "Malta VET College", nameRu: "Профессиональный колледж Мальты" }
        ]
      },
      {
        name: "Украина",
        flag: "🇺🇦",
        universities: [
          { name: "Taras Shevchenko National University of Kyiv", nameRu: "Киевский национальный университет имени Тараса Шевченко" },
          { name: "National Technical University of Ukraine (KPI)", nameRu: "Национальный технический университет Украины «КПИ»" },
          { name: "Lviv Polytechnic National University", nameRu: "Национальный университет «Львовская политехника»" }
        ]
      }
    ]
  },
  {
    name: "Северная и Южная Америка",
    countries: [
      {
        name: "США",
        flag: "🇺🇸",
        universities: [
          { name: "Massachusetts Institute of Technology (MIT)", nameRu: "Массачусетский технологический институт" },
          { name: "Stanford University", nameRu: "Стэнфордский университет" },
          { name: "Harvard University", nameRu: "Гарвардский университет" }
        ]
      },
      {
        name: "Канада",
        flag: "🇨🇦",
        universities: [
          { name: "University of Toronto", nameRu: "Университет Торонто" },
          { name: "McGill University", nameRu: "Университет Макгилла" },
          { name: "University of British Columbia", nameRu: "Университет Британской Колумбии" }
        ]
      },
      {
        name: "Мексика",
        flag: "🇲🇽",
        universities: [
          { name: "National Autonomous University of Mexico", nameRu: "Национальный автономный университет Мексики" },
          { name: "Tecnológico de Monterrey", nameRu: "Технологический институт Монтеррея" },
          { name: "Universidad Anáhuac", nameRu: "Университет Анауак" }
        ]
      },
      {
        name: "Бразилия",
        flag: "🇧🇷",
        universities: [
          { name: "University of São Paulo", nameRu: "Университет Сан-Паулу" },
          { name: "State University of Campinas", nameRu: "Государственный университет Кампинас" },
          { name: "Federal University of Rio de Janeiro", nameRu: "Федеральный университет Рио-де-Жанейро" }
        ]
      },
      {
        name: "Аргентина",
        flag: "🇦🇷",
        universities: [
          { name: "University of Buenos Aires", nameRu: "Университет Буэнос-Айреса" },
          { name: "National University of La Plata", nameRu: "Национальный университет Ла-Платы" },
          { name: "National Technological University", nameRu: "Национальный технологический университет" }
        ]
      }
    ]
  },
  {
    name: "Восточная Азия",
    countries: [
      {
        name: "Китай",
        flag: "🇨🇳",
        universities: [
          { name: "Tsinghua University", nameRu: "Университет Цинхуа" },
          { name: "Peking University", nameRu: "Пекинский университет" },
          { name: "Fudan University", nameRu: "Фуданьский университет" }
        ]
      },
      {
        name: "Япония",
        flag: "🇯🇵",
        universities: [
          { name: "University of Tokyo", nameRu: "Токийский университет" },
          { name: "Kyoto University", nameRu: "Киотский университет" },
          { name: "Tokyo Institute of Technology", nameRu: "Токийский технологический институт" }
        ]
      },
      {
        name: "Южная Корея",
        flag: "🇰🇷",
        universities: [
          { name: "Seoul National University", nameRu: "Сеульский национальный университет" },
          { name: "Korea Advanced Institute of Science and Technology (KAIST)", nameRu: "Корейский институт науки и технологий" },
          { name: "Korea University", nameRu: "Университет Корё" }
        ]
      },
      {
        name: "Сингапур",
        flag: "🇸🇬",
        universities: [
          { name: "National University of Singapore (NUS)", nameRu: "Национальный университет Сингапура" },
          { name: "Nanyang Technological University (NTU)", nameRu: "Наньянский технологический университет" },
          { name: "Singapore Management University", nameRu: "Сингапурский университет менеджмента" }
        ]
      },
      {
        name: "Малайзия",
        flag: "🇲🇾",
        universities: [
          { name: "University of Malaya", nameRu: "Университет Малайи" },
          { name: "Universiti Putra Malaysia", nameRu: "Университет Путра Малайзия" },
          { name: "Multimedia University", nameRu: "Мультимедийный университет" }
        ]
      }
    ]
  },
  {
    name: "Южная и Юго-Восточная Азия",
    countries: [
      {
        name: "Индия",
        flag: "🇮🇳",
        universities: [
          { name: "Indian Institute of Technology Bombay (IITB)", nameRu: "Индийский технологический институт Бомбея" },
          { name: "Indian Institute of Science (IISc)", nameRu: "Индийский институт науки" },
          { name: "University of Delhi", nameRu: "Делийский университет" }
        ]
      },
      {
        name: "Таиланд",
        flag: "🇹🇭",
        universities: [
          { name: "Chulalongkorn University", nameRu: "Университет Чулалонгкорн" },
          { name: "Mahidol University", nameRu: "Университет Махидол" },
          { name: "King Mongkut's University of Technology Thonburi", nameRu: "Технологический университет короля Монгкута Тхонбури" }
        ]
      },
      {
        name: "Вьетнам",
        flag: "🇻🇳",
        universities: [
          { name: "Vietnam National University, Hanoi", nameRu: "Вьетнамский национальный университет, Ханой" },
          { name: "Ho Chi Minh City University of Technology", nameRu: "Технологический университет Хошимина" },
          { name: "Hanoi University", nameRu: "Ханойский университет" }
        ]
      },
      {
        name: "Индонезия",
        flag: "🇮🇩",
        universities: [
          { name: "University of Indonesia", nameRu: "Университет Индонезии" },
          { name: "Institut Teknologi Bandung", nameRu: "Бандунгский технологический институт" },
          { name: "Gadjah Mada University", nameRu: "Университет Гаджа Мада" }
        ]
      },
      {
        name: "Филиппины",
        flag: "🇵🇭",
        universities: [
          { name: "University of the Philippines", nameRu: "Университет Филиппин" },
          { name: "Ateneo de Manila University", nameRu: "Университет Атенео де Манила" },
          { name: "De La Salle University", nameRu: "Университет Де Ла Саль" }
        ]
      }
    ]
  },
  {
    name: "Океания и Африка",
    countries: [
      {
        name: "Австралия",
        flag: "🇦🇺",
        universities: [
          { name: "Australian National University", nameRu: "Австралийский национальный университет" },
          { name: "University of Melbourne", nameRu: "Мельбурнский университет" },
          { name: "University of Sydney", nameRu: "Сиднейский университет" }
        ]
      },
      {
        name: "Новая Зеландия",
        flag: "🇳🇿",
        universities: [
          { name: "University of Auckland", nameRu: "Оклендский университет" },
          { name: "University of Otago", nameRu: "Университет Отаго" },
          { name: "Victoria University of Wellington", nameRu: "Университет Виктории в Веллингтоне" }
        ]
      },
      {
        name: "ЮАР",
        flag: "🇿🇦",
        universities: [
          { name: "University of Cape Town", nameRu: "Кейптаунский университет" },
          { name: "University of the Witwatersrand", nameRu: "Университет Витватерсранда" },
          { name: "Stellenbosch University", nameRu: "Стелленбосский университет" }
        ]
      },
      {
        name: "Египет",
        flag: "🇪🇬",
        universities: [
          { name: "Cairo University", nameRu: "Каирский университет" },
          { name: "American University in Cairo", nameRu: "Американский университет в Каире" },
          { name: "Alexandria University", nameRu: "Александрийский университет" }
        ]
      },
      {
        name: "Марокко",
        flag: "🇲🇦",
        universities: [
          { name: "Mohammed V University", nameRu: "Университет Мохаммеда V" },
          { name: "Hassan II University", nameRu: "Университет Хасана II" },
          { name: "Cadi Ayyad University", nameRu: "Университет Кади Айяда" }
        ]
      }
    ]
  }
];

export const countryFlags: Record<string, string> = {
  "Германия": "🇩🇪",
  "Франция": "🇫🇷",
  "Италия": "🇮🇹",
  "Испания": "🇪🇸",
  "Португалия": "🇵🇹",
  "Нидерланды": "🇳🇱",
  "Бельгия": "🇧🇪",
  "Австрия": "🇦🇹",
  "Швейцария": "🇨🇭",
  "Польша": "🇵🇱",
  "Чехия": "🇨🇿",
  "Венгрия": "🇭🇺",
  "Румыния": "🇷🇴",
  "Болгария": "🇧🇬",
  "Греция": "🇬🇷",
  "Финляндия": "🇫🇮",
  "Швеция": "🇸🇪",
  "Норвегия": "🇳🇴",
  "Дания": "🇩🇰",
  "Ирландия": "🇮🇪",
  "Великобритания": "🇬🇧",
  "Турция": "🇹🇷",
  "Кипр": "🇨🇾",
  "Мальта": "🇲🇹",
  "Украина": "🇺🇦",
  "США": "🇺🇸",
  "Канада": "🇨🇦",
  "Мексика": "🇲🇽",
  "Бразилия": "🇧🇷",
  "Аргентина": "🇦🇷",
  "Китай": "🇨🇳",
  "Япония": "🇯🇵",
  "Южная Корея": "🇰🇷",
  "Сингапур": "🇸🇬",
  "Малайзия": "🇲🇾",
  "Индия": "🇮🇳",
  "Таиланд": "🇹🇭",
  "Вьетнам": "🇻🇳",
  "Индонезия": "🇮🇩",
  "Филиппины": "🇵🇭",
  "Австралия": "🇦🇺",
  "Новая Зеландия": "🇳🇿",
  "ЮАР": "🇿🇦",
  "Египет": "🇪🇬",
  "Марокко": "🇲🇦"
};
