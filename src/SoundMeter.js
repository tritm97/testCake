// src/SoundMeter.js
import React, { useEffect, useState } from 'react';
import { Typography, Progress, Card } from 'antd';

const { Title, Text } = Typography;

const SoundMeter = () => {
  const [isCandleOn, setIsCandleOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const handleSuccess = (stream) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const values = array.reduce((acc, val) => acc + val, 0);
        const average = values / array.length;

        setAudioLevel(average);
        if (average > 60) {
          setIsCandleOn(false);
        }
      };
    };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleSuccess);

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <Card style={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
      <Title level={2}>Sound Meter</Title>
      <Progress type="circle" percent={audioLevel} format={percent => `${percent.toFixed(2)} dB`} />
      <Text style={{ display: 'block', marginTop: 20 }}>Audio Level: {audioLevel.toFixed(2)} dB</Text>
      <div style={{ marginTop: 20 }}>
        {isCandleOn ? (
          <img src="/candle-on.svg" alt="Candle On" width={100} />
        ) : (
          <img src="/candle-off.svg" alt="Candle Off" width={100} />
        )}
      </div>
    </Card>
  );
};

export default SoundMeter;
