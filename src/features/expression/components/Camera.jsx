import { useEffect, useRef } from "react";
import { useEmotion } from "../hooks/useEmotion";

export default function Camera({ onEmotionChange }) {
  const videoRef = useRef(null);

  const { emotion, isDetecting, startDetection, stopDetection } =
    useEmotion(videoRef);

  // Notify parent component whenever detected emotion changes
  useEffect(() => {
    if (onEmotionChange && emotion) {
      onEmotionChange(emotion);
    }
  }, [emotion, onEmotionChange]);

  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 720,
            facingMode: "user",
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera Error:", error);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "30px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "700px",
          maxWidth: "100%",
          borderRadius: "15px",
          transform: "scaleX(-1)",
          border: "3px solid #4f46e5",
        }}
      />

      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>{emotion}</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={startDetection}
            disabled={isDetecting}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: isDetecting ? "not-allowed" : "pointer",
              border: "none",
              backgroundColor: isDetecting ? "#9ca3af" : "#4f46e5",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Start Detection
          </button>
          <button
            onClick={stopDetection}
            disabled={!isDetecting}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: !isDetecting ? "not-allowed" : "pointer",
              border: "none",
              backgroundColor: !isDetecting ? "#9ca3af" : "#ef4444",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Stop Detection
          </button>
        </div>
      </div>
    </div>
  );
}
