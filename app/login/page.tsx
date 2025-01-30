import { LoginForm } from "@/components/login-form"
import {login, signup} from "@/app/login/actions";

export default function LoginPage() {
  return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
              <LoginForm />
          </div>
      </div>
      /*
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
              <form>
                  <label htmlFor="email">Email:</label>
                  <input id="email" name="email" type="email" required />
                  <label htmlFor="password">Password:</label>
                  <input id="password" name="password" type="password" required />
                  <button formAction={login}>Log in</button>
                  <button formAction={signup}>Sign up</button>
              </form>
          </div>
      </div>
      */
  )
}

/*
<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>

 */
/**/