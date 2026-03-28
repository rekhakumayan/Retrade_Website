// Route entry for /signup.
// Route file stays tiny and renders module-owned page UI.

import SignUpPage from "@/modules/auth/pages/SignUpPage";

export default async function SignUpRoutePage() {

  return <SignUpPage />;
}