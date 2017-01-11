interface UserKind {
  key: string;
  label: string;
  containerSelector: string;
}

export const userKinds: UserKind[] = [
  {
    key: 'admin',
    label: '管理者',
    containerSelector: '.concerned_area',
  },
  {
    key: 'participant',
    label: '参加者',
    containerSelector: '.participation_table_area',
  },
  {
    key: 'waiting',
    label: '補欠',
    containerSelector: '.waitlist_table_area',
  },
  {
    key: 'lottery',
    label: '抽選',
    containerSelector: '.lottery_table_area',
  },
];