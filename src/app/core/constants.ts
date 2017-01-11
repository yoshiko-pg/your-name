interface UserKind {
  LABEL: string;
  CONTAINER_SELECTOR: string;
}
interface UserKinds {
  admin: UserKind;
  participant: UserKind;
  waiting: UserKind;
  lottery: UserKind;
}

export const USER_KINDS: UserKinds = {
  admin: {
    LABEL: '管理者・発表者',
    CONTAINER_SELECTOR: '.concerned_area',
  },
  participant: {
    LABEL: '参加者（抽選待ち含む）',
    CONTAINER_SELECTOR: '.participation_table_area',
  },
  waiting: {
    LABEL: '補欠者',
    CONTAINER_SELECTOR: '.waitlist_table_area',
  },
  lottery: {
    LABEL: '抽選待ち',
    CONTAINER_SELECTOR: '.lottery_table_area',
  },
};
