import { useState, useRef } from "react";

const VIDEO_BITRATE = 1_200_000;
const AUDIO_BITRATE = 64_000;

function FullHDRecorder() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    setError("");

    if (
      !window.isSecureContext ||
      !navigator.mediaDevices?.getDisplayMedia ||
      !window.MediaRecorder
    ) {
      setError(
        "Screen recording needs Chrome or Edge on a secure desktop browser.",
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          frameRate: { ideal: 50, max: 50 },
        },
        audio: true,
      });

      const mimeType = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const mediaRecorder = new MediaRecorder(stream, {
        ...(mimeType && { mimeType }),
        videoBitsPerSecond: VIDEO_BITRATE,
        audioBitsPerSecond: AUDIO_BITRATE,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      stream.getVideoTracks()[0].addEventListener("ended", stopRecording);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "recording-1080p.webm";
        link.click();
        URL.revokeObjectURL(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (recordingError) {
      setError(
        recordingError.name === "NotAllowedError"
          ? "Screen sharing was cancelled."
          : "Unable to start screen recording.",
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <section className="recorder" aria-labelledby="recorder-title">
      <h2 id="recorder-title">Full HD Screen Recorder</h2>
      <p className="recorder-details">
        Up to 1080p at 50 FPS · compressed WebM · about 570 MB per hour
      </p>
      {!recording ? (
        <button type="button" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button type="button" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
      {error && (
        <p className="recorder-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export default FullHDRecorder;
