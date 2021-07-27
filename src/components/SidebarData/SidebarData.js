import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si"

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Genre',
    path: '/genre',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Merch Store',
    path: '/store',
    icon: <MdIcons.MdStore />,
    cName: 'nav-text'
  },
  {
    title: 'My Orders',
    path: '/order',
    icon: <SiIcons.SiEventstore />,
    cName: 'nav-text'
  },
];