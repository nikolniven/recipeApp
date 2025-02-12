const About = () => {
  const people = [
    {
      name: "Timothy Williams",
      image: "https://avatars.githubusercontent.com/u/82573894?v=4",
      description: "Passionate developer and food lover 🍕",
      github: "https://github.com/Tim-lab84",
      linkedin: "https://www.linkedin.com/in/timothy-c-williams/",
    },
    {
      name: "Nikol Niven",
      image: "https://avatars.githubusercontent.com/u/93343167?v=4",
      description: "Tech enthusiast and problem solver 💡",
      github: "https://github.com/nikolniven",
      linkedin: "https://www.linkedin.com/in/nikol-topalusic/",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Add flex-row to display elements side by side */}
      <div className="flex flex-row justify-center space-x-6">
        {people.map((person, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center max-w-md mb-6"
          >
            {/* Clickable Profile Picture */}
            <a href={person.github} target="_blank" rel="noopener noreferrer">
              <img
                src={person.image}
                alt={person.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer hover:opacity-80"
              />
            </a>

            {/* Clickable Name */}
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <h2 className="text-2xl font-semibold hover:text-blue-600 cursor-pointer">
                {person.name}
              </h2>
            </a>

            <p className="text-gray-600">{person.description}</p>

            {/* Social Links */}
            <div className="flex justify-center mt-4 space-x-4">
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
