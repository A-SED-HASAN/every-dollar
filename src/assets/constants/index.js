import {
  FolderIcon,
  FolderOpenIcon,
  CurrencyExchangeOutlinedIcon,
  RadioButtonCheckedOutlinedIcon,
  ShowChartOutlinedIcon,
  BarChartOutlinedIcon,
  PeopleOutlinedIcon,
  VideoLibraryOutlinedIcon,
  HeadsetMicOutlinedIcon,
  SupportOutlinedIcon,
  SettingsOutlinedIcon,
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
  { id: 4, title: 'roadmap', to: 'roadmap', icon: <ShowChartOutlinedIcon /> },
  { id: 5, title: 'insights', to: 'insights', icon: <BarChartOutlinedIcon /> },
  {
    id: 6,
    title: 'ramesy pros',
    to: 'ramesy-pros',
    icon: <PeopleOutlinedIcon />,
  },
  { id: 7, title: 'learn', to: 'learn', icon: <VideoLibraryOutlinedIcon /> },
  {
    id: 8,
    title: 'ask a coach',
    to: 'ask-a-coach',
    icon: <HeadsetMicOutlinedIcon />,
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
