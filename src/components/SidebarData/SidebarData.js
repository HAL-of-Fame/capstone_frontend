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
    path: '',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    
    subNav: [
      {
        title: 'Action',
        path: '/genre/action',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Comedy',
        path: '/genre/comedy',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Romance',
        path: '/genre/romance',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Drama',
        path: '/genre/drama',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Horror',
        path: '/genre/horror',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Science Fiction',
        path: '/genre/science-fiction',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Merch Store',
    path: '/store',
    icon: <MdIcons.MdStore />,
    cName: 'nav-text'
  },
  {
    title: 'My Orders',
    path: '/orders',
    icon: <SiIcons.SiEventstore />,
    cName: 'nav-text'
  },
];