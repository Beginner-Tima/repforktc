// Данные о бизнес-курсах и школах

export interface CourseItem {
  name: string;
  type: string;
  contacts: string;
  price: string;
  isOnline?: boolean;
  address?: string;
  website?: string;
}

export const onlineCourses: CourseItem[] = [
  { name: "Coursera – Entrepreneurship Courses", type: "Предпринимательство, стартапы, бизнес-стратегии", contacts: "https://www.coursera.org/browse/business/entrepreneurship", price: "Бесплатно для материалов, ~$40–$80 за сертификат", isOnline: true },
  { name: "edX – Entrepreneurship Courses", type: "Предпринимательство, бизнес-навыки", contacts: "https://www.edx.org/learn/entrepreneurship", price: "Бесплатно для материалов, ~$50–$200 за сертификат", isOnline: true },
  { name: "Udemy – Entrepreneurship Courses", type: "Предпринимательство, стартап обучение", contacts: "https://www.udemy.com/", price: "~$15–$30 за курс", isOnline: true },
  { name: "Coursera – Financial Literacy Courses", type: "Личная финансовая грамотность, инвестиции", contacts: "https://www.coursera.org/courses?query=financial+literacy", price: "Бесплатно для материалов, ~$39–$80 за сертификат", isOnline: true },
  { name: "Udemy – Personal Finance & Investing", type: "Финансовая грамотность, инвестирование", contacts: "https://www.udemy.com/topic/personal-finance/", price: "~$15–$30 за курс", isOnline: true },
  { name: "Coursera – Marketing Courses", type: "Digital маркетинг, SMM, маркетинг стратегии", contacts: "https://www.coursera.org/browse/business/marketing", price: "Бесплатно для материалов, ~$39–$80 за сертификат", isOnline: true },
  { name: "Udemy – Marketing Courses", type: "Digital / интернет-маркетинг", contacts: "https://www.udemy.com/", price: "~$15–$30 за курс", isOnline: true },
  { name: "Coursera – Project Management", type: "Управление проектами, Agile, Scrum", contacts: "https://www.coursera.org/browse/business", price: "Бесплатно для материалов, ~$39–$80 за сертификат", isOnline: true },
  { name: "edX – Management & Business Courses", type: "Управление проектами, бизнес-управление", contacts: "https://www.edx.org/", price: "Бесплатно для материалов, платно за сертификат", isOnline: true },
  { name: "Udemy – Management & Leadership", type: "Управление командами, проектами, бизнес-процессы", contacts: "https://www.udemy.com/", price: "~$15–$30 за курс", isOnline: true },
  { name: "Open edX", type: "MOOC — курсы от университетов и организаций", contacts: "https://open.edx.org/", price: "Бесплатно для материалов, платно за сертификат", isOnline: true },
];

export const offlineBusinessSchools: CourseItem[] = [
  { name: "City Business School", type: "Бизнес-школа, предпринимательство, управление", address: "ул. Толе Би, 101 блок А, 6 этаж, Алматы", website: "https://e-mba.ru", contacts: "", price: "по программам обучения" },
  { name: "Moscow Business School", type: "Бизнес-школа, тренинги", address: "БЦ Green Hill, проспект Суюнбая, 89Б, офис 318/2, 3 этаж, Алматы", website: "http://www.mbschool.kz", contacts: "", price: "по программе" },
  { name: "Международная Бизнес Школа IBS", type: "Бизнес-образование (MBA, EMBA)", address: "Алматы", website: "https://ibschool.kz/", contacts: "", price: "по программе" },
  { name: "Школа бизнеса и управления (МШП/СПбШТ Almaty)", type: "Курсы управления, продажи, бизнес-навыки", address: "ул. Шевченко, Алматы", website: "https://almaty.spbsot.kz/", contacts: "", price: "по программе" },
  { name: "HSBM — High School of Business and Management", type: "Корпоративные тренинги и бизнес-курсы", address: "ул. Муканова, 241, блок 1, 4 этаж, Алматы", website: "https://hsbm.kz/", contacts: "", price: "по программе" },
  { name: "Almaty State Business College", type: "Колледж бизнеса", address: "ул. Шевченко, 95, Алматы", website: "https://ambk.edu.kz/ru", contacts: "", price: "по программе" },
  { name: "Алматы Менеджмент Университет (AlmaU)", type: "Университет с бизнес-обучением (MBA/менеджмент)", address: "пр. Достык и Абая, Алматы", website: "https://gsb.almau.edu.kz/", contacts: "", price: "по программе" },
  { name: "SBS Swiss Business School Campus Almaty", type: "Бизнес-школа", address: "ул. Назарбаева, 226, оф. 103–104, Алматы", website: "https://www.hsb.kz/", contacts: "", price: "по программе" },
  { name: "Палата предпринимателей «Атамекен»", type: "Курсы и тренинги для предпринимателей", address: "разные площадки в Алматы", website: "https://almatybusiness.org.kz/", contacts: "", price: "бесплатно / по проектам" },
];
