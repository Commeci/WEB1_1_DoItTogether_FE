import Button from '@/components/common/button/Button/Button';
import HeaderWithTitle from '@/components/housework/HeaderWithTitle/HeaderWithTitle';
import ManagerSelectSheet from '@/components/housework/ManagerSelectSheet/ManagerSelectSheet';
import OpenSheetBtn from '@/components/common/button/OpenSheetBtn/OpenSheetBtn';
import OpenSheetBtnWithLabel from '@/components/common/button/OpenSheetBtn/OpenSheetBtnWithLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseWorkAddLoading from '@/components/housework/HouseworkAddLoading/HouseWorkAddLoading';
import useAddHouseWorkStore from '@/store/useAddHouseWorkStore';

const HouseWorkStepTwoPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { task, category, startDate, startTime, assigneeId, setAssigneeId } =
    useAddHouseWorkStore();

  const [selectedValue, setSelectedValue] = useState(assigneeId || null);

  console.log('전역:', task, category, startDate, startTime, assigneeId);

  const handleBackClick = () => {
    navigate('/add-housework/step1');
  };

  const handleNextClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/main');
    }, 1500);
  };

  const handleManagerClick = () => {
    setIsOpen(true);
  };

  const handleDoneClick = () => {
    setIsOpen(false);
    setAssigneeId(selectedValue);
  };

  return (
    <>
      <div className='flex h-screen flex-col gap-6 px-5 pb-6'>
        {isLoading ? (
          <>
            <HouseWorkAddLoading member={assigneeId} housework={task} date={startDate} />
          </>
        ) : (
          <>
            <HeaderWithTitle title={`담당자를\n지정해보세요`} handleClick={handleBackClick} />
            <section aria-label='집안일 추가 컨텐츠' className='flex flex-1 flex-col gap-6'>
              {assigneeId ? (
                <OpenSheetBtnWithLabel
                  title='담당자'
                  selected={assigneeId}
                  handleClick={handleManagerClick}
                />
              ) : (
                <OpenSheetBtn
                  text='책임자는 누구인가요?'
                  handleClick={handleManagerClick}
                  type='housework'
                />
              )}
            </section>
            <Button
              label='완료'
              variant='full'
              size='large'
              handleClick={handleNextClick}
              disabled={!assigneeId}
            />
          </>
        )}
      </div>

      <ManagerSelectSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        handleDoneClick={handleDoneClick}
      />
    </>
  );
};

export default HouseWorkStepTwoPage;
