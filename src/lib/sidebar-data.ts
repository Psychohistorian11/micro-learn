// components/sidebar-data.ts
import {
  IconHomeFilled,
  IconLibraryPlus,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    { title: "Home", url: "/", icon: IconHomeFilled, isActive: true },
    { title: "Search", url: "/search", icon: IconSearch, isActive: true },
    {
      title: "Create",
      url: "/create-resource",
      icon: IconLibraryPlus,
      isActive: false,
    },
    {
      title: "Communities",
      url: "/communities",
      icon: IconUsers,
      isActive: false,
    },
  ],

  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
  ],
};
