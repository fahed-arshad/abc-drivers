import Link from "next/link";

function SignUpDisclaimer() {
  return (
    <div>
      <p className="text-white text-center">
        By clicking ‘JOIN US’, I agree that ABC Emergency or it’s
        representatives may contact me by email, phone, or SMS (including by
        automatic telephone dialing system) at the email address and number
        provided. I also agree to ABC Emergency's{" "}
        <span className="text-primary">
          {" "}
          <Link href="/">Terms and Conditions</Link>
        </span>{" "}
        and
        <span className="text-primary">
          <Link href="/"> Privacy Policy</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUpDisclaimer;
