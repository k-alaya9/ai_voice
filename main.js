async function init() {
  console.log("🚀 init() called");
  // Get an ephemeral key from your server - see server code below
  const tokenResponse = await fetch("https://aivoice-production-7e0b.up.railway.app/aivoice");
  const data = await tokenResponse.json();
  const EPHEMERAL_KEY = data.client_secret.value;

  // Create a peer connection
  const pc = new RTCPeerConnection();

  // Set up to play remote audio from the model
  const audioEl = document.createElement("audio");
  audioEl.autoplay = true;
  document.body.appendChild(audioEl);
  audioEl.controls = true;
  pc.ontrack = e => audioEl.srcObject = e.streams[0];
  const endbtn = document.createElement("button");
  endbtn.textContent = "End Session"; // Optional: gives the button a label
  
  endbtn.style.position = 'fixed';
  endbtn.style.bottom = '20px';
  endbtn.style.right = '20px';
  endbtn.style.padding = '10px 20px';
  endbtn.style.background = 'red';
  endbtn.style.color = 'white';
  endbtn.addEventListener('click', closeSession);
  document.body.appendChild(endbtn);
  // Add local audio track for microphone input in the browser
  const ms = await navigator.mediaDevices.getUserMedia({
    audio: true
  });
  pc.addTrack(ms.getTracks()[0]);

  // Set up data channel for sending and receiving events
  const dc = pc.createDataChannel("oai-events");
  dc.addEventListener("message", (e) => {
    // Realtime server events appear here!
    console.log(e);
  });

  // Start the session using the Session Description Protocol (SDP)
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const baseUrl = "https://api.openai.com/v1/realtime";
  const model = "gpt-4o-realtime-preview-2024-12-17";
  const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
    method: "POST",
    body: offer.sdp,
    headers: {
      Authorization: `Bearer ${EPHEMERAL_KEY}`,
      "Content-Type": "application/sdp"
    },
  });

  const answer = {
    type: "answer",
    sdp: await sdpResponse.text(),
  };
  await pc.setRemoteDescription(answer);
  function closeSession() {
    if (pc) {
      pc.close();
      console.log("🛑 RTCPeerConnection closed");
    }
    if (ms) {
      ms.getTracks().forEach(track => track.stop());
      console.log("🎤 MediaStream tracks stopped");
    }
  }
}


// init();