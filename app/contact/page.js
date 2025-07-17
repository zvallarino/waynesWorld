import ContactForm from "@/components/body/ContactForm";
import Homepage from "@/components/body/Homepage";
import Toolbar from "@/components/toolbar/Toolbar";

export default function Contact() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-green-500 px-4 sm:px-6 md:px-[5%]">
      <header className="w-full py-2">
        <Toolbar />
      </header>
      <main className="flex-1 w-full ">
        <ContactForm />
      </main>
    </div>
  );
}