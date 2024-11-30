import { create } from 'zustand';
import { Group } from '@/types/apis/groupApi';

interface HomePageState {
  currentGroup: Group;
  setCurrentGroup: (group: Group) => void;

  isGroupSelectSheetOpen: boolean;
  setIsGroupSelectSheetOpen: (isOpen: boolean) => void;

  groups: Array<Group>;
  setGroups: (groups: Array<Group>) => void;

  weekText: string;
  setWeekText: (weekText: string) => void;
}

const useHomePageStore = create<HomePageState>(set => ({
  currentGroup: { channelId: 0, name: '기본 그룹명' },
  setCurrentGroup: group => set({ currentGroup: group }),

  isGroupSelectSheetOpen: false,
  setIsGroupSelectSheetOpen: isOpen => set({ isGroupSelectSheetOpen: isOpen }),

  groups: [{ channelId: 0, name: '기본 그룹명' }],
  setGroups: groups => set({ groups: groups }),

  weekText: '',
  setWeekText: weekText => set({ weekText: weekText }),
}));

export default useHomePageStore;
