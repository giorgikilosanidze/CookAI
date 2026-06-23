import Bookmark from "@/components/icons/Bookmark";
import Sparkle from "@/components/icons/Sparkle";
import Tag from "@/components/icons/Tag";
import type { Step } from "@/components/home/types";

export const INGREDIENTS = ["chicken", "rice", "onion", "garlic"];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Enter your ingredients",
    caption:
      "List whatever you've got on hand — type each item as a quick tag, then add optional filters for cuisine, diet, or cook time.",
    Icon: Tag,
  },
  {
    number: "02",
    title: "Get an AI recipe",
    caption:
      "CookAI writes a complete recipe in seconds — exact amounts and clear, numbered steps, tuned to the filters you chose.",
    Icon: Sparkle,
  },
  {
    number: "03",
    title: "Save your favorites",
    caption:
      "Love what you made? Save it to your personal cookbook and pull it back up any time you want to cook it again.",
    Icon: Bookmark,
  },
];
