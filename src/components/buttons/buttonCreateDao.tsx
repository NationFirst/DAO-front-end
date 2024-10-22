import React, {FC} from 'react';

import Button from './button';
import Arrow from 'assets/icons/arrow';
import useMediaQuery from 'hooks/useMediaQuery';

type Props = {
  onClick: () => void;
};

const ButtonCreateDao: FC<Props> = ({onClick}) => {
  const {isMobile} = useScreen();

  return (
    <Button
      fullWidth={isMobile}
      variant="fill"
      onClick={onClick}
      iconRight={<Arrow w={20} h={20} />}
    >
      CREATE A DAO
    </Button>
  );
};

export default ButtonCreateDao;
