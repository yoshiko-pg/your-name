import { User } from './interfaces';

export interface UserKind {
  KEY: string;
  LABEL: string;
  CONTAINER_SELECTORS: string[];
}

export interface Users {
  admin?: User[];
  participant?: User[];
  waiting?: User[];
}

export const USER_KINDS: UserKind[] = [
  {
    KEY: 'admin',
    LABEL: '管理者・発表者',
    CONTAINER_SELECTORS: ['.concerned_area'],
  },
  {
    KEY: 'participant',
    LABEL: '参加者（抽選待ち含む）',
    CONTAINER_SELECTORS: ['.participation_table_area', '.lottery_table_area'],
  },
  {
    KEY: 'waiting',
    LABEL: '補欠者',
    CONTAINER_SELECTORS: ['.waitlist_table_area'],
  },
];

export interface Preset {
  backgroundUrl: string;
  className: string;
  custom?: boolean;
}

export const PRESETS: Preset[] = [
  {
    backgroundUrl: './assets/images/preset1.png',
    className: 'default',
  },
  {
    backgroundUrl: './assets/images/preset2.png',
    className: 'default',
  },
  {
    backgroundUrl: './assets/images/browser.png',
    className: 'default browser',
  },
  {
    backgroundUrl: './assets/images/green-bar.png',
    className: 'green-bar',
  },
  {
    backgroundUrl: './assets/images/space.png',
    className: 'space',
  },
  {
    backgroundUrl: '',
    className: 'default',
    custom: true,
  },
];

