// Route entry for /signin.
// Route file stays tiny and renders module-owned page UI.
import SignInPage from "@/modules/auth/pages/SignInPage";

export default function SignInRoutePage() {
  return <SignInPage />;
}
