import React from 'react';

interface ContactButtonProps {
  text: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ text }) => {
  return (
    <button className="w-full bg-accent hover:bg-accent-hover text-xl text-white px-4 py-3 pl-[0.9em] flex items-center justify-center rounded-md border border-accent overflow-hidden transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group relative h-[60px] hover:shadow-md">
      {/* Text Container */}
      <span className="transition-all duration-300 absolute group-hover:opacity-0">
        {text}
      </span>
      
      {/* Icon Container */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="group-hover:animate-fly">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width={24} 
            height={24}
            className="transform transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path 
              fill="currentColor" 
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes fly {
          from {
            transform: translateY(0.1em);
          }
          to {
            transform: translateY(-0.1em);
          }
        }
        .group-hover\\:animate-fly {
          animation: fly 0.6s ease-in-out infinite alternate;
        }
      `}</style>
    </button>
  );
}

export default ContactButton;