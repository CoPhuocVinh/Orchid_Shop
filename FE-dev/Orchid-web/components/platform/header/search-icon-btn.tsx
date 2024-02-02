'use client';

import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import ActionIcon from '../home/action-icon';

export default function SearchIconBtn({
  className = 'lg:hidden',
}: {
  className?: string;
}) {
  return (
    <ActionIcon
      variant="text"
      className={clsx('focus:!ring-0', className)}
    //   onClick={() => openModal('SEARCH_MODAL')}
    >
      <MagnifyingGlassIcon className="h-6 w-5 sm:w-6" />
    </ActionIcon>
  );
}
