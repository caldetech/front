import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="sr-only">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="w-full"
            placeholder="Name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full"
            placeholder="Email address"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </div>
    </form>
  );
}
