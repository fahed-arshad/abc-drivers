import { useTranslations } from 'next-intl';
import Link from 'next/link';

function SignUpDisclaimer() {
  const t = useTranslations('signUpPage');
  return (
    <p className="text-xs text-neutral-300 text-center">
      {t('agreement')}{' '}
      <span className="text-primary">
        {' '}
        <Link href="https://abc-emergency.com/terms-and-conditions">{t('terms')}</Link>
      </span>{' '}
      {t('and')}{' '}
      <span className="text-primary">
        <Link href="https://abc-emergency.com/terms-and-conditions">{t('privacy')}</Link>
      </span>
    </p>
  );
}

export default SignUpDisclaimer;
