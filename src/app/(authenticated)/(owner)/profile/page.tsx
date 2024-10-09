import LayoutContainer from "@/components/layout/layout-container";
import LoadingSection from "@/components/loading/loading-section";
import ProfileContent from "@/components/profile/profile-content";
import { TypographyH2 } from "@/components/ui/typhography-h2";
import { Suspense } from "react";

const ProfilePage = async () => {
  return (
    <LayoutContainer className="flex h-full w-full flex-col items-center">
      <TypographyH2 className="mb-5">Profile</TypographyH2>
      <Suspense fallback={<LoadingSection />}>
        <ProfileContent />
      </Suspense>
    </LayoutContainer>
  );
};

export default ProfilePage;
