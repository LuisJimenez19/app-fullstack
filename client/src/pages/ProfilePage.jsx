import { LayoutDefault } from "./layout/LayoutDefault";
import { UserAction } from "../components/UserAction";

import "../css/profile-page.css";
import { PromptSuggestion } from "./PromptSuggestion";
import FooterProfile from "../components/FooterProfile";

function ProfilePage() {
  return (
    <LayoutDefault>
      <main className="profile-page">
        <div className="profile-group-sections">
          <UserAction />
          <PromptSuggestion />
        </div>
        <FooterProfile />
      </main>
    </LayoutDefault>
  );
}

export { ProfilePage };
