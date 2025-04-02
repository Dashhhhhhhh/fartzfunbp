import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}