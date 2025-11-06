import SetupProfileForm from "@/components/SetupProfileForm";
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadSearchParams } from "@/lib/searchParams";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SetupProfilePage({ searchParams }: PageProps) {
  const { step, wantToBeDriver } = await loadSearchParams(searchParams);
  const TOTAL_STEP = wantToBeDriver ? 3 : 2;
  const progress = (step / TOTAL_STEP) * 100;

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us verify your identity and set up your account. This ensures a safe community for everyone.
          </CardDescription>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {step} of {TOTAL_STEP}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <SetupProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
