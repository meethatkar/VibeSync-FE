import React, { useRef, useState, useEffect } from "react";
import { useEmotion } from "../../../expression/hooks/useEmotion";
import HeroLeftContent from "./HeroLeftContent";
import ScannerCard from "./ScannerCard";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

const Hero = ({ onEmotionChange, currentSongName, currentEmotion }) => {
  const videoRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState(null);

  const { emotion, isDetecting, startDetection, stopDetection } =
    useEmotion(videoRef);

  useEffect(() => {
    // Prevent firing for the default hook string
    if (onEmotionChange && emotion && !emotion.startsWith("Click on")) {
      onEmotionChange(emotion);
    }
  }, [emotion, onEmotionChange]);

  const handleLaunchScan = async () => {
    if (isCameraReady) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraReady(true);
      startDetection();
      showSuccessToast("Camera sensor linked. Biometric tracking active.");
    } catch (error) {
      console.warn("Camera Access Notice:", error);
      showErrorToast("Camera unavailable. Using interactive mood simulator buttons below.");
    }
  };

  const handleStopScan = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraReady(false);
    if (stopDetection) stopDetection();
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Format emotion for display: use detected emotion if detecting, otherwise use current active emotion
  const displayEmotion = isCameraReady && emotion && !emotion.startsWith("Click on")
    ? emotion
    : (currentEmotion || "Ready");

  return (
    <section className="w-full max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10 z-10 relative">
      <HeroLeftContent 
        isCameraReady={isCameraReady}
        onLaunchScan={handleLaunchScan}
        onStopScan={handleStopScan}
        onSimulateMood={(mood) => onEmotionChange && onEmotionChange(mood)}
        currentEmotion={currentEmotion}
      />
      
      <ScannerCard 
        isCameraReady={isCameraReady}
        videoRef={videoRef}
        isDetecting={isDetecting || !isCameraReady}
        displayEmotion={displayEmotion}
        currentSongName={currentSongName}
      />
    </section>
  );
};

export default Hero;

