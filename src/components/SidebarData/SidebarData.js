import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Genre",
    path: "",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",

    subNav: [
      {
        title: "Action",
        path: "/genre/Action",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Animation",
        path: "/genre/Animation",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Adventure",
        path: "/genre/Adventure",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Comedy",
        path: "/genre/Comedy",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Family",
        path: "/genre/Family",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Fantasy",
        path: "/genre/Fantasy",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Romance",
        path: "/genre/Romance",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Drama",
        path: "/genre/Drama",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Horror",
        path: "/genre/Horror",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Science Fiction",
        path: "/genre/ScienceFiction",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Thriller",
        path: "/genre/Thriller",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Merch Store",
    path: "/store",
    icon: <MdIcons.MdStore />,
    cName: "nav-text",
  },
  {
    title: "My Orders",
    path: "/orders",
    icon: <SiIcons.SiEventstore />,
    cName: "nav-text",
  },
];
