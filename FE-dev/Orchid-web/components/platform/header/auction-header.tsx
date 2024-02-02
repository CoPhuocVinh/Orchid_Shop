'use client';

import { useRef } from 'react';
// import useAuth from '@/hooks/use-auth';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import { Button } from '@/components/ui/button';
import SearchIconBtn from './search-icon-btn';
import Searchbox from './search-box';
import Link from 'next/link';
// import SearchIconBtn from '@/components/ui/search-icon-btn';
// import SideNavButton from '@/components/ui/side-nav-button';
// import ProfileMenu from '@/components/header/profile-menu';
// import { useModal } from '@/components/modals/context';
// import Searchbox from '@/components/ui/search-box';
// import Button from '@/components/ui/button';
// import Logo from '@/components/ui/logo';
// import { useIsMounted } from '@/hooks/use-is-mounted';

export default function AuctionHeader() {
//   const mounted = useIsMounted();
//   const { openModal } = useModal();
//   const { isAuthorized } = useAuth();
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const isAuthorized = false

  return (
    <header
      ref={headerRef}
      className="dashboard-header sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid grid w-full grid-cols-2 items-center gap-0 lg:grid-cols-3 3xl:!px-12">
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          {/* <SideNavButton className="!block" />
          <Logo className="!text-gray-dark" /> */}

          <Link href="/" className='!text-gray-dark'>LOGO</Link>
        </div>
        <Searchbox className="hidden lg:block" />
        <div className="flex items-center justify-end gap-5">
          <SearchIconBtn />
          {/* {mounted ? ( */}
            <>
              {isAuthorized ? (
                // <ProfileMenu className="hidden md:block" />
                <div>Profile</div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                //   onClick={() => openModal('SIGN_IN')}
                  className="rounded-lg !px-4 py-2 text-sm capitalize md:text-base"
                >
                  Log in
                </Button>
              )}
            </>
          {/* ) : null} */}
        </div>
      </div>
    </header>
  );
}
