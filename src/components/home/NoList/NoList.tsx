import React from 'react';
import NoListIcon from '@/components/common/icon/NoListIcon';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Housework } from '@/types/apis/houseworkApi';
import { PAGE_SIZE } from '@/constants/common';
import useHomePageStore from '@/store/useHomePageStore';
interface NoListProps {}

const NoList: React.FC<NoListProps> = ({}) => {
  const { channelId } = useParams();
  const { activeDate, homePageNumber } = useHomePageStore();
  const queryClient = useQueryClient();
  const houseworks = queryClient.getQueryData<Housework[]>([
    'houseworks',
    {
      channelId: Number(channelId),
      targetDate: activeDate,
      pageNumber: homePageNumber,
      pageSize: PAGE_SIZE,
    },
  ]);

  if (houseworks && houseworks.length > 0) {
    return null;
  }
  return (
    <div className='flex h-[calc(100vh-280px)] flex-1 flex-col items-center justify-center gap-[48px] whitespace-pre-line text-center text-gray3'>
      <NoListIcon />
      <p className='text-gray6 font-subhead'>
        {'현재 일정이 없어요\n +버튼을 눌러 일정을 만들어보세요'}
      </p>
    </div>
  );
};

export default NoList;
