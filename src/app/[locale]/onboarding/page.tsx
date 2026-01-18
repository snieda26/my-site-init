// ============================================================================
// TEMPORARY: Onboarding/Quiz functionality is temporarily disabled
// TODO: Re-enable this feature when ready
// ============================================================================

'use client';

// import { OnboardingWizard } from '@/modules/onboarding';
import { AuthGuard } from '@/modules/auth/guards';
import { useLocale } from '@/common/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const locale = useLocale();
  const router = useRouter();
  
  // Temporarily redirect to home page
  useEffect(() => {
    router.push(`/${locale}`);
  }, [locale, router]);
  
  return null;
  
  // TEMPORARILY COMMENTED OUT - Onboarding wizard
  // return (
  //   <AuthGuard redirectTo={`/auth/login/${locale}`}>
  //     <OnboardingWizard />
  //   </AuthGuard>
  // );
}
