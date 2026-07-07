/**
 * About 頁資料
 *
 * TODO（GM 待補，PLANNING.md 待辦 #5/#6）：
 * - 時間軸年份：除 1990（創立）與 2004（上海）外，其餘皆為合理預設值，待 GM 確認
 * - 專利號碼：全部為佔位，待 GM 提供完整專利清單
 * - 設備照片與認證文件：待素材盤點
 */

export interface Milestone {
  year: string;
  title: string;
  description: string;
  /** 年份為預設值，待 GM 確認 */
  yearTbc?: boolean;
}

export const MILESTONES: Milestone[] = [
  {
    year: "1990",
    title: "Company Founded",
    description:
      "MOTOKNIFE (友聚工業) is established in Taoyuan, Taiwan, specializing in precision slitting knife holders.",
  },
  {
    year: "2004",
    title: "Shanghai Branch",
    description:
      "Shanghai branch opens in Jiading District, bringing local support to converters across China.",
  },
  /* 專利條目採歷史事件敘述（innovation milestones 框架），
     不使用暗示現行保護的措辭（patented technology / patent-protected） */
  {
    year: "2006",
    title: "Pneumatic Holder Mechanism Patented (US)",
    description:
      "MOTOKNIFE's original pneumatic knife holder mechanism was patented in the United States — the company's first overseas innovation milestone.",
    yearTbc: true,
  },
  {
    year: "2009",
    title: "Positioning System Patented (DE)",
    description:
      "The knife holder positioning system was patented in Germany — an innovation recognized in the home market of the industry's leading manufacturers.",
    yearTbc: true,
  },
  {
    year: "2011",
    title: "Holder Design Patented (TW)",
    description: "Original slitting knife holder design patented in Taiwan.",
    yearTbc: true,
  },
  {
    year: "2013",
    title: "Slitting Device Patented (CN)",
    description:
      "The pneumatic slitting device was patented in China as the company expanded in the world's largest converting market.",
    yearTbc: true,
  },
  {
    year: "2018",
    title: "Solar Power Plant",
    description:
      "Rooftop solar power plant commissioned at the Taoyuan factory — manufacturing with renewable energy.",
    yearTbc: true,
  },
  {
    year: "2021",
    title: "Industrial Robots Deployed",
    description:
      "Industrial robots integrated into production lines for consistent machining and assembly quality.",
    yearTbc: true,
  },
  {
    year: "2025",
    title: "Exporting to 50+ Countries",
    description:
      "MOTOKNIFE products now serve converters in more than 50 countries across five continents.",
    yearTbc: true,
  },
];

export interface Equipment {
  id: string;
  name: string;
  caption: string;
}

export const EQUIPMENT: Equipment[] = [
  {
    id: "cnc-lathe",
    name: "CNC Lathe",
    caption: "MAZAK multi-tasking turning centers — ±0.005mm on every part",
  },
  {
    id: "cnc-milling",
    name: "CNC Milling",
    caption: "High-speed milling for holder bodies and precision components",
  },
  {
    id: "grinding",
    name: "Grinding Machine",
    caption: "CNC cylindrical and surface grinding for critical fits",
  },
  {
    id: "robot",
    name: "Industrial Robot",
    caption: "Robotic machining cells for consistent 24/7 production",
  },
  {
    id: "solar",
    name: "Solar Power Plant",
    caption: "Rooftop solar array powering sustainable manufacturing",
  },
];

export interface Patent {
  countryCode: string;
  country: string;
  number: string;
  title: string;
}

export const PATENTS: Patent[] = [
  {
    countryCode: "US",
    country: "United States",
    number: "US —— (to be confirmed)",
    title: "Pneumatic knife holder mechanism",
  },
  {
    countryCode: "DE",
    country: "Germany",
    number: "DE —— (to be confirmed)",
    title: "Knife holder positioning system",
  },
  {
    countryCode: "TW",
    country: "Taiwan",
    number: "TW —— (to be confirmed)",
    title: "Slitting knife holder design",
  },
  {
    countryCode: "CN",
    country: "China",
    number: "CN —— (to be confirmed)",
    title: "Pneumatic slitting device",
  },
];
