import { useEffect, useRef, useState } from "react";

import { initializeFaceLandmarker } from "../service/mediapipe";
import { mapBlendShapes } from "../utils/blendShapeMapper";
import { detectEmotion } from "./emotionClassifier";

export function useEmotion(videoRef) {
  const [emotion, setEmotion] = useState(
    "Click on 'Start Detection' to capture emotion",
  );
  const [isDetecting, setIsDetecting] = useState(false);

  const previousEmotion = useRef("");
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !isDetecting) return;

    let faceLandmarker;
    let active = true;

    async function startDetection() {
      try {
        faceLandmarker = await initializeFaceLandmarker();
        if (active) detect();
      } catch (err) {
        console.warn("MediaPipe model loading deferred or failed:", err.message);
      }
    }

    function detect() {
      if (!active) return;

      const video = videoRef.current;

      if (!video) return;

      // Wait until webcam is ready
      if (video.readyState < 2) {
        animationFrameId.current = requestAnimationFrame(detect);
        return;
      }

      const result = faceLandmarker.detectForVideo(video, performance.now());

      if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
        const categories = result.faceBlendshapes[0].categories;

        const blendShapes = mapBlendShapes(categories);

        const detected = detectEmotion(blendShapes);

        // Update UI only if emotion changes
        if (previousEmotion.current !== detected.emotion) {
          previousEmotion.current = detected.emotion;

          setEmotion(detected.emotion);
        }
      }

      animationFrameId.current = requestAnimationFrame(detect);
    }

    startDetection();

    return () => {
      active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [videoRef, isDetecting]);

  const startDetection = () => setIsDetecting(true);
  const stopDetection = () => setIsDetecting(false);

  return {
    emotion,
    isDetecting,
    startDetection,
    stopDetection,
  };
}
