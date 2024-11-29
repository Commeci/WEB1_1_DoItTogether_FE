import SettingHeaderContainer from '@/components/common/header/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/button/Button/Button';
import InputWithLabel from '@/components/common/input/InputWithLabel';
import MemberItems from '@/components/setting/groupSetting/MemberItems/MemberItems';
import InviteLinkWithLabel from '@/components/setting/groupSetting/InviteLink/InviteLinkWithLabel';
import ExitSheet from '@/components/setting/ExitSheet/ExitSheet';
import { getGroupUser } from '@/services/setting/getGroupUser';
import { User } from '@/types/apis/groupApi';

const GroupSettingPage = () => {
  const navigate = useNavigate();

  // TODO: group name 전역에서 받아오기
  const [groupName, setGroupName] = useState('우리집');
  const [isEdited, setIsEdited] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [sheetTitle, setSheetTitle] = useState('');
  const [btnText, setBtnText] = useState('');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMovePreset = () => {
    navigate('/group-setting/preset-setting');
  };

  const handleGroupNameChange = (value: string) => {
    setGroupName(value);
    setIsEdited(value !== '우리집');
  };

  // 여기서 그룹 이름 수정 시 저장 처리
  const handleDone = () => {
    console.log(groupName);
    console.log('완료');
  };

  // 바텀시트 문구 체크
  const isAdmin = members.some(
    member => member.role === 'ADMIN' && member.email === 'gaeun@gmail.com'
  );
  const handleSheet = (member: User) => {
    const isCurrentUser = member.email === 'gaeun@gmail.com';
    if (isAdmin && isCurrentUser) {
      // 내가 그룹장일 때
      setBtnText('나갈래요');
      setSheetTitle(`${groupName}에서 정말 나가시나요?`);
    } else if (isAdmin) {
      // 다른 멤버를 선택했을 때
      setBtnText('내보낼래요');
      setSheetTitle(`${member.nickName}님을 정말 내보내시나요?`);
    } else {
      // 내가 일반 멤버일 때
      setBtnText('나갈래요');
      setSheetTitle(`${groupName}에서 정말 나가시나요?`);
    }
    setIsOpen(true);
  };

  // 멤버 방출 or 나가기 처리
  const handleExit = () => {
    console.log('잘있어');
    setIsOpen(false);
  };

  // 바텀시트 닫기
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        // TODO: channelId를 실제 값으로 교체해야 함
        const channelId = 6; // 임시 값
        const response = await getGroupUser(channelId);

        // TODO: 받아온 데이터 형식에 맞게 매핑 필요
        setMembers(response.result.userList);
        const current = response.result.userList.find(user => user.email === 'gaeun@gmail.com');
        setCurrentUser(current || null);
        setIsLoading(false);
      } catch (error) {
        console.error('멤버 조회 실패:', error);
        setIsLoading(false);
      }
    };

    fetchGroupMembers();
  }, []);

  return (
    <>
      <div className='fixed left-0 right-0 top-0 z-10 m-auto max-w bg-white03'>
        <SettingHeaderContainer
          title='그룹 설정'
          isNeededDoneBtn={isEdited}
          handleDone={handleDone}
        />
      </div>
      <div className='flex flex-col gap-6 px-5 pt-20'>
        <InputWithLabel
          label='공간 이름'
          value={groupName}
          disabled={!isAdmin}
          handleChange={handleGroupNameChange}
        />
        <MemberItems
          leader={isAdmin}
          members={members}
          currentUser={currentUser}
          handleClick={handleSheet}
        />
        <InviteLinkWithLabel />
        <div className='flex flex-col gap-2'>
          <p className='text-14'>프리셋 관리</p>
          <Button
            variant='full'
            size='large'
            label='프리셋 수정하기'
            handleClick={handleMovePreset}
          />
        </div>
      </div>
      <ExitSheet
        sheetTitle={sheetTitle}
        btnText={btnText}
        isOpen={isOpen}
        setOpen={setIsOpen}
        handleExit={handleExit}
        handleClose={handleClose}
      />
    </>
  );
};

export default GroupSettingPage;
