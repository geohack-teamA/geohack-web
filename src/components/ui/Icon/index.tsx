import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { GrLocation } from 'react-icons/gr';
export type Props = {
  className?: string;
  icon: keyof typeof Icons;
  m?: number;
  p?: number;
  onClick?: () => void;
};

const Icons = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  location: GrLocation,
};

const Icon: React.FC<Props> = ({ className, icon, m, p, onClick }) => {
  const IconComp = Icons[icon];
  return <IconComp m={m} p={p} onClick={onClick} />;
};

export default Icon;
