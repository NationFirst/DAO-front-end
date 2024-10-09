import React, {FC} from 'react';
import Button from './button';
import Arrow from '../../assets/icons/arrow';

type Props = {
  onClick: () => void;
};

const ButtonCreateDao: FC<Props> = ({onClick}) => {
  return (
    <Button
      variant="fill"
      onClick={onClick}
      iconRight={<Arrow w={20} h={20} />}
    >
      CREATE A DAO
    </Button>
  );
};

export default ButtonCreateDao;
