import Heading from "@/components/headings/Heading";
import Title from "@/components/headings/Title";
import { Container } from "@/components/layout/Container";
import TermsOfUse from "@/components/forms/TermsOfUse";
import SignInOption from "@/components/forms/SignInOption";
import SigninPage from "./SigninPage";
import Image from "next/image"; 
import Footer from "@/components/footer/footer";

{
  /*const auth = getAuth(db);*/
}

function Page({ children }) {
  console.log("this is a server component");
  return (
    <>
      <header className="text-center " style={{position:'absolute'}}>
        {/*<h4 className="text-5xl text-slate-900">Registered Users Please Sign In</h4>*/}
      </header>

      <main className=" min-h-screen py-24 bg-white w-full ">
        {children}
     
        
        <section className="max-w-lg py-10 mx-auto bg-blue-950 mt-24  rounded-md border border-zinc-300 px-8">
          <Heading className="mb-12 text-center">
            <Title as="h2" className="text-3xl font-bold text-white">
              Registered Users Sign In
            </Title>
          </Heading>
          
          <Container className=" flex flex-col items-center gap-y-4">
            {/*<ProviderButton className="rounded-lg flex w-3/4 px-16  items-center border border-zinc-300 py-2.5 gap-x-2.5 hover:bg-zinc-100">
              <IoLogoGoogle className="w-6 h-6" />{" "}
              <ProviderLabel>Sign in with Google</ProviderLabel>
            </ProviderButton>*/}
            {/*<ProviderButton className="rounded-lg flex w-3/4 px-16  items-center border border-zinc-300   py-2.5 gap-x-2.5 hover:bg-zinc-100">
              <IoLogoGithub className="w-6 h-6" />{" "}
              <ProviderLabel>Sign in with GitHub</ProviderLabel>
          </ProviderButton>*/}
          </Container>
          <Container className="flex items-center justify-between mt-16 mb-10 gap-x-2">
            <div className="flex-1  h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-2 text-xl text-center text-white">
              Sign In with email and password
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </Container>

          <SigninPage />

          <SignInOption className="my-9" />
          <TermsOfUse className="mx-5" />
        </section>
      </main>
    <Footer />

    </>
  );
}

export default Page;
