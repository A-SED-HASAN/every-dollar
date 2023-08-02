import {
  FolderIcon,
  FolderOpenIcon,
  CurrencyExchangeOutlinedIcon,
  RadioButtonCheckedOutlinedIcon,
  BarChartOutlinedIcon,
  PeopleOutlinedIcon,
  VideoLibraryOutlinedIcon,
  HeadsetMicOutlinedIcon,
  SupportOutlinedIcon,
  SettingsOutlinedIcon,
  CircleOutlinedIcon,
  RectangleOutlinedIcon,
  ChangeHistoryOutlinedIcon,
  StarBorderOutlinedIcon,
  FavoriteBorderOutlinedIcon,
  EditLocationOutlinedIcon,
  DiamondOutlinedIcon,
  ViewCompactOutlinedIcon,
} from '../icons'

export const navigation = [
  {
    id: 1,
    title: 'budget',
    to: 'budget',
    icon: <FolderIcon />,
    disIcon: <FolderOpenIcon />,
  },
  {
    id: 2,
    title: 'paycheck Planning',
    to: 'paycheck-planning',
    icon: <CurrencyExchangeOutlinedIcon />,
  },
  {
    id: 3,
    title: 'goals',
    to: 'goals',
    icon: <RadioButtonCheckedOutlinedIcon />,
  },
  {
    id: 4,
    title: 'tree map',
    to: 'tree-map',
    icon: <ViewCompactOutlinedIcon />,
  },
  { id: 5, title: 'insights', to: 'insights', icon: <BarChartOutlinedIcon /> },
  {
    id: 6,
    title: 'ramsey pros',
    to: 'ramsey-pros',
    icon: <PeopleOutlinedIcon />,
  },
  { id: 7, title: 'learn', to: 'learn', icon: <VideoLibraryOutlinedIcon /> },
  {
    id: 8,
    title: 'ask a coach',
    to: 'ask-a-coach',
    icon: <HeadsetMicOutlinedIcon />,
  },
  {
    id: 9,
    title: 'help center',
    to: 'help',
    icon: <SupportOutlinedIcon />,
  },
  {
    id: 10,
    title: 'settings',
    to: 'settings',
    icon: <SettingsOutlinedIcon />,
  },
]

export const monthsName = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]

//ROS abbr of received or spent (transaction)
export const init = [
  {
    id: 1,
    title: 'income',
    month: true,
    array: [
      { title: 'paycheck 1', planned: 0, ROS: 0 },
      { title: 'paycheck 2', planned: 0, ROS: 0 },
    ],
  },
  {
    id: 2,
    title: 'giving',
    array: [
      { title: 'church', planned: 0, ROS: 0 },
      { title: 'charity', planned: 0, ROS: 0 },
    ],
  },
  {
    id: 3,
    title: 'saving',
    array: [{ title: 'Emergency Fund', planned: 0, ROS: 0 }],
  },
  {
    id: 4,
    title: 'Bills & Subscriptions',
    array: [
      { title: 'Mortgage/Rent', planned: 0, ROS: 0 },
      { title: 'water', planned: 0, ROS: 0 },
      { title: 'natural gas', planned: 0, ROS: 0 },
      { title: 'Electricity', planned: 0, ROS: 0 },
      { title: 'internet', planned: 0, ROS: 0 },
      { title: 'Streaming Services', planned: 0, ROS: 0 },
      { title: 'Trash', planned: 0, ROS: 0 },
      { title: 'Phone', planned: 0, ROS: 0 },
      { title: 'Health Insurance', planned: 0, ROS: 0 },
      { title: 'Life Insurance', planned: 0, ROS: 0 },
      { title: 'Auto Insurance', planned: 0, ROS: 0 },
      { title: 'Identity Theft', planned: 0, ROS: 0 },
      { title: 'Gym', planned: 0, ROS: 0 },
    ],
  },
  {
    id: 5,
    title: 'Spending',
    array: [
      { title: 'Groceries', planned: 0, ROS: 0 },
      { title: 'Restaurants', planned: 0, ROS: 0 },
      { title: 'gas', planned: 0, ROS: 0 },
      { title: 'Clothing', planned: 0, ROS: 0 },
      { title: 'Hair & Skin Care', planned: 0, ROS: 0 },
      { title: 'Fun & Entertainment', planned: 0, ROS: 0 },
      { title: 'Pet Care', planned: 0, ROS: 0 },
      { title: 'Child Care', planned: 0, ROS: 0 },
      { title: 'Repairs & Maintenance', planned: 0, ROS: 0 },
      { title: 'Miscellaneous', planned: 0, ROS: 0 },
    ],
  },
  {
    id: 6,
    title: 'debt',
    array: [
      { title: 'bank', planned: 0, ROS: 0 },
      { title: 'father', planned: 0, ROS: 0 },
      { title: 'friend', planned: 0, ROS: 0 },
    ],
  },
]
// ====== tabs ======

export const summaryValues_tabs = [
  { id: 1, label: 'income' },
  { id: 2, label: 'spent' },
  { id: 3, label: 'remaining' },
]
export const transactionsValues_tabs = [
  { id: 1, label: 'new' },
  { id: 2, label: 'tracked' },
  { id: 3, label: 'deleted' },
]

export const colors = [
  '#00b2f6',
  '#e64b40',
  '#faab19',
  '#48ce65',
  '#b34fa0',
  '#16a597',
  '#f26552',
  '#e3b409',
  '#35bd59',
  '#634fb3',
]

export const shapes = [
  { id: 1, shape: 'circle', icon: <CircleOutlinedIcon /> },
  { id: 2, shape: 'rect', icon: <RectangleOutlinedIcon /> },
  { id: 3, shape: 'triangle', icon: <ChangeHistoryOutlinedIcon /> },
  { id: 4, shape: 'star', icon: <StarBorderOutlinedIcon /> },
  { id: 5, shape: 'heart', icon: <FavoriteBorderOutlinedIcon /> },
  { id: 6, shape: 'pin', icon: <EditLocationOutlinedIcon /> },
  { id: 7, shape: 'diamond', icon: <DiamondOutlinedIcon /> },
]

export const colorsForSlt = [
  { id: 1, colorHex: '#00b2f6', colorName: 'blue bolt' },
  { id: 2, colorHex: '#e64b40', colorName: 'carmine pink' },
  { id: 3, colorHex: '#faab19', colorName: 'crayola' },
  { id: 4, colorHex: '#48ce65', colorName: 'UFO green' },
  { id: 5, colorHex: '#b34fa0', colorName: 'rose quartz pink' },
  { id: 6, colorHex: '#16a597', colorName: 'persian green' },
  { id: 7, colorHex: '#f26552', colorName: 'sunset orange' },
  { id: 8, colorHex: '#e3b409', colorName: 'mustard yellow' },
  { id: 9, colorHex: '#35bd59', colorName: 'sea green' },
  { id: 10, colorHex: '#634fb3', colorName: 'plump purple' },
]
