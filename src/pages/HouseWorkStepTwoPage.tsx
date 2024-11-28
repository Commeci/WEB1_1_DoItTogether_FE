import Button from '@/components/common/button/Button/Button';
import HeaderWithTitle from '@/components/housework/HeaderWithTitle/HeaderWithTitle';
import ManagerSelectSheet from '@/components/housework/ManagerSelectSheet/ManagerSelectSheet';
import OpenSheetBtn from '@/components/common/button/OpenSheetBtn/OpenSheetBtn';
import OpenSheetBtnWithLabel from '@/components/common/button/OpenSheetBtn/OpenSheetBtnWithLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseWorkAddLoading from '@/components/housework/HouseworkAddLoading/HouseWorkAddLoading';

const HouseWorkStepTwoPage = () => {
  const navigate = useNavigate();
  const [manager, setManager] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setManager(selectedMember);
  };

  return (
    <>
      <div className='flex h-screen flex-col gap-6 px-5'>
        {isLoading ? (
          <>
            <HouseWorkAddLoading member={selectedMember} housework='일단 몰라' date='2024-11-28' />
          </>
        ) : (
          <>
            <HeaderWithTitle
              title='새로운 집안일을 추가해보세요(2/2)'
              handleClick={handleBackClick}
            />
            <section aria-label='집안일 추가 컨텐츠' className='flex flex-1 flex-col gap-6'>
              {manager ? (
                <OpenSheetBtnWithLabel
                  title='담당자'
                  selected={manager}
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
            <Button label='완료' variant='full' size='large' handleClick={handleNextClick} />
          </>
        )}
      </div>

      <ManagerSelectSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedMember={selectedMember}
        handleSetSelectMember={setSelectedMember}
        handleDoneClick={handleDoneClick}
      />
    </>
  );
};

export default HouseWorkStepTwoPage;
