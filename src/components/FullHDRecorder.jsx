import { useState, useRef } from "react";

const VIDEO_BITRATE = 1_200_000;
const AUDIO_BITRATE = 64_000;

function FullHDRecorder() {
  const [recordingState, setRecordingState] = useState("idle");
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
        "Screen recording is not supported by this browser. Try the latest Chrome, Edge, or Safari over HTTPS.",
      );
      return;
    }

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
          audio: true,
        });
      } catch (displayError) {
        if (
          displayError.name !== "OverconstrainedError" &&
          displayError.name !== "NotSupportedError"
        ) {
          throw displayError;
        }

        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
      }

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

      stream.getVideoTracks()[0]?.addEventListener("ended", stopRecording);
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
        mediaRecorderRef.current = null;
      };

      mediaRecorder.start();
      setRecordingState("recording");
    } catch (recordingError) {
      setError(
        recordingError.name === "NotAllowedError"
          ? "Screen sharing was cancelled."
          : "Unable to start screen recording on this browser or device.",
      );
    }
  };

  const togglePause = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (mediaRecorder?.state === "recording") {
      mediaRecorder.pause();
      setRecordingState("paused");
    } else if (mediaRecorder?.state === "paused") {
      mediaRecorder.resume();
      setRecordingState("recording");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current?.state === "recording" ||
      mediaRecorderRef.current?.state === "paused"
    ) {
      mediaRecorderRef.current.stop();
      setRecordingState("idle");
    }
  };

  return (
    <section
      className="recorder-section"
      id="recorder"
      aria-labelledby="recorder-title"
    >
      <div className="recorder-panel">
        <div className="recorder-panel-copy">
          <p className="eyebrow">The recording studio</p>
          <h2 id="recorder-title">Your screen, in motion.</h2>
          <p className="recorder-details">
            Capture your screen on desktop, tablet, or phone. Your recording
            downloads as a WebM file.
          </p>
        </div>
        <div className="recorder-action">
          <span className="recorder-indicator">
            <span />{" "}
            {recordingState === "idle"
              ? "Ready to record"
              : recordingState === "paused"
                ? "Recording paused"
                : "Recording in progress"}
          </span>
          {recordingState === "idle" ? (
            <button
              className="button button-primary"
              type="button"
              onClick={startRecording}
            >
              Start recording
            </button>
          ) : (
            <div className="recorder-controls">
              <button
                className="button button-secondary"
                type="button"
                onClick={togglePause}
              >
                {recordingState === "paused" ? "Resume" : "Pause"}
              </button>
              <button
                className="button button-primary"
                type="button"
                onClick={stopRecording}
              >
                Stop recording
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="recorder-note">
        <span>HD video</span>
        <span>Browser-based</span>
        <span>Pause &amp; resume</span>
        <span>Instant download</span>
      </div>
      {recordingState !== "idle" && (
        <p className="recording-status" aria-live="polite">
          {recordingState === "paused"
            ? "Recording paused"
            : "Recording in progress"}
        </p>
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
