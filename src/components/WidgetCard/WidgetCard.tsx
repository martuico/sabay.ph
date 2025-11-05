import { CardContent } from "@/components/ui/card";
import { isReactNode } from "@/lib/utils";
import { Card } from "@radix-ui/themes";
import { ReactNode } from "react";

export interface WidgetCardProps {
  subtitle: string;
  title: string;
  helperText?: string | ReactNode;
  icon?: ReactNode;
}

export default function WidgetCard({ subtitle, title, helperText, icon }: WidgetCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          {icon && (
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">{icon}</div>
          )}
        </div>
        <p className="text-3xl font-bold">{title}</p>

        {helperText && typeof helperText === "string" && (
          <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
        )}

        {helperText && isReactNode(helperText) && <>{helperText}</>}
      </CardContent>
    </Card>
  );
}
