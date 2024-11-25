import { useTranslations } from 'next-intl';
import Link from 'next/link';

function SignUpDisclaimer() {
  const t = useTranslations('signUpPage');
  return (
    <div>
      <p className="text-white text-center">
        {t('agreement')}{' '}
        <span className="text-primary">
          {' '}
          <Link href="/">{t('terms')}</Link>
        </span>{' '}
        {t('and')}
        <span className="text-primary">
          <Link href="/">{t('privacy')}</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUpDisclaimer;
