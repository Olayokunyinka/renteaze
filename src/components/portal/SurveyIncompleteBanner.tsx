import { Link } from "react-router-dom";
import { UserCheck, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const SurveyIncompleteBanner = () => {
  const { profile } = useAuth();
  if (!profile || profile.survey_completed) return null;

  return (
    <div className="bg-accent/15 border border-accent/40 text-foreground rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
      <UserCheck className="h-5 w-5 text-accent flex-shrink-0" />
      <p className="flex-1 text-sm">
        <span className="font-semibold">Complete your profile</span> — it takes 2 minutes and helps us personalise your experience.
      </p>
      <Link
        to="/signup/survey"
        className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 whitespace-nowrap"
      >
        Complete Now <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default SurveyIncompleteBanner;
