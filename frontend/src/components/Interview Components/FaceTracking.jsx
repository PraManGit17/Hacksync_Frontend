import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import { useInterview } from "../../context/InterviewContext";

const FaceTracking = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { updateInterview, interviewData } = useInterview();

  useEffect(() => {
    let animationFrameId;

    const runFaceMesh = async () => {
      try {
        const model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          { runtime: "tfjs", refineLandmarks: true, maxFaces: 1 }
        );

        const detect = async () => {
          if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const { videoWidth, videoHeight } = video;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const faces = await model.estimateFaces(video);
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, videoWidth, videoHeight);

            if (faces.length > 0) {
              const { xMin, xMax, yMin, yMax } = faces[0].box;

              // --- INTEGRITY LOGIC (PURE FRONTEND) ---
              // If face center shifts too far left or right (Out of Bounds)
              if (xMin < videoWidth * 0.05 || xMax > videoWidth * 0.95) {
                // We throttle this in a real app, but for your demo, 
                // it updates the global integrity count
                updateInterview({ integrityFlags: interviewData.integrityFlags + 1 });
              }

              // Draw Professional UI Overlay
              ctx.strokeStyle = "#a855f7"; // SkillSphere Purple
              ctx.lineWidth = 2;
              ctx.setLineDash([5, 5]);
              ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
            }
          }
          animationFrameId = requestAnimationFrame(detect);
        };
        detect();
      } catch (error) {
        console.error("TensorFlow Error:", error);
      }
    };

    runFaceMesh();
    return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
  }, [interviewData.integrityFlags]); // Dependency ensures we have latest count

  return (
    <div className="relative w-full h-full">
      <Webcam ref={webcamRef} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default FaceTracking;