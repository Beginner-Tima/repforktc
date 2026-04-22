// Хобби данные с полной информацией о местах в Алматы

export interface HobbyItem {
  name: string;
  type: string;
  location: string;
  contacts?: string;
  instagram?: string;
  website?: string;
  address?: string;
  price?: string;
}

export interface HobbyCategory {
  category: string;
  icon: string;
  subcategories: {
    name: string;
    items: HobbyItem[];
  }[];
}

export const hobbiesData: HobbyCategory[] = [
  {
    category: "Творчество",
    icon: "🎨",
    subcategories: [
      {
        name: "Рисование и живопись",
        items: [
          { name: "Van Gogh студия рисование", type: "Рисование", location: "Алматы", instagram: "https://www.instagram.com/vangogh_art_studio" },
          { name: "Художественная школа Саитова", type: "Рисование, живопись", location: "Алматы", website: "https://saitov.kz", instagram: "https://www.instagram.com/saitov_artschool" },
          { name: "Art_cafe_oner изостудия", type: "Изобразительное искусство", location: "Алматы", instagram: "https://www.instagram.com/art_cafe_oner" },
          { name: "Canvas Art", type: "Рисование", location: "Алматы", website: "https://canvas-art.kz", instagram: "https://www.instagram.com/canvas_art__kz" },
          { name: "Ms Art School", type: "Рисование (офлайн и онлайн)", location: "Алматы", website: "https://ms-artschool.kz", instagram: "https://www.instagram.com/ms.art_school" },
          { name: "Qala Art Studio", type: "Рисование", location: "Алматы", instagram: "https://www.instagram.com/qala_art_studio" },
          { name: "Kubik Art Studio", type: "Рисование", location: "Алматы", instagram: "https://www.instagram.com/kubikartstudio" },
          { name: "A La Prima", type: "Художественная школа", location: "Алматы", instagram: "https://www.instagram.com/alaprima.artschool" },
          { name: "Master Da Vinchi", type: "Рисование", location: "Алматы", instagram: "https://www.instagram.com/masterdavinchi" },
          { name: "Sheñber Art Studio", type: "Рисование", location: "Алматы", instagram: "https://www.instagram.com/shenber_art_studio" },
        ]
      },
      {
        name: "DIY и рукоделие",
        items: [
          { name: "Craftika", type: "DIY, рукоделие", location: "Алматы" },
          { name: "Гончарная студия №1", type: "Гончарка и керамика", location: "Алматы" },
        ]
      }
    ]
  },
  {
    category: "Музыка",
    icon: "🎵",
    subcategories: [
      {
        name: "Игра на гитаре",
        items: [
          { name: "RockSchool", type: "Гитара", location: "Алматы", website: "https://rockschool.kz/guitar/" },
          { name: "Arcanum", type: "Гитара, музыка", location: "Алматы", website: "https://arcanum.kz/" },
          { name: "Best school", type: "Гитара", location: "Алматы", website: "https://bestschool.kz/" },
          { name: "Мурагер", type: "Гитара", location: "Алматы", website: "https://murager.me/" },
          { name: "Sound Service", type: "Гитара", location: "Алматы", website: "https://sound-service.kz/" },
          { name: "Guitar Player", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/guitarplayer.kz" },
          { name: "Maro Music School", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/maro_musicschool" },
          { name: "Muse School", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/muse_school_kz" },
          { name: "House of Music", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/houseofmusic.kz" },
          { name: "Music Space", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/music__space_" },
          { name: "Spot Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/spotstudio.kz" },
          { name: "JK Music School", type: "Гитара", location: "Алматы", website: "https://jkschool.kz/" },
          { name: "Bang Bang", type: "Гитара", location: "Алматы", website: "https://bangbang.kz/blog/individualnye-uroki-igry-na-gitare-v-almaty/" },
          { name: "Ваш репетитор", type: "Гитара", location: "Алматы", website: "https://alm.repetitors.info/repetitor/guitar/" },
          { name: "School Central", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/school_central_almaty" },
          { name: "Danali Music Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/danali.studio" },
          { name: "Школа вокала и музыки Дианы Шараповой", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/musicschoolkz" },
          { name: "Fermata Music School", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/fermata_school" },
          { name: "Iconic Creative School", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/creativeschool.kz" },
          { name: "Yirim", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/yirim.school" },
          { name: "Music House", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/music_house.k" },
          { name: "Adai Music", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/adai.music.school" },
          { name: "Struna", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/struna_shym" },
          { name: "Pinkpunks24", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/pinkpunks24" },
          { name: "Saz", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/saz_muzschool" },
          { name: "Арт-Аккорд", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/art_accord" },
          { name: "Soulway", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/soulway.studio" },
          { name: "Amanat Music", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/amanat_music" },
          { name: "Grato", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/grato.music.school" },
          { name: "InCloud", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/music_school_incloud" },
          { name: "Noize Club", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/noize_club_ala" },
          { name: "Jas Talent", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/jas_talent" },
          { name: "Encore", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/encore_almaty" },
          { name: "BM Production", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/bm_production_official" },
          { name: "Қарақат", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/karakat_studiyaa_almaty" },
          { name: "Мастерская 27а", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/masterskaya27a" },
          { name: "Ras Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/ras.studio" },
          { name: "SEN Music Voice Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/senvoicestudio" },
          { name: "Music Lessons Almaty", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/music_lessons_almaty" },
          { name: "Ten Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/ten.studio.almaty" },
          { name: "Виртуозы", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/virtuozy_kazakhstan" },
          { name: "Artkey Music School & Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/artkeymusic" },
          { name: "Jetisaz.kz", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/jetisaz.kz" },
          { name: "TGA Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/tga.studio" },
          { name: "Montmartre", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/montmartre_music" },
          { name: "Piano's", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/pianos_music_studio" },
          { name: "Soul Live Studio", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/soul.livestudio" },
          { name: "Музыкальная школа Камилы Жумабаевой", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/musicschoolalmata" },
          { name: "Innerbloom", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/innerbloom.std" },
          { name: "VIJ Music Academy", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/vij_music_academy" },
          { name: "Prof Music Almaty", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/prof_music_almaty1" },
          { name: "Amergon Music", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/amergon.muz" },
          { name: "Ukulele Guitar Studio", type: "Гитара, укулеле", location: "Алматы", instagram: "https://www.instagram.com/ukulele_guitar_studio" },
          { name: "Solo", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/solo_kz" },
          { name: "Mus & Art", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/studio_muzart" },
          { name: "Шабыт", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/shabytmusic" },
          { name: "New Stars", type: "Гитара", location: "Алматы", instagram: "https://www.instagram.com/newstars.pro" },
        ]
      },
      {
        name: "Игра на фортепиано",
        items: [
          { name: "House of Music", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/houseofmusic.kz" },
          { name: "Central", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/school_central_almaty" },
          { name: "Danali Music Studio", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/danali.studio" },
          { name: "Fermata Music School", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/fermata_school" },
          { name: "Rock School", type: "Фортепиано", location: "Алматы", website: "https://rockschool.kz" },
          { name: "Melodika", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/melodika.music.studio" },
          { name: "Sound Service", type: "Фортепиано", location: "Алматы", website: "https://sound-service.kz" },
          { name: "Sofia Piano Studio", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/sofia_piano_studio" },
          { name: "Con Anima", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/con_anima_school" },
          { name: "Sun Piano", type: "Фортепиано", location: "Алматы", website: "https://sunpiano.taplink.ws" },
          { name: "Adai Music", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/adai.music.school" },
          { name: "JK Music School", type: "Фортепиано", location: "Алматы", website: "https://jkschool.kz" },
          { name: "Viapiano", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/ivtsh_piano" },
          { name: "Арт-Аккорд", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/art_accord" },
          { name: "InCloud", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/music_school_incloud" },
          { name: "Maro", type: "Фортепиано", location: "Алматы", website: "https://maro.kz" },
          { name: "MuzCity", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/muzcity_almaty" },
          { name: "Ras Studio", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/ras.studio" },
          { name: "Sanart", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/sanaart.kz" },
          { name: "Ten Studio", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/ten.studio.almaty" },
          { name: "Artkey Music School & Studio", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/artkeymusic" },
          { name: "Drum School", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/almaty_drumschool" },
          { name: "Bastau", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/bastaumusic" },
          { name: "Montmartre", type: "Фортепиано", location: "Алматы", website: "https://montmartre.kz" },
          { name: "Bala Alemi", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/_bala_alemi_" },
          { name: "Dofamin Music House", type: "Фортепиано", location: "Алматы", website: "https://dofamin.taplink.kz" },
          { name: "Piano and Guitar School", type: "Фортепиано", location: "Алматы", website: "https://www.muse-school.kz/" },
          { name: "Music Gallery", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/music_ga11ery" },
          { name: "Prof Music Almaty", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/prof_music_almaty1" },
          { name: "Vek", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/music_event_studio" },
          { name: "Rado Voice", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/rado_voice_" },
          { name: "Bala Study", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/bala_study" },
          { name: "Solo", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/solo_kz" },
          { name: "Mus & Art", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/studio_muzart" },
          { name: "Imannur", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/imannur_for_ramazan" },
          { name: "Uali", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/uali_oner_ortalygy" },
          { name: "ArtKids", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/artkids_asyl_arman" },
          { name: "Марат Оразаев өнер мектебі", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/marat.orazaev.onermektebi" },
          { name: "Yirim", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/yirim.school" },
          { name: "Leila Vocal School", type: "Фортепиано", location: "Алматы", website: "https://leilavocal.kz" },
          { name: "Arcanum", type: "Фортепиано", location: "Алматы", website: "https://arcanum.kz" },
          { name: "Easypiano_kz", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/easypiano_kz" },
          { name: "Soulway", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/soulway.studio" },
          { name: "Amanat Music", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/amanat_music" },
          { name: "Grato", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/grato.music.school" },
          { name: "Ravel Piano Art School", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/ravelpiano" },
          { name: "BM Production", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/bm_production_official" },
          { name: "Қарақат", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/karakat_studiyaa_almaty" },
          { name: "Katrin", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/katrin_art_dance_studio" },
          { name: "Shabyt", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/shabytalmaty" },
          { name: "SEN Music Voice Studio", type: "Фортепиано", location: "Алматы", website: "https://sen.kz" },
          { name: "DamuZone", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/damuzone" },
          { name: "EduPro", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/edupro_ala" },
          { name: "Pianos", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/pianos_almaty" },
          { name: "Школа вокала и музыки Дианы Шараповой", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/musicschoolkz" },
          { name: "Талпын", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/talpyn_almaty" },
          { name: "Baq", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/baq_oner_bilim_mektebi" },
          { name: "VIJ Music Academy", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/vij_music_academy" },
          { name: "New Stars", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/newstars.pro" },
          { name: "IQ Study", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/iq_studykz" },
          { name: "Skill Al", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/skillal.kz" },
          { name: "Steppe School", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/steppe.school" },
          { name: "Iconic Creative School", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/creativeschool.kz" },
          { name: "Еркем-ай", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/erkem_ai_oneri" },
          { name: "Ыбырай өнер-білім орталығы", type: "Фортепиано", location: "Алматы", instagram: "https://www.instagram.com/ybyraiortalygy" },
        ]
      },
      {
        name: "Вокал",
        items: [
          { name: "ProVoice", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/provoice_project" },
          { name: "Central", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/school_central_almaty" },
          { name: "Четыре Четверти", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/music.4x4" },
          { name: "IQ Study", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/iq_studykz" },
          { name: "Школа вокала и музыки Дианы Шараповой", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/musicschoolkz" },
          { name: "House of Music", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/houseofmusic.kz" },
          { name: "Rock School", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/rockschoolkz" },
          { name: "Almaty Drumschool", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/almaty_drumschool" },
          { name: "Yirim", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/yirim.school" },
          { name: "SoulMusic", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/soulllmusic" },
          { name: "Leila Vocal School", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/leila_vocal" },
          { name: "Murager Music School", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/murager.school" },
          { name: "Music Space", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/music__space_" },
          { name: "Art Accord", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/art_accord" },
          { name: "Arcanum", type: "Вокал", location: "Алматы", website: "https://arcanum.kz" },
          { name: "JK Music School", type: "Вокал", location: "Алматы", website: "https://jkschool.kz" },
          { name: "Poyou", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/poyou.kz" },
          { name: "Skill Al", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/skillal.kz" },
          { name: "InCloud", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/music_school_incloud" },
          { name: "Kyndr", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/kyndr.kz" },
          { name: "Ras Studio", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/ras.studio" },
          { name: "KDM Art Lab", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/kdm_art_lab" },
          { name: "Sanart", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/sanaart.kz" },
          { name: "Ten Studio", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/ten.studio.almaty" },
          { name: "Sonata Vocals & Piano", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/nika_issenova_vocal_almaty" },
          { name: "Атмосфера", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/atmosferalmaty" },
          { name: "Artkey Music School & Studio", type: "Вокал", location: "Алматы", instagram: "https://www.instagram.com/artkeymusic" },
        ]
      }
    ]
  },
  {
    category: "Mind & Lifestyle",
    icon: "🧘",
    subcategories: [
      {
        name: "Йога и медитация",
        items: [
          { name: "Mahima Sadhguru Hatha Yoga", type: "Йога, медитация", location: "Алматы", address: "СТ Алатау-2, 42/1, Баганашыл м-н", instagram: "https://www.instagram.com/mahima.kz", website: "https://mahima.kz" },
          { name: "Pradnya Institute of Yoga", type: "Йога, медитация", location: "Алматы", address: "ул. Ораза Жандосова, 204, 2-й этаж", instagram: "https://www.instagram.com/pradnyayoga.kz" },
          { name: "Two Streams", type: "Медитация", location: "Алматы", address: "мкр Самал-2, бульвар Мендикулова 98, зал 9", instagram: "https://www.instagram.com/twostreams_almaty", website: "https://soundhealing.kz/" },
        ]
      },
      {
        name: "Саморазвитие и тайм-менеджмент",
        items: [
          { name: "Talent.kz — Центр развития", type: "Саморазвитие, тайм-менеджмент", location: "Алматы", address: "ул. Кабанбай батыра 203", website: "http://talent.kz/", instagram: "https://www.instagram.com/talent.kz" },
          { name: "Центр Елены Безруковой", type: "Саморазвитие, тайм-менеджмент", location: "Алматы", address: "проспект Назарбаева, 65", website: "https://bezrukova.kz/kursy-i-treningi/shkola-razvitiya-lichnosti", contacts: "+7 707 718 7707" },
          { name: "Ekviliya — Тренинговый центр психологии", type: "Саморазвитие", location: "Алматы", address: "ул. Орбита 2, 10", instagram: "https://www.instagram.com/ekviliya.kz" },
          { name: "Психологический центр «Ресурс»", type: "Саморазвитие", location: "Алматы", address: "ул. Торайгырова 19", instagram: "https://www.instagram.com/resurs.center" },
          { name: "Happy Life — Центр саморазвития и релаксации", type: "Саморазвитие", location: "Алматы", address: "ул. Солодовникова, 21А, офис 323, 3 этаж", instagram: "https://www.instagram.com/happylife.almaty", website: "https://hlc.kz", contacts: "+7 (776) 275-07-50" },
        ]
      },
      {
        name: "Публичные выступления",
        items: [
          { name: "Speakers Club", type: "Публичные выступления", location: "Алматы", address: "БЦ Fortis, Khodzhanov St 2/2", instagram: "https://www.instagram.com/orator_club", website: "http://www.oratorclub.kz/" },
          { name: "Almaty Toastmasters Club", type: "Публичные выступления", location: "Алматы", address: "Abay Ave 2 (KIMEP)", instagram: "https://www.instagram.com/almaty.toastmasters" },
        ]
      },
      {
        name: "Психология и ментальное здоровье",
        items: [
          { name: "Институт психологии и психотерапии (ИПП)", type: "Психологические курсы", location: "Алматы", instagram: "https://www.instagram.com/ipp_almaty", contacts: "+7 777 220 54 55" },
          { name: "Студия осознанности Mindfulness Almaty", type: "Медитация / Ментальное здоровье", location: "Алматы", instagram: "https://www.instagram.com/mindfulness.almaty" },
          { name: "Школа эмоционального интеллекта EQLab", type: "Психология / Саморазвитие", location: "Алматы", instagram: "https://www.instagram.com/eqlab_kz" },
          { name: "Образовательный центр Bilim Central", type: "Самообразование / Курсы", location: "Алматы", instagram: "https://www.instagram.com/bilimcentral", contacts: "+7 707 232 44 04" },
        ]
      },
      {
        name: "Скорочтение",
        items: [
          { name: "Школа скорочтения Be Brain", type: "Скорочтение", location: "Алматы", instagram: "https://www.instagram.com/bebrain_almaty", contacts: "+7 707 677 14 64" },
          { name: "Международная академия UCMAS", type: "Развитие интеллекта и быстрое чтение", location: "Алматы", instagram: "https://www.instagram.com/ucmas_kazakhstan", contacts: "+7 727 317 17 18" },
          { name: "Школа скорочтения Шамиля Ахмадуллина", type: "Скорочтение", location: "Алматы", instagram: "https://www.instagram.com/shamil_ahmadullin_almaty", contacts: "+7 707 344 95 95" },
          { name: "Международная школа скорочтения ISFR", type: "Скорочтение", location: "Алматы", contacts: "+7 701 749 9007" },
          { name: "Школа скорочтения Ispeedreader", type: "Развитие памяти, внимания и техники быстрого чтения", location: "Алматы", instagram: "https://www.instagram.com/ispeedreader", website: "https://ispeedreader.com" },
        ]
      },
      {
        name: "Soft skills и личная эффективность",
        items: [
          { name: "Level Up Academy", type: "Курсы soft skills и личной эффективности", location: "Алматы", instagram: "https://www.instagram.com/levelup_kz" },
          { name: "Art & Code Academy", type: "Обучение новым профессиям и навыкам", location: "Алматы", instagram: "https://www.instagram.com/artcode_almaty", contacts: "+7 707 555 33 22" },
          { name: "Bolashaq Academy", type: "Лекции и семинары по разным направлениям", location: "Алматы", instagram: "https://www.instagram.com/bolashaq_academy" },
          { name: "Open Mind Almaty", type: "Открытый лекторий по культуре и науке", location: "Алматы", instagram: "https://www.instagram.com/openmind_almaty" },
          { name: "Master Class Almaty", type: "Площадка для практических навыков во всех сферах", location: "Алматы", instagram: "https://www.instagram.com/masterclass_almaty" },
        ]
      },
      {
        name: "Книжные клубы",
        items: [
          { name: "Книжный клуб Reforum", type: "Обсуждение книг по саморазвитию и социологии", location: "Алматы", instagram: "https://www.instagram.com/reforum_almaty" },
          { name: "Читариум", type: "Клуб с фокусом на интеллектуальную литературу", location: "Алматы", instagram: "https://www.instagram.com/chitarium_almaty" },
          { name: "Книжный клуб Meloman", type: "Регулярные встречи и обсуждения новинок нон-фикшн", location: "Алматы", instagram: "https://www.instagram.com/melomankaz" },
          { name: "Книготерапия", type: "Психологический разбор нон-фикшн литературы", location: "Алматы", instagram: "https://www.instagram.com/knigoterapiya_almaty" },
          { name: "Книжный клуб 451 градус", type: "Чтение нон-фикшн / Обсуждения", location: "Алматы", instagram: "https://www.instagram.com/451almaty" },
        ]
      }
    ]
  },
  {
    category: "Языки и обучение",
    icon: "🌍",
    subcategories: [
      {
        name: "Языковые курсы",
        items: [
          { name: "Just Speak It", type: "Английский/Казахский", location: "Алматы", instagram: "https://www.instagram.com/justspeakit", contacts: "+7 771 754 54 44" },
          { name: "GSC Study", type: "Языки/Подготовка к IELTS", location: "Алматы", instagram: "https://www.instagram.com/gsc_study", contacts: "+7 707 222 55 11" },
          { name: "InterPress", type: "Английский язык", location: "Алматы", instagram: "https://www.instagram.com/interpress_kz", contacts: "+7 727 222 11 11" },
          { name: "Lanto Education", type: "Языковые курсы", location: "Алматы", instagram: "https://www.instagram.com/lantoeducation", contacts: "+7 701 765 04 04" },
          { name: "Study Link", type: "Английский", location: "Алматы", instagram: "https://www.instagram.com/studylink_kz", contacts: "+7 700 365 00 00" },
        ]
      }
    ]
  },
  {
    category: "Общество и культура",
    icon: "🌐",
    subcategories: [
      {
        name: "Волонтёрство",
        items: [
          { name: "UNICEF Волонтёрская программа", type: "Волонтёрская деятельность", location: "Алматы и другие города", price: "Бесплатно" },
          { name: "Birgemiz / QazVolunteer / Jas / Ashyk Jurek", type: "Социальное волонтёрство", location: "Алматы", website: "https://qazvolunteer.kz/en/organizations", price: "Бесплатно" },
        ]
      },
      {
        name: "Дебаты и публичные выступления",
        items: [
          { name: "Toastmasters Almaty", type: "Дебаты / развитие речи", location: "Алматы", address: "Abay Ave 2", instagram: "https://www.instagram.com/almaty.toastmasters", price: "Бесплатно / символические взносы" },
          { name: "Дебат-клубы в университетах (Congress, Parasat)", type: "Дебаты", location: "Университеты Алматы", price: "Бесплатно (для студентов)" },
        ]
      },
      {
        name: "Изучение культур / обмен",
        items: [
          { name: "WikiBilim Public Foundation", type: "Образовательные проекты / культурная деятельность", location: "Алматы", website: "https://www.wikibilim.kz/", price: "Бесплатно" },
        ]
      },
      {
        name: "Организация мероприятий / творчество",
        items: [
          { name: "Student Creative Groups (ALMAU)", type: "Творчество / организация событий", location: "Almaty Management University", price: "Бесплатно для студентов" },
          { name: "Standup / Комедийный клуб", type: "Стэнд-ап / выступления", location: "Алматы", address: "Kabanbay Batyr St 71", price: "Вход по билетам" },
        ]
      }
    ]
  },
  {
    category: "Спорт и актив",
    icon: "🏃",
    subcategories: [
      {
        name: "Волейбол",
        items: [
          { name: "Volleyball Club Almaty", type: "Волейбол", location: "Алматы" },
          { name: "ProVolley", type: "Волейбол для подростков", location: "Алматы" },
          { name: "Sport Life", type: "Разные виды спорта", location: "Алматы" },
        ]
      },
      {
        name: "Танцы",
        items: [
          { name: "Dance Studio Almaty", type: "Современные танцы", location: "Алматы" },
          { name: "Step Up", type: "Hip-hop, брейк", location: "Алматы" },
          { name: "Grace Dance", type: "Балет, современная хореография", location: "Алматы" },
        ]
      }
    ]
  }
];
