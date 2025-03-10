interface GroupIconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const GroupIcon: React.FC<GroupIconProps> = ({
  className = 'text-main',
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M11.6465 12.7973C14.2797 13.9159 15.77 15.6517 16.5496 18.2706H22.2668C22.947 18.2706 23.4984 17.7192 23.4984 17.039C23.4984 13.638 20.7413 10.8809 17.3403 10.8809H16.1109C14.3537 10.8809 12.7684 11.6168 11.6465 12.7973Z'
        fill='currentColor'
      />
      <ellipse cx='16.7275' cy='6.0791' rx='3.76269' ry='3.76269' fill='currentColor' />
      <ellipse cx='8.10105' cy='8.00241' rx='4.22214' ry='4.22214' fill='currentColor' />
      <path
        d='M0.5 20.3007C0.5 16.4844 3.59376 13.3906 7.41011 13.3906H8.7896C12.6059 13.3906 15.6997 16.4844 15.6997 20.3007C15.6997 21.064 15.0809 21.6828 14.3177 21.6828H1.88202C1.11875 21.6828 0.5 21.064 0.5 20.3007Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default GroupIcon;
