import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthFormProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthFormContainer = ({
  title,
  description,
  children,
}: AuthFormProps) => {
  return (
    <Card className="w-sm sm:w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthFormContainer;
