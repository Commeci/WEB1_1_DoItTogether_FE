import useAddHouseWork from '@/hooks/useAddHouseWork';
import { TaskAssignmentContent } from '@/components/housework';
import { lazy, Suspense } from 'react';

const ManagerSelectSheet = lazy(
  () => import('@/components/housework/ManagerSelectSheet/ManagerSelectSheet')
);

const Step2 = () => {
  const {
    userId,
    members,
    handleManagerClick,
    isOpen,
    setIsOpen,
    setSelectedValue,
    selectedValue,
    handleDoneClick,
  } = useAddHouseWork();

  return (
    <>
      <TaskAssignmentContent
        userId={userId}
        members={members}
        handleManagerClick={handleManagerClick}
      />
      <Suspense fallback={<></>}>
        <ManagerSelectSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
          handleDoneClick={handleDoneClick}
          members={members}
        />
      </Suspense>
    </>
  );
};

export default Step2;
