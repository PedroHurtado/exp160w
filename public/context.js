let audioContext;

export async function startContext(stream) {
  audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule("audioworklet.js");

  const audioProcessorNode = new AudioWorkletNode(
    audioContext,
    "audio-processor"
  );

  const source = audioContext.createMediaStreamSource(stream);

  // Crear un filtro notch para eliminar zumbidos de 50/60 Hz (de la corriente eléctrica)
  const notchFilter = audioContext.createBiquadFilter();
  notchFilter.type = 'notch';
  notchFilter.frequency.value = 60; // Frecuencia de zumbido, puede ser 50 o 60 Hz según el país
  notchFilter.Q.value = 10; // Cuanto mayor sea el valor Q, más estrecho será el filtro

  // Crear un filtro pasa bajos para recortar frecuencias altas
  const lowPassFilter = audioContext.createBiquadFilter();
  lowPassFilter.type = "lowpass";
  lowPassFilter.frequency.value = 3400; // Cortar frecuencias por encima de 3400 Hz

  // Crear un filtro pasa altos para recortar frecuencias bajas
  const highPassFilter = audioContext.createBiquadFilter();
  highPassFilter.type = "highpass";
  highPassFilter.frequency.value = 300; // Cortar frecuencias por debajo de 300 Hz

  source    
    .connect(highPassFilter)
    .connect(lowPassFilter)
    .connect(notchFilter)
    .connect(audioProcessorNode);

  //audioProcessorNode.connect(audioContext.destination)

  audioProcessorNode.port.onmessage = ({ data }) => {
    console.log(data);
  };
}
export async function closeContext() {
  await audioContext?.close();
  audioContext = null;
}
