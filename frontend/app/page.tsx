import type { Metadata } from "next";
import { VideoLibrary } from "@/components/videos/video-library";

export default function HomePage() {
  return <VideoLibrary />;
}

export const metadata: Metadata = {
  title: "VEED Videos",
  description: "Browse and manage your video collection",
};
