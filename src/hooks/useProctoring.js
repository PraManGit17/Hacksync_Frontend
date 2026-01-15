import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useInterview } from '../context/InterviewContext';

export const useProctoring = (videoRef) => {
  const { interviewData, updateInterview } = useInterview();
  const detectorRef = useRef(null);

  useEffect(() => {
    const runDetection = async () => {
      // 1. Load Model
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = { runtime: 'tfjs', refineLandmarks: true };
      detectorRef.current = await faceLandmarksDetection.createDetector(model, detectorConfig);

      // 2. Monitoring Loop
      const detect = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const faces = await detectorRef.current.estimateFaces(videoRef.current);

          if (faces.length > 0) {
            const keypoints = faces[0].keypoints;
            
            // Simple logic to detect "Looking Away"
            // We calculate the distance between nose tip and outer eye corners
            const nose = keypoints[1];
            const leftEye = keypoints[33];
            const rightEye = keypoints[263];

            const horizontalDiff = Math.abs((nose.x - leftEye.x) - (rightEye.x - nose.x));

            // Threshold for Gaze Divergence
            if (horizontalDiff > 15) { 
               updateInterview({ integrityFlags: interviewData.integrityFlags + 1 });
               console.warn("INTEGRITY_ALERT: Gaze Divergence Detected");
            }
          }
        }
        requestAnimationFrame(detect);
      };
      detect();
    };

    if (videoRef.current) runDetection();
  }, [videoRef]);
};