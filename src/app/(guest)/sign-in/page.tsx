import LogInForm from "./sign-in-form";

export default function SignInPage() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen w-full">
      <div className="hidden bg-gray-100 lg:block">
        <img
          src={"images/cover.png"}
          alt="Login visual"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <LogInForm />
      </div>
    </div>
  );
}
