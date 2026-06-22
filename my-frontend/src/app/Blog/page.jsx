import React from "react";
// If you're using React Router for navigation:
import { Link } from "react-router-dom"; 

export default function Blog() {
  const featuredArticles = [
    {
      title: "Cycling Through the Himalayas: A Ride to Remember",
      date: "04-02-2024",
      time: "10 min read",
      image: '/assets/cycling.png',
      description:
        "Explore the untouched trails and high-altitude paths of the Himalayas by bike. A perfect blend of thrill, endurance, and breathtaking views awaits you.",
    },
    {
      title: "Soul Searching in Spiti: A Winter Escape",
      date: "16-01-2024",
      time: "7 min read",
      image: '/assets/cycling.png',
      description:
        "Uncover the tranquil beauty of Spiti Valley during winter. Discover monasteries, snow-covered landscapes, and silence that speaks to your soul.",
    },
    {
      title: "Top 5 Local Dishes You Must Try in Nako",
      date: "28-12-2023",
      time: "4 min read",
      image: '/assets/cycling.png',
      description:
        "From steaming momos to buttery thukpa, here’s what not to miss when dining like a local in Nako – the heart of Himachal’s hidden flavors.",
    },
  ];

  const blogEntries = [
    {
      title: "Journey to Nako: The Hidden Gem of Himachal",
      description:
        "Tucked away from the tourist chaos, Nako village is a quiet retreat for those looking to reconnect with nature and themselves.",
      date: "04",
      month: "MAR",
    },
    {
      title: "Why You Should Travel Solo at Least Once",
      description:
        "Solo trips aren’t just about being alone — they’re about discovering your truest self through the mountains.",
      date: "12",
      month: "FEB",
    },
    {
      title: "The Sacred Trails: Trekking to Ancient Monasteries",
      description:
        "Follow paths less traveled and find peace where spirituality and landscape meet in the remote Himalayas.",
      date: "25",
      month: "JAN",
    },
    {
      title: "How to Prepare for High-Altitude Adventures",
      description:
        "Essential tips and tricks to stay safe, fit, and ready for your next Himalayan expedition.",
      date: "19",
      month: "DEC",
    },
    {
      title: "Top Eco-Friendly Travel Practices You Should Follow",
      description:
        "Respect the land you explore. Learn how to travel sustainably while enjoying pristine mountain beauty.",
      date: "06",
      month: "DEC",
    },
    {
      title: "A Local’s Guide to the Best Spots in Himachal",
      description:
        "Get insider tips on where to eat, stay, and wander — from cozy cafés to breathtaking viewpoints.",
      date: "22",
      month: "NOV",
    },
    {
      title: "Traveling on a Budget: Himalayan Edition",
      description:
        "Want adventure without breaking the bank? Here's how to explore Himachal affordably.",
      date: "03",
      month: "NOV",
    },
    {
      title: "Capturing the Himalayas: Photography Tips for Beginners",
      description:
        "Learn how to frame the perfect mountain shot and capture the soul of the highlands.",
      date: "15",
      month: "OCT",
    },
  ];

  return (
    <div className='py-8 bg-gray-50'>
      {/* Header Section */}
      <div className='flex responsivewidth flex-col md:flex-row justify-between gap-8 mb-12'>
        <div className='w-full md:w-1/2 flex justify-center items-start flex-col'>
          <h1 className=' text-3xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4'>
            <span className=' text-[#0c8699] '>Blog</span> and Article
          </h1>
          <p className='mb-4 justify-start text-black text-xl font-normal font-Poppins'>
            Dive into stories from the heart of the Himalayas. From spiritual journeys to thrilling treks, our blogs bring the mountains closer to you.
          </p>
          <div className='inline-block rounded-full overflow-hidden'>
            <img
              src='/assets/heartNako.png'
              alt='Heart of Nako'
              width={300}
              height={200}
              className='w-[100px] sm:w-[150px] md:w-[180px] lg:w-[216px] lg:h-[92px] rounded-[54px]'
            />
          </div>
        </div>

        {/* Featured Articles */}
        <div className='w-full md:w-1/2 max-w-lg space-y-4'>
          {featuredArticles.map((item, index) => (
            <div
              key={index}
              className='flex border-b-[2px] border-gray-200 pb-2 gap-2 lg:gap-4 items-center'
            >
              <div className='w-[163px] relative flex-shrink-0'>
                <img
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className='w-full h-full rounded-md object-cover'
                />
              </div>
              <div className='flex-1'>
                <div className='flex justify-between text-base font-normal text-gray-500 font-poppins leading-[30px]'>
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </div>
                <h3 className='justify-start text-black text-lg lg:text-xl font-semibold font-poppins leading-[30px]'>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Blog Grid */}
      <div className='grid responsivewidth mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {blogEntries.map((entry, index) => (
          <div
            key={index}
            className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='relative'>
              <img
                src='/assets/himalya.png'
                alt={entry.title}
                width={300}
                height={200}
                className='w-full h-48 object-cover'
              />
              <div className='absolute bottom-3 -left-0.5 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded'>
                <div className='text-center'>
                  <span>{entry.date}</span>
                  <div className='text-[10px]'>{entry.month}</div>
                </div>
              </div>
            </div>
            <div className='p-4'>
              <h3 className='justify-start text-black text-xl font-semibold font-poppins leading-[30px] mb-2'>
                {entry.title}
              </h3>
              <p className='text-gray-600 justify-start text-Color-2 text-base font-normal font-poppins leading-[30px]'>
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className='flex justify-center'>
        <Link
          to='#'
          className='bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors'
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
}
