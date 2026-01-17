'use client';

import { OnboardingWizard } from '@/modules/onboarding';
import { AuthGuard } from '@/modules/auth/guards';
import { useLocale } from '@/common/hooks';

export default function OnboardingPage() {
  const locale = useLocale();
  
  return (
    <AuthGuard redirectTo={`/auth/login/${locale}`}>
      <OnboardingWizard />
    </AuthGuard>
  );
}
