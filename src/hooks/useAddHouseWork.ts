import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';
import { User } from '@/types/apis/groupApi';
import { getGroupUser } from '@/services/group/getGroupUser';
import { putHousework } from '@/services/housework/putHousework';
import { postHousework } from '@/services/housework/postHousework';
import useHomePageStore from '@/store/useHomePageStore';
import { formatDateToISO, getWeekText } from '@/utils/dateUtils';
import { convertStartTime, convertTimeToObject } from '@/utils/timeUtils';

export interface SelectedTime {
  hour: string;
  minute: string;
  ampm: 'AM' | 'PM';
}

const useAddHouseWork = () => {
  const navigate = useNavigate();

  //채널 id와 집안일 id
  const { channelId: strChannelId, houseworkId: strHouseworkId } = useParams();
  const channelId = Number(strChannelId);
  const houseworkId = Number(strHouseworkId);

  //전역 상태
  const { userId, setUserId, reset, setNickName, targetHousework } = useAddHouseWorkStore();

  const { setActiveDate, setActiveWeek, setActiveTab, setWeekText } = useHomePageStore();

  //지역 상태
  const [isHouseWorkSheetOpen, setHouseWorkSheetOpen] = useState(false);
  const [isDueDateSheetOpen, setDueDateSheetOpen] = useState(false);
  const [time, setTime] = useState<SelectedTime | null>(() =>
    targetHousework && !targetHousework.isAllDay && targetHousework.startTime
      ? convertTimeToObject(targetHousework.startTime)
      : null
  );

  const [task, setTask] = useState(targetHousework?.task || '');
  const [category, setCategory] = useState(targetHousework?.category || '');
  const [startDate, setStartDate] = useState(() => {
    if (targetHousework?.startDate) {
      const date = new Date(targetHousework.startDate);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
    return '';
  });
  const [isAllday, setIsAllday] = useState((targetHousework?.isAllDay as boolean) ?? true);

  //담당자 선택 시트 오픈 여부
  const [isOpen, setIsOpen] = useState(false);
  //등록중입니다..할때 조건 걸 상태
  const [isLoading, setIsLoading] = useState(false);

  //담당자 시트 관리하는 지역 상태
  const [selectedValue, setSelectedValue] = useState(userId || null);
  const [members, setMembers] = useState<User[]>([]);
  const [isMemberLoading, setIsMemberLoading] = useState(true);

  //패널 : 스텝
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (targetHousework) {
      setUserId(targetHousework.userId);
      setNickName(targetHousework.assignee);
    }
  }, []);

  //멤버 조회하는 api 호출
  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await getGroupUser({ channelId });
        setMembers(response.result.userList);
      } catch (error) {
        console.error('그룹 사용자 조회 실패:', error);
      } finally {
        setIsMemberLoading(false);
      }
    };

    fetchGroupMembers();
  }, [channelId]);

  const handleBackClick = () => {
    if (step === 1) {
      navigate(`/main/${channelId}`);
      reset();
    } else if (step === 2) {
      setStep(step => step - 1);
    }
  };

  const handleNextClick = async () => {
    if (step === 1) {
      setStep(step => step + 1);
    } else if (step === 2) {
      setIsLoading(true);

      const formattedDate = formatDateToISO(startDate);
      const newTime = convertStartTime(time);

      if (houseworkId) {
        try {
          if (userId) {
            await putHousework({
              channelId,
              houseworkId: Number(houseworkId),
              category,
              startDate: formattedDate,
              task,
              startTime: newTime,
              userId,
            });

            setTimeout(() => {
              setActiveDate(formattedDate);
              setActiveWeek(new Date(formattedDate));
              setActiveTab('전체');
              setWeekText(getWeekText(new Date(formattedDate)));
              navigate(`/main/${channelId}`);
              setTimeout(() => {
                reset();
                setIsLoading(false);
              }, 2000);
            }, 2500);
          }
        } catch (error) {
          console.error('집안일 수정 실패:', error);
        }
      } else {
        try {
          if (userId) {
            await postHousework({
              channelId,
              category,
              startDate: formattedDate,
              task,
              startTime: newTime,
              userId,
            });

            setTimeout(() => {
              setActiveDate(formattedDate);
              setActiveWeek(new Date(formattedDate));
              setActiveTab('전체');
              setWeekText(getWeekText(new Date(formattedDate)));
              navigate(`/main/${channelId}`);
              setTimeout(() => {
                reset();
                setIsLoading(false);
              }, 2000);
            }, 2500);
          }
        } catch (error) {
          console.error('집안일 추가 실패:', error);
        }
      }
    }
  };

  //바텀 시트 여는 함수들
  const handleHouseWorkClick = () => {
    setHouseWorkSheetOpen(true);
  };

  const handleDueDateClick = () => {
    setDueDateSheetOpen(true);
  };

  const handleManagerClick = () => {
    setIsOpen(true);
  };

  //담당자 선택 완료하면 시트 닫힘
  const handleDoneClick = () => {
    setIsOpen(false);
    setUserId(selectedValue);
  };

  return {
    startDate,
    userId,
    category,
    task,
    setTask,
    isMemberLoading,
    isLoading,
    handleHouseWorkClick,
    handleDueDateClick,
    isHouseWorkSheetOpen,
    setHouseWorkSheetOpen,
    isDueDateSheetOpen,
    setDueDateSheetOpen,
    members,
    handleManagerClick,
    isOpen,
    setIsOpen,
    setSelectedValue,
    selectedValue,
    handleDoneClick,
    channelId,
    houseworkId,
    handleBackClick,
    handleNextClick,
    step,
    time,
    setTime,
    setCategory,
    setStartDate,
    isAllday,
    setIsAllday,
  };
};

export default useAddHouseWork;
