import React from 'react'
import { Head } from '@inertiajs/inertia-react';
import MainMenu from './MainMenu';
import TopHeader from './TopHeader';
import BottomHeader from './BottomHeader';
import FlashMessages from './FlashMessages';

const Layout = ({ title, children }) => {
  return (
    <div>
        <Head>
            <title>{`${title} | Blog Dashboard`}</title>
        </Head>
        <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="flex-shrink-0 hidden w-56 p-12 bg-coolBlue overflow-y-auto md:block" />
            {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
            <div className="w-full px-4 py-3 overflow-scroll md:p-12">
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
