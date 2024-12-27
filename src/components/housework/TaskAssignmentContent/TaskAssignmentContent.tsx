import React from 'react';
import OpenSheetBtnWithLabel from '@/components/common/button/OpenSheetBtn/OpenSheetBtnWithLabel';
import OpenSheetBtn from '@/components/common/button/OpenSheetBtn/OpenSheetBtn';
import { ProfileIcon } from '@/components/common/icon';
import { User } from '@/types/apis/groupApi';

interface TaskAssignmentContentProps {
  userId: number | null;
  members: User[];
  handleManagerClick: () => void;
}

const TaskAssignmentContent: React.FC<TaskAssignmentContentProps> = ({
  userId,
  members,
  handleManagerClick,
}) => {
  return (
    <>
      <section aria-label='집안일 추가 컨텐츠' className='flex flex-1 flex-col gap-6'>
        {userId ? (
          <OpenSheetBtnWithLabel
            selected={userId}
            handleClick={handleManagerClick}
            members={members}
            icon={<ProfileIcon className='text-main' />}
          />
        ) : (
          <OpenSheetBtn
            text='책임자는 누구인가요?'
            handleClick={handleManagerClick}
            type='housework'
            icon={<ProfileIcon className='text-gray3' />}
          />
        )}
      </section>
    </>
  );
};

export default TaskAssignmentContent;
