import SettingHeaderContainer from '@/components/common/header/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/button/Button/Button';
import InputWithLabel from '@/components/common/input/InputWithLabel';
import MemberItems from '@/components/setting/groupSetting/MemberItems/MemberItems';
import InviteLinkWithLabel from '@/components/setting/groupSetting/InviteLink/InviteLinkWithLabel';

const GroupSettingPage = () => {
  const dummyData = {
    groupName: '우리집 꾸미기 모임',
    isLeader: true,
    currentUser: '영희',
    members: ['영희', '철수', '민수', '지영', '수진'],
  };

  const navigate = useNavigate();
  const [groupName, setGroupName] = useState(dummyData.groupName);
  const [isEdited, setIsEdited] = useState(false);

  const handleMovePreset = () => {
    navigate('/main/preset-setting');
  };

  const handleGroupNameChange = (value: string) => {
    setGroupName(value);
    setIsEdited(value !== dummyData.groupName);
  };

  return (
    <>
      <div className='fixed left-0 right-0 top-0 z-10 m-auto max-w bg-white03'>
        <SettingHeaderContainer
          title='그룹 설정'
          isNeededBackBtn={false}
          isNeededDoneBtn={isEdited}
        />
      </div>
      <div className='flex flex-col gap-4 px-5 pt-20'>
        <InputWithLabel
          label='공간 이름'
          value={groupName}
          disabled={!dummyData.isLeader}
          handleChange={handleGroupNameChange}
        />
        <MemberItems
          leader={dummyData.isLeader}
          members={dummyData.members}
          currentUser={dummyData.currentUser}
        />
        <InviteLinkWithLabel />
        <div className='flex flex-col gap-2'>
          <p className='text-14'>프리셋 관리</p>
          <Button
            variant='full'
            size='large'
            label='프리셋 수정하기'
            handleClick={handleMovePreset}
            className='h-12 rounded-full text-16 text-white02'
          />
        </div>
      </div>
    </>
  );
};

export default GroupSettingPage;
