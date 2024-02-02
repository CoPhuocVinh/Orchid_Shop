'use client';

import clsx from 'clsx';
import Link from 'next/link';

export default function SeeMore({ className }: { className?: string }) {
  return (
    <Link
      href="/auction"
      className={clsx(
        'inline-block whitespace-nowrap pr-4 text-sm font-bold leading-6 text-gray-light underline sm:pr-6 md:text-base lg:pr-0',
        className
      )}
    >
      See More
    </Link>
  );
}
