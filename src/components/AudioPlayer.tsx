import React, { useRef } from 'react';

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const togglePlay = () => {
    audioRef.current?.play();
  };

  return (
    <span>
      <div
        className="inline-block cursor-pointer text-primary"
        onClick={togglePlay}>
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16">
          <path
            d="M92.59163 7.124244v175.409681l588.077547 329.465052-460.111316 245.981852V402.176952l-127.966231-71.344766v686.04357l838.81674-504.876779z"
            fill="var(--ifm-color-primary)"></path>
        </svg>
      </div>
      <audio
        ref={audioRef}
        src={src}
      />
    </span>
  );
};

export default AudioPlayer;
