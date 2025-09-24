// components/sidebar-data.ts
import StepAreas from "@/components/resource/create-resource/steps/step-areas";
import StepAttachment from "@/components/resource/create-resource/steps/step-attachment";
import StepBasicData from "@/components/resource/create-resource/steps/step-basic-data";
import StepMyCommunities from "@/components/resource/create-resource/steps/step-my-communities";
import StepSummary from "@/components/resource/create-resource/steps/step-summary";
import {
  IconHomeFilled,
  IconLibraryPlus,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { auth } from "../../auth";

interface Mail {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}

export const navigationBarData = {

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
      isActive: true,
    }
  ],

  mails: [] as Mail[],
};

export const navigationCreateResouceData = [
  {
    id: 1,
    name: "basicData",
    component: StepBasicData,
    fieldsToValidate: ["title", "description", "type"]
  },
  {
    id: 2,
    name: "attachment",
    component: StepAttachment,
    fieldsToValidate: ["attachment"]
  },
  { id: 3, name: "areas", component: StepAreas, fieldsToValidate: [] },
  { id: 4, name: "myCommunities", component: StepMyCommunities, fieldsToValidate: [] },
  { id: 5, name: "summary", component: StepSummary, fieldsToValidate: [] }
]
