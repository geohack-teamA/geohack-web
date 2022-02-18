import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';

export type Props = {
  className?: string;
  icon: keyof typeof Icons;
  m?: number;
  p?: number;
};

const Icons = {
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
};

const Icon: React.FC<Props> = ({ className, icon, m, p }) => {
  const IconComp = Icons[icon];
  return <IconComp m={m} p={p} />;
};

export default Icon;
