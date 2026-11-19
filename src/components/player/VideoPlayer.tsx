import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  RotateCw,
  CheckCircle,
  Settings,
  Keyboard,
  ExternalLink,
} from 'lucide-react';

export const getYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  isCompleted = false,
  onToggleComplete,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  const youtubeId = getYouTubeId(videoUrl);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [videoUrl]);

  // Keyboard shortcut listener for HTML5 video
  useEffect(() => {
    if (youtubeId) return; // YouTube iframe manages its own native keyboard controls

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        skipTime(-10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        skipTime(10);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, youtubeId]);

  // If this is a YouTube video, render YouTube Embed Player
  if (youtubeId) {
    return (
      <div className="relative group bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-800">
        {/* Top Header Bar with Lecture Title and YouTube Badge */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600 text-white font-bold text-[10px] tracking-wide shrink-0">
              YouTube HD
            </span>
            <span className="font-semibold text-slate-200 truncate">{title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleComplete && (
              <button
                onClick={onToggleComplete}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  }`}
              >
                <CheckCircle size={13} />
                <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
              </button>
            )}

            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Responsive YouTube Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={youtubeId}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  const handleSpeedSelect = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement.requestFullscreen().catch((err) => console.error(err));
      } else {
        document.exitFullscreen().catch((err) => console.error(err));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative group bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video flex flex-col justify-center select-none">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
      />

      {/* Big Center Play Overlay (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 transform hover:scale-110 transition-transform pl-1">
            <Play size={32} className="fill-white" />
          </div>
        </button>
      )}

      {/* Control Bar Overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress Slider */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:h-2 transition-all"
        />

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-1 hover:text-teal-400">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => skipTime(-10)}
              className="p-1 hover:text-teal-400 hidden sm:block"
              title="Rewind 10s (Left Arrow)"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => skipTime(10)}
              className="p-1 hover:text-teal-400 hidden sm:block"
              title="Fast Forward 10s (Right Arrow)"
            >
              <RotateCw size={16} />
            </button>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="p-1 hover:text-teal-400">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-teal-500 hidden sm:block"
              />
            </div>
            <span className="font-mono text-[11px] text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mark completed quick toggle */}
            {onToggleComplete && (
              <button
                onClick={onToggleComplete}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
              >
                <CheckCircle size={14} />
                <span className="hidden sm:inline">
                  {isCompleted ? 'Completed' : 'Mark Complete'}
                </span>
              </button>
            )}

            {/* Playback speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md font-mono text-[11px] flex items-center gap-1"
              >
                <Settings size={12} />
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-8 right-0 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 w-20 text-center">
                  {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedSelect(s)}
                      className={`w-full py-1 text-xs hover:bg-teal-600/50 ${playbackSpeed === s ? 'text-teal-400 font-bold' : 'text-slate-300'
                        }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="p-1 hover:text-teal-400">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

