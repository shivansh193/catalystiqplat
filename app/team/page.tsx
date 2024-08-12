import Image from "next/image";
import { Navbar } from "../../components/navbar";
import Pustak from "../../public/Pustak.jpg";
import Anindya from "../../public/Anindya.jpg";
import Yash from "../../public/Yash.jpg";
import Shivansh from "../../public/Shivansh.jpg";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Shivansh Kalra",
      role: "CEO & Founder",
      imageUrl: Shivansh,
      description: "Heading Operations and working towards a groundbreaking future of freelancing",
    },
    {
      name: "Pustak Pathak",
      role: "Tech Lead",
      imageUrl: Pustak,
      description: "Leading tech at CatalystIQ",
    },
    {
      name: "Yashwardhan Singh",
      role: "Head of Design",
      imageUrl: Yash,
      description: "Heading Design at CatalystIQ",
    },
    {
      name: "Anindya Rastogi",
      role: "Leading Content",
      imageUrl: Anindya,
      description: "Leading Content at CatalystIQ",
    },
    // Add more team members as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Meet Our Team</h1>
        
        <section className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={128}
                  height={128}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
                {member.name}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {member.role}
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {member.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TeamPage;
