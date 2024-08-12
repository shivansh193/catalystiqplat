import { Navbar } from "../../components/navbar";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">About CatalystIQHub</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            At CatalystIQHub, we're revolutionizing the freelancing landscape by seamlessly integrating AI capabilities with human expertise. Our mission is to empower freelancers and businesses alike, creating a dynamic ecosystem where innovation thrives and quality work is consistently delivered.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What We Do</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Connect skilled freelancers with exciting opportunities</li>
            <li>Provide AI-powered tools to enhance productivity and creativity</li>
            <li>Offer a secure and efficient platform for project collaboration</li>
            <li>Facilitate seamless communication between clients and freelancers</li>
            <li>Ensure fair compensation and timely payments for completed work</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">We constantly push the boundaries of what's possible in the freelancing world.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">We believe in transparent, honest, and ethical business practices.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">Empowerment</h3>
              <p className="text-gray-600 dark:text-gray-300">We strive to give freelancers the tools and opportunities they need to succeed.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Join Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Whether you're a talented freelancer looking for exciting projects or a business seeking top-notch expertise, CatalystIQHub is here to catalyze your success. Join our community today and experience the future of AI-enhanced freelancing.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;