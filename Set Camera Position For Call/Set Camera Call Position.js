import xapi from 'xapi';

const CAMERAID = 1;
const Preferred_Tilt = 17;
const Preferred_Pan = 16;
const Preferred_Zoom = 6188;

function adjustCamera() {
    xapi.command("Camera PositionSet", {CameraId: CAMERAID,Tilt: '17',Pan: '16',Zoom: Preferred_Zoom});
}

function listenToCalls() {
  xapi.Event.CallSuccessful.on(async () => {
    const call = await xapi.Status.Call.get();
    if (call.length < 1) {
      return;
    }
    adjustCamera();
    xapi.command("Cameras SpeakerTrack Deactivate");
  });
}

listenToCalls();