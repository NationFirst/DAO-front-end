import React, {FC} from 'react';
import styled from 'styled-components';
import cls from 'classnames';

import BlockchainImg from 'assets/images/blockchain.png';
import MissionImg from 'assets/images/mission.png';
import MembershipImg from 'assets/images/membership.png';
import RulesImg from 'assets/images/rules.png';

type CardImageType = 'blockchain' | 'mission' | 'membership' | 'rules';

const images: Record<CardImageType, typeof BlockchainImg> = {
  blockchain: BlockchainImg,
  mission: MissionImg,
  membership: MembershipImg,
  rules: RulesImg,
};

type Props = {
  type: CardImageType;
  height?: string;
};

const CardImage: FC<Props> = ({type, height = 'h-full'}) => {
  return (
    <ImageContainer height={height}>
      <img
        src={images[type]}
        alt={type}
        draggable={false}
        className="!h-[90px] !w-[90px] select-none"
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.div.attrs<{height?: string}>(({height}) => ({
  className: cls('w-full flex justify-center items-center', height),
}))`
  background: linear-gradient(250deg, #133a22 6.66%, #156433 91.47%);
`;

export default CardImage;
