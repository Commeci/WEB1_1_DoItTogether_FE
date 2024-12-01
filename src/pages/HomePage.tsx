import React, { useEffect, useState } from 'react';
import HomeHeader from '@/components/home/HomeHeader/HomeHeader';
import WeeklyDateAndTab from '@/components/home/WeeklyDateAndTab';
import HouseworkList from '@/components/home/HouseworkList/HouseworkList';
import GroupSelectSheet from '@/components/home/GroupSelectSheet/GroupSelectSheet';
import useHomePageStore from '@/store/useHomePageStore';
import getWeekText from '@/utils/getWeekText';
import { useParams } from 'react-router-dom';
import { getMyGroup } from '@/services/groupSelect/getMyGroup';
import { getGroupUser } from '@/services/setting/getGroupUser';
import { PAGE_SIZE } from '@/constants/common';
import { getHouseworks } from '@/services/housework/getHouseworks';

/**
 * todo
 * 무한 스크롤 구현
 * housework는 전역 상태가 아니라 리액트 쿼리로 관리?
 */

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('전체');

  const {
    setWeekText,
    setCurrentGroup,
    setGroups,
    houseworks,
    setHouseworks,
    activeDate,
    homePageNumber,
  } = useHomePageStore();
  const { channelId } = useParams();
  const [chargers, setChargers] = useState<{ name: string }[]>([{ name: '전체' }]);

  useEffect(() => {
    const fetchMyGroups = async () => {
      const getMyGroupResult = await getMyGroup();
      const myGroups = getMyGroupResult.result.channelList;
      setGroups(myGroups);
      if (channelId) {
        const currentGroup = myGroups.find(group => group.channelId === Number(channelId));
        setCurrentGroup(currentGroup!);
      }
    };

    setWeekText(getWeekText(new Date()));
    fetchMyGroups();
  }, []);

  /**
   * todo
   * 집안일도 다시 패치해와야 함
   */
  useEffect(() => {
    const fetchGroupUsers = async () => {
      if (!channelId) return;
      const newChannelId = Number(channelId);
      const getGroupUsersResult = await getGroupUser({ channelId: newChannelId });
      const newChargers = [
        { name: '전체' },
        ...Array.from(new Set(getGroupUsersResult.result.userList.map(user => user.nickName))).map(
          charger => ({ name: charger })
        ),
      ];
      setChargers(newChargers);
    };

    const fetchHouseworks = async (date: string) => {
      const newChannelId = Number(channelId);
      const getHouseworksResult = await getHouseworks({
        channelId: newChannelId,
        targetDate: date,
        pageNumber: homePageNumber,
        pageSize: PAGE_SIZE,
      });
      console.log(getHouseworksResult);
      setHouseworks(getHouseworksResult.result.responses);
    };

    fetchGroupUsers();
    fetchHouseworks(activeDate);
  }, [channelId, activeDate]);

  const handleAction = (id: number) => {
    /**
     * todo
     * 해당 id에 해당하는 집안일 완료 처리
     */
  };
  const handleEdit = () => {
    /**
     * todo
     * 해당 id에 해당하는 집안일을 집안일 추가페이지에 보내줌
     * navigate로 라우팅하는데 파라미터를 집안일 id를 넘겨주면 됨
     */
    console.log('edit');
  };
  const handleDelete = (id: number) => {
    /**
     * todo
     * 해당 id에 해당하는 집안일 삭제 처리
     */
  };

  return (
    <div>
      <HomeHeader />
      <WeeklyDateAndTab
        activeTab={activeTab}
        handleSetActiveTab={setActiveTab}
        chargers={chargers}
      />
      <HouseworkList
        items={houseworks.filter(item => item.assignee === activeTab || activeTab === '전체')}
        handleAction={handleAction}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <GroupSelectSheet />
    </div>
  );
};

export default HomePage;
