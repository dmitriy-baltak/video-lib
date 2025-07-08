import type { Metadata } from "next";
import { CreateVideo } from "@/components/videos/create-video";

export default function CreatePage() {
  return <CreateVideo />;
}

export const metadata: Metadata = {
  title: "Create Video - VEED Videos",
  description: "Add a new video to your library",
};
