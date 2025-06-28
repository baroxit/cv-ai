import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function NavNews() {
  return (
    <Card className="w-full max-w-xs rounded-xl shadow-sm border p-0">
      <CardContent className="p-4 pb-2">
        <CardTitle className="text-base font-semibold mb-1">Cal.com Integration</CardTitle>
        <CardDescription className="text-sm mb-2">
          You can now track Cal.com booking events…
        </CardDescription>
      </CardContent>
      <div className="w-full px-4 pb-4">
        <img
          src="/images/cal-dub.png"
          alt="Cal.com and dub integration"
          className="rounded-lg w-full object-cover"
        />
      </div>
    </Card>
  );
} 