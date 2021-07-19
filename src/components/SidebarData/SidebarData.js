import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from "react-icons/md";

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
    title: 'Trending',
    path: '/trending',
    icon: <IoIcons.IoIosTrendingUp />,
    cName: 'nav-text'
  },
  {
    title: 'New Releases',
    path: '/newreleases',
    icon: <MdIcons.MdFiberNew />,
    cName: 'nav-text'
  },
  {
    title: 'Merch Store',
    path: '/store',
    icon: <MdIcons.MdFiberNew />,
    cName: 'nav-text'
  },
];