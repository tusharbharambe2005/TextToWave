import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import "./TextToSpeech.css"; // Import CSS file

const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("boy_indian");
    const [speechSpeed, setSpeechSpeed] = useState(1); // Default speed = 1
    const waveRef = useRef(null);
    const waveSurferRef = useRef(null);

    // List of available voices
    const voiceOptions = [
        { label: "Indian Male", value: "boy_indian" },
        { label: "American Male", value: "boy_american" },
        { label: "Indian Female", value: "girl_indian" },
        { label: "American Female", value: "girl_american" }
    ];

    useEffect(() => {
        waveSurferRef.current = WaveSurfer.create({
            container: waveRef.current,
            waveColor: "#00FFFF", // Cyan glow
            progressColor: "#8A2BE2", // Electric purple
            barWidth: 3,
            responsive: true,
            height: 80,
        });

        return () => {
            waveSurferRef.current.destroy();
        };
    }, []);

    const handleGenerateSpeech = async () => {
        const trimmedText = text.trim();  

        if (trimmedText === "") {
            alert("Please enter some text before generating speech.");
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/text-to-speech/?text=${encodeURIComponent(trimmedText)}&voice=${selectedVoice}&speed=${speechSpeed}`
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            waveSurferRef.current.empty(); // Clear previous waveform
            waveSurferRef.current.load(url);
            waveSurferRef.current.on("ready", () => {
                waveSurferRef.current.play();
            });

            setText("");  
        } catch (error) {
            console.error("Error generating speech:", error);
            alert("Failed to generate speech. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Text-to-Speech Converter</h1>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="text-input"
            />

            <select
                className="dropdown"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
            >
                {voiceOptions.map((voice) => (
                    <option key={voice.value} value={voice.value}>
                        {voice.label}
                    </option>
                ))}
            </select>

            {/* Speech Speed Control */}
            <label className="speed-label">Speech Speed: {speechSpeed}x</label>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                className="speed-slider"
            />

            <button onClick={handleGenerateSpeech} className="button">
                🎤 Generate Speech
            </button>

            <div ref={waveRef} className="waveform"></div>
        </div>
    );
};

export default TextToSpeech;
