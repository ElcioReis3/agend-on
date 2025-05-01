import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  description: string;
};
export const AlertDestructive = ({ description }: Props) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Importante</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
