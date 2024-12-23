import {
  ProviderButton,
  ProviderLabel,
} from "@/components/forms/ProviderButton";
import Heading from "@/components/headings/Heading";
import Title from "@/components/headings/Title";
import { Container } from "@/components/layout/Container";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import EmailAndPasswordForm from "@/components/forms/EmailAndPasswordForm";
import TermsOfUse from "@/components/forms/TermsOfUse";
import SignInOption from "@/components/forms/SignInOption";

function SignUpPage({ children }) {
  console.log("this is a server component");
  return (
    <>
      <header className="text-center pt-28 ">
        <h2 className="text-5xl text-slate-900">Sign Up for new users</h2>
      </header>

      <main className=" min-h-screen py-24 bg-zinc-400 w-full max-h-full">
        {children}
        <section className="max-w-lg py-10 mx-auto bg-white  rounded-md border border-zinc-300 px-8">
          <Heading className="mb-12 text-center">
            <Title as="h2" className="text-2xl font-bold text-zinc-900">
              Account Sign Up
            </Title>
          </Heading>
          <Container className=" flex flex-col items-center gap-y-4">
            <ProviderButton className="rounded-lg flex w-3/4 px-16  items-center border border-zinc-300 py-2.5 gap-x-2.5 hover:bg-zinc-100">
              <IoLogoGoogle className="w-6 h-6" />{" "}
              <ProviderLabel>Sign up with Google</ProviderLabel>
            </ProviderButton>
            <ProviderButton className="rounded-lg flex w-3/4 px-16  items-center border border-zinc-300   py-2.5 gap-x-2.5 hover:bg-zinc-100">
              <IoLogoGithub className="w-6 h-6" />{" "}
              <ProviderLabel>Sign up with GitHub</ProviderLabel>
            </ProviderButton>
          </Container>
          <Container className="flex items-center justify-between mt-16 mb-10 gap-x-2">
            <div className="flex-1  h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-2 text-sm text-center text-gray-500  ">
              Sign up with email and password
            </div>
            <div className="flex-1 h-0.5 bg-gray-200  "></div>
          </Container>
          <EmailAndPasswordForm />
          <SignInOption className="my-9" />
          <TermsOfUse className="mx-5" />
        </section>
      </main>
    </>
  );
}

export default SignUpPage;
